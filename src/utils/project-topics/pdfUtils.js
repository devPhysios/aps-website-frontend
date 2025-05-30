import { computed } from 'vue';

export function usePdfUtils(generatedPdf, filters) {
  const downloadPDF = () => {
    if (generatedPdf.value) {
      let filename = "aps-project-topics";
      if (filters.value.year) filename += `-${filters.value.year}`;
      if (filters.value.supervisor)
        filename += `-${filters.value.supervisor.replace(/\s+/g, "-")}`;
      filename += ".pdf";
      generatedPdf.value.save(filename);
      return true; // Indicate success for closing modal
    }
    return false;
  };

  const previewPDF = () => {
    if (generatedPdf.value) {
      const pdfBlob = generatedPdf.value.output("blob");
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, "_blank");
    }
  };

  const pdfPageCount = computed(() => {
    return generatedPdf.value
      ? generatedPdf.value.internal.getNumberOfPages()
      : 0;
  });

  return {
    downloadPDF,
    previewPDF,
    pdfPageCount,
  };
} 