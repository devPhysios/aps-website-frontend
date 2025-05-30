import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import apiClient from '../config/axios';
import { storage, questionsCollectionRef } from '../firebase'; // Assuming firebase.js is in the parent directory
import { ref as storeRefFirebase, deleteObject } from 'firebase/storage';
import { getDocs, query, where, deleteDoc } from 'firebase/firestore';

export function useQuestionActions(currentTab, initialQuestionsRef) {
  const toast = useToast();
  const showEditModal = ref(false);
  const showDeleteModal = ref(false);
  const deletedQuestion = ref(null); // Stores the question to be deleted
  const editingQuestion = ref(null); // Stores the original question being edited

  const editedQuestion = ref({
    question: '',
    options: [],
    answer: '',
    year: '',
    tags: '',
    lecturer: '',
    imgURL: '',
    type: '', // Will be set to MCQ, Essay, or Cloze
    _id: '',
  });
  const editedAnswer = ref([]); // Specifically for MCQ multiple answers

  const progress = ref(0);
  const progressToastId = ref(null);

  const openEditModal = (question, type) => {
    editingQuestion.value = { ...question }; // Store a copy of the original question
    editedQuestion.value.question = question.question;
    editedQuestion.value.year = question.year;
    editedQuestion.value.tags = question.tags;
    editedQuestion.value.lecturer = question.lecturer;
    editedQuestion.value.imgURL = question.imgURL;
    editedQuestion.value.type = type; // MCQ, Essay, Cloze
    editedQuestion.value._id = question._id;

    if (type === 'MCQ') {
      editedQuestion.value.options = [...question.options];
      // Ensure answer is an array of indices for MCQ
      editedAnswer.value = Array.isArray(question.answer) 
        ? question.answer.map(ans => parseInt(ans, 10)).filter(ans => !isNaN(ans))
        : [];
      editedQuestion.value.answer = ''; // Clear main answer field for MCQ as editedAnswer is used
    } else {
      editedQuestion.value.options = [];
      editedQuestion.value.answer = question.answer;
      editedAnswer.value = [];
    }
    showEditModal.value = true;
  };

  const closeEditModal = () => {
    showEditModal.value = false;
    resetEditedQuestion();
  };

  const resetEditedQuestion = () => {
    editedQuestion.value = {
      question: '',
      options: [],
      answer: '',
      year: '',
      tags: '',
      lecturer: '',
      imgURL: '',
      type: '',
      _id: '',
    };
    editedAnswer.value = [];
    editingQuestion.value = null;
  };

  const addOption = () => {
    if (editedQuestion.value.type === 'MCQ') {
      editedQuestion.value.options.push('');
    }
  };

  const removeOption = (index) => {
    if (editedQuestion.value.type === 'MCQ') {
      editedQuestion.value.options.splice(index, 1);
      // Also remove this option index from editedAnswer if it exists
      editedAnswer.value = editedAnswer.value.filter(ansIdx => ansIdx !== index);
      // Adjust subsequent answer indices if necessary
      editedAnswer.value = editedAnswer.value.map(ansIdx => ansIdx > index ? ansIdx - 1 : ansIdx);
    }
  };

  const updateQuestion = async () => {
    const data = {
      question: editedQuestion.value.question,
      year: editedQuestion.value.year,
      tags: editedQuestion.value.tags,
      lecturer: editedQuestion.value.lecturer,
      imgURL: editedQuestion.value.imgURL, // Assuming imgURL update is out of scope for now or handled separately
    };

    let endpoint;
    if (editedQuestion.value.type === 'MCQ') {
      endpoint = `/mcq/editmcqs/${editedQuestion.value._id}`;
      data.options = editedQuestion.value.options;
      data.answer = editedAnswer.value; // Use the array of indices for MCQ
    } else if (editedQuestion.value.type === 'Essay') {
      endpoint = `/essayqs/editessayqs/${editedQuestion.value._id}`;
      data.answer = editedQuestion.value.answer;
    } else { // Cloze (Fill in the Gap)
      endpoint = `/fitg/editfitg/${editedQuestion.value._id}`;
      data.answer = editedQuestion.value.answer;
    }

    progress.value = 0;
    progressToastId.value = toast.info('Updating question... 0%', {
      keepAlive: true,
      closeOnClick: false,
      timeout: false,
    });

    try {
      const token = localStorage.getItem('studentToken');
      const response = await apiClient.patch(endpoint, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        onUploadProgress: (progressEvent) => {
          const totalBytes = progressEvent.total || progressEvent.loaded; // Handle case where total might be undefined
          const loadedBytes = progressEvent.loaded;
          const calculatedPercentage = totalBytes 
            ? Math.floor((loadedBytes / totalBytes) * 100)
            : 0; // Default to 0 if totalBytes is not available
          progress.value = calculatedPercentage;
          toast.update(progressToastId.value, { content: `Updating question... ${progress.value}%` });
        },
      });
      toast.dismiss(progressToastId.value);
      toast.success(response.data.message || 'Question updated successfully!');
      closeEditModal();
      // Optimistically update the question in the local list
      if (initialQuestionsRef && initialQuestionsRef.value) {
        const qIndex = initialQuestionsRef.value.findIndex(q => q._id === editedQuestion.value._id);
        if (qIndex !== -1) {
            const updatedQ = { ...initialQuestionsRef.value[qIndex], ...data };
            if(editedQuestion.value.type === 'MCQ') updatedQ.answer = editedAnswer.value; // ensure MCQ answer format is correct
            initialQuestionsRef.value.splice(qIndex, 1, updatedQ);
        }
      }
      // No full page reload, let reactivity handle updates
    } catch (error) {
      console.error('Error updating question:', error);
      toast.dismiss(progressToastId.value);
      toast.error(error.response?.data?.message || error.message || 'Error updating question.');
    }
  };

  const openDeleteModal = (question) => {
    deletedQuestion.value = question;
    showDeleteModal.value = true;
  };

  const closeDeleteModal = () => {
    showDeleteModal.value = false;
    deletedQuestion.value = null;
  }

  const getExistingDocument = async (url) => {
    const q = query(questionsCollectionRef, where('url', '==', url));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty ? querySnapshot.docs[0] : null;
  };

  const deleteFromFirebaseStorage = async (imageUrl) => {
    if (!imageUrl) return;
    try {
      const docToDelete = await getExistingDocument(imageUrl);
      if (docToDelete) {
        await deleteDoc(docToDelete.ref);
      }
      // Even if doc not found, try deleting from storage directly if URL is known
      const imageRef = storeRefFirebase(storage, imageUrl);
      await deleteObject(imageRef);
      toast.success('Image deleted from Firebase Storage.');
    } catch (error) {
      // Log error but don't block question deletion if image deletion fails
      console.error('Error deleting image from Firebase:', error);
      // toast.error('Error deleting image from Firebase.');
    }
  };

  const deleteQuestion = async () => {
    if (!deletedQuestion.value) return;

    const questionToDelete = deletedQuestion.value;
    if (questionToDelete.imgURL) {
      // Non-blocking call to delete from Firebase
      deleteFromFirebaseStorage(questionToDelete.imgURL).catch(err => console.error("Async Firebase delete error", err));
    }

    let endpoint;
    if (questionToDelete.type === 'MCQ') {
      endpoint = `/mcq/deletemcqs/${questionToDelete._id}`;
    } else if (questionToDelete.type === 'Essay') {
      endpoint = `/essayqs/deleteessayqs/${questionToDelete._id}`;
    } else { // Cloze (Fill in the Gap)
      endpoint = `/fitg/deletefitg/${questionToDelete._id}`;
    }

    progress.value = 0;
    progressToastId.value = toast.info('Deleting question... 0%', {
      keepAlive: true,
      closeOnClick: false,
      timeout: false,
    });

    try {
      const token = localStorage.getItem('studentToken');
      const response = await apiClient.delete(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        // onUploadProgress is not standard for delete, onDownloadProgress might be if there's a response body
        // For delete, usually there's no large data transfer to track progress on.
        // If your server sends progress events for delete, you can use onDownloadProgress.
      });
      toast.dismiss(progressToastId.value);
      toast.success(response.data.message || 'Question deleted successfully!');
      closeDeleteModal(); 
      // Optimistically remove the question from the local list
      if (initialQuestionsRef && initialQuestionsRef.value) {
        initialQuestionsRef.value = initialQuestionsRef.value.filter(q => q._id !== questionToDelete._id);
      }
      // No full page reload
    } catch (error) {
      console.error('Error deleting question:', error);
      toast.dismiss(progressToastId.value);
      toast.error(error.response?.data?.message || error.message || 'Error deleting question.');
    }
  };

  return {
    showEditModal,
    showDeleteModal,
    editedQuestion, // The reactive object for the form
    editedAnswer, // For MCQ answers
    editingQuestion, // The original question being edited (useful for comparison or reference)
    deletedQuestion, // The question marked for deletion
    openEditModal,
    closeEditModal,
    addOption,
    removeOption,
    updateQuestion,
    openDeleteModal,
    closeDeleteModal, // Added closeDeleteModal
    deleteQuestion,
    progress, // For UI feedback if needed
  };
} 