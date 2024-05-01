import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function generatePDF(questions, courseCode, level) {
  const doc = new jsPDF();
  doc.setFontSize(12);

  // Add header
  const headerLine1 = "Association of Physiotherapy Students";
  const headerLine2 = "University of Ibadan";
  const headerLine3 = `${level} Level Question Bank`;
  const headerLine4 = `${courseCode} Past Questions`;

  // Set alignment to center
  const centerAlign = { align: "center" };

  doc.setFont("helvetica", "bold");
  doc.text(headerLine1, doc.internal.pageSize.getWidth() / 2, 20, centerAlign);
  doc.setFont("helvetica", "normal");
  doc.text(headerLine2, doc.internal.pageSize.getWidth() / 2, 30, centerAlign);
  doc.text(headerLine3, doc.internal.pageSize.getWidth() / 2, 40, centerAlign);
  doc.text(headerLine4, doc.internal.pageSize.getWidth() / 2, 50, centerAlign);

  // Add content
  let y = 60; // Starting y-position for content
  const types = ["MCQ", "Fill in the Gap", "Essay"];
  const lineHeight = 6; // Adjust this value to control the spacing between lines

  types.forEach((type) => {
    const questionsOfType = questions.filter((q) => q.type === type);
    if (questionsOfType.length > 0) {
      doc.setFont("helvetica", "bold");
      doc.text(
        `${
          type === "MCQ"
            ? "Multiple Choice Questions"
            : type === "Fill in the Gap"
            ? "Cloze Questions"
            : "Essay Questions"
        }`,
        20,
        y + 10
      );
      y += 20;

      questionsOfType.forEach((question, index) => {
        doc.setFont("helvetica", "normal");
        const questionText = `${index + 1}. ${question.question}`;
        const textLines = doc.splitTextToSize(questionText, 180);
        doc.text(textLines, 20, y);
        y += textLines.length * lineHeight;

        if (question.type === "MCQ") {
          question.options.forEach((option, optionIndex) => {
            const optionText = `${String.fromCharCode(
              65 + optionIndex
            )}. ${option}`;
            const optionLines = doc.splitTextToSize(optionText, 175);
            doc.text(optionLines, 25, y);
            y += optionLines.length * lineHeight;
          });
          y += lineHeight;
        }

        const yearText = `Year: ${question.year}`;
        doc.text(yearText, 20, y);
        y += lineHeight * 2;

        // Add a new page if the next question won't fit on the current page
        if (y + 20 > doc.internal.pageSize.getHeight() - 20) {
          doc.addPage();
          y = 20;
        }
      });
    }
  });

  // Save the PDF
  doc.save(`${courseCode}_question_bank.pdf`);
}

export { generatePDF };
