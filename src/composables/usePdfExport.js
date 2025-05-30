import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { generatePDF as generatePdfUtil } from '../utils/useGeneratePDF.js'; // Assuming this is the correct path

export function usePdfExport(questions, courseCode, level, courseData) {
  const toast = useToast();
  const pdfLoading = ref(false); // Add a loading state for PDF generation if needed

  const getPDF = () => {
    if (!questions.value || questions.value.length === 0) {
      toast.error('No questions to generate PDF');
      return;
    }
    if (!courseData.value || !courseData.value.coursetitle) { // Check against courseData from useCourseMeta
      toast.error('Course details not found');
      return;
    }
    if (!level.value) { // level should be a ref passed in
      toast.error('Level not found');
      return;
    }

    pdfLoading.value = true;
    try {
      // Pass necessary details to the utility function
      // The utility might need course title, code, level, and the questions themselves.
      generatePdfUtil(questions.value, courseCode.value, level.value, courseData.value);
      // toast.success('PDF generation started.'); // Or handle success/error within generatePdfUtil
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF.');
    } finally {
      pdfLoading.value = false;
    }
  };

  return {
    getPDF,
    pdfLoading, // Expose loading state
  };
} 