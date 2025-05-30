import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import apiClient from '../config/axios';
import { useToast } from 'vue-toastification';

export function useQuestions(courseCode) {
  const route = useRoute();
  const router = useRouter();
  const toast = useToast();

  const loading = ref(true);
  const questions = ref([]);
  const currentTab = ref('MCQ'); // Default tab
  const showAnswerMCQ = ref([]);
  const showAnswerEssay = ref([]);
  const showAnswerCloze = ref([]);

  const mcqQuestionsExist = computed(() =>
    questions.value.some((q) => q.type === 'MCQ')
  );
  const essayQuestionsExist = computed(() =>
    questions.value.some((q) => q.type === 'Essay')
  );
  const clozeQuestionsExist = computed(() =>
    questions.value.some((q) => q.type === 'Fill in the Gap')
  );

  const fetchQuestions = async () => {
    loading.value = true;
    try {
      const { data } = await apiClient.get(`/questions/${courseCode.value}`);
      if (data.success) {
        questions.value = data.data;
        // Determine initial tab based on available question types
        const questionTypes = new Set(
          questions.value.map((question) => {
            return question.type === 'Fill in the Gap' ? 'Cloze' : question.type;
          })
        );
        if (questionTypes.size === 0) {
          currentTab.value = 'MCQ'; // Default if no questions
        } else if (questionTypes.size === 1) {
          currentTab.value = questionTypes.values().next().value;
        } else {
          currentTab.value = questionTypes.has('MCQ')
            ? 'MCQ'
            : questionTypes.values().next().value;
        }
      } else {
        console.error('Failed to fetch questions:', data.error);
        toast.error('Failed to fetch questions.');
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
      toast.error('An error occurred while fetching questions.');
      router.push({ path: '/500', query: { returnUrl: window.location.href } });
    } finally {
      loading.value = false;
    }
  };

  const revealAnswer = (index, questionType) => {
    switch (questionType) {
      case 'MCQ':
        showAnswerMCQ.value[index] = !showAnswerMCQ.value[index];
        break;
      case 'Essay':
        showAnswerEssay.value[index] = !showAnswerEssay.value[index];
        break;
      case 'Cloze':
        showAnswerCloze.value[index] = !showAnswerCloze.value[index];
        break;
      default:
        break;
    }
  };

  return {
    loading,
    questions,
    currentTab,
    mcqQuestionsExist,
    essayQuestionsExist,
    clozeQuestionsExist,
    fetchQuestions,
    revealAnswer,
    showAnswerMCQ,
    showAnswerEssay,
    showAnswerCloze,
  };
} 