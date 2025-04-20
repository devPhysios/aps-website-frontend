import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";

/**
 * Generates a PDF document from project topics data
 * @param {Array} topics - Array of project topic objects
 * @param {Object} filters - Applied filters object
 * @param {Function} formatSupervisor - Function to format supervisor names
 * @returns {jsPDF} Generated PDF document
 */
export const generateProjectTopicsPDF = (topics, filters, formatSupervisor) => {
  // Create a new PDF document
  const doc = new jsPDF();

  // Add header with APS branding
  doc.setFillColor(34, 197, 94); // Green color
  doc.rect(0, 0, 210, 20, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("APS PROJECT TOPICS", 105, 12, { align: "center" });

  // Add subtitle with filter information
  doc.setTextColor(80, 80, 80);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  let yPos = 30;

  // Add filter information if any filters are applied
  const hasActiveFilters = Boolean(
    filters.year || filters.supervisor || filters.author || filters.search
  );

  if (hasActiveFilters) {
    doc.text("Applied Filters:", 14, yPos);
    yPos += 7;

    if (filters.year) {
      doc.text(`Year: ${filters.year}`, 20, yPos);
      yPos += 7;
    }

    if (filters.supervisor) {
      doc.text(`Supervisor: ${filters.supervisor}`, 20, yPos);
      yPos += 7;
    }

    if (filters.author) {
      doc.text(`Author: ${filters.author}`, 20, yPos);
      yPos += 7;
    }

    if (filters.search) {
      doc.text(`Search: ${filters.search}`, 20, yPos);
      yPos += 7;
    }
  } else {
    doc.text("All Project Topics", 14, yPos);
    yPos += 7;
  }

  // Add info about the number of topics
  doc.text(`Total topics: ${topics.length}`, 14, yPos);
  yPos += 7;

  // Add date of generation
  const today = new Date();
  doc.text(
    `Generated on: ${today.toLocaleDateString()} at ${today.toLocaleTimeString()}`,
    14,
    yPos
  );
  yPos += 15;

  // Prepare table data
  const tableColumn = ["Year", "Topic", "Author", "Supervisor"];
  const tableRows = [];

  // Add all filtered topics to the table
  topics.forEach((topic) => {
    const topicData = [
      topic.year.toString(),
      topic.topic,
      topic.author?.name || "Unknown",
      formatSupervisor(topic.supervisor),
    ];
    tableRows.push(topicData);
  });

  // Add the table to the PDF
  autoTable(doc, {
    startY: yPos,
    head: [tableColumn],
    body: tableRows,
    theme: "grid",
    headStyles: {
      fillColor: [34, 197, 94],
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240],
    },
    styles: {
      overflow: "linebreak",
      cellWidth: "wrap",
    },
    columnStyles: {
      0: { cellWidth: 20 }, // Year
      1: { cellWidth: "auto" }, // Topic
      2: { cellWidth: 35 }, // Author
      3: { cellWidth: 35 }, // Supervisor
    },
  });

  // Add page number at the bottom
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(
      `Page ${i} of ${pageCount}`,
      105,
      doc.internal.pageSize.height - 10,
      { align: "center" }
    );

    // Add footer
    doc.setDrawColor(34, 197, 94);
    doc.line(
      14,
      doc.internal.pageSize.height - 20,
      195,
      doc.internal.pageSize.height - 20
    );
    doc.text(
      "APS PROJECT TOPICS DATABASE",
      105,
      doc.internal.pageSize.height - 15,
      { align: "center" }
    );
  }

  return doc;
};

export default {
  generateProjectTopicsPDF,
};
