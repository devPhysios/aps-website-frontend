import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";

/**
 * Generates a PDF document from project topics data
 * @param {Array} topics - Array of project topic objects
 * @param {Object} filters - Applied filters object
 * @param {Function} formatSupervisor - Function to format supervisor names
 * @param {Object} options - PDF generation options
 * @returns {jsPDF} Generated PDF document
 */
export const generateProjectTopicsPDF = (
  topics,
  filters,
  formatSupervisor,
  options = {}
) => {
  // Create a new PDF document
  const doc = new jsPDF();

  // Set default options if not provided
  const defaultOptions = {
    columns: {
      topic: true, // Always true, can't be changed (required)
      year: true,
      supervisor: true,
      author: true,
    },
    includeHeader: true,
    includeFooter: true,
    includePageNumbers: true,
  };

  // Merge provided options with defaults
  const pdfOptions = { ...defaultOptions, ...options };

  let yPos = 20;

  // Add header with APS branding if enabled
  if (pdfOptions.includeHeader) {
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
    yPos = 30;

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
  }

  // Prepare table data - title column is always included as required
  const tableColumn = [];

  // Configure columns based on options
  if (pdfOptions.columns.year) {
    tableColumn.push("Year");
  }

  // Topic is always included (non-optional)
  tableColumn.push("Topic");

  if (pdfOptions.columns.author) {
    tableColumn.push("Author");
  }

  if (pdfOptions.columns.supervisor) {
    tableColumn.push("Supervisor");
  }

  const tableRows = [];

  // Add all filtered topics to the table
  topics.forEach((topic) => {
    const topicData = [];

    // Add data based on selected columns
    if (pdfOptions.columns.year) {
      topicData.push(topic.year.toString());
    }

    // Topic is always included (non-optional)
    topicData.push(topic.topic);

    if (pdfOptions.columns.author) {
      topicData.push(topic.author?.name || "Unknown");
    }

    if (pdfOptions.columns.supervisor) {
      topicData.push(formatSupervisor(topic.supervisor));
    }

    tableRows.push(topicData);
  });

  // Configure column styles
  const columnStyles = {};
  let colIndex = 0;

  if (pdfOptions.columns.year) {
    columnStyles[colIndex++] = { cellWidth: 20 }; // Year
  }

  // Topic is always included
  columnStyles[colIndex++] = { cellWidth: "auto" }; // Topic

  if (pdfOptions.columns.author) {
    columnStyles[colIndex++] = { cellWidth: 35 }; // Author
  }

  if (pdfOptions.columns.supervisor) {
    columnStyles[colIndex++] = { cellWidth: 35 }; // Supervisor
  }

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
    columnStyles: columnStyles,
  });

  // Add page numbers and footer if enabled
  if (pdfOptions.includePageNumbers || pdfOptions.includeFooter) {
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);

      // Add page numbers if enabled
      if (pdfOptions.includePageNumbers) {
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text(
          `Page ${i} of ${pageCount}`,
          105,
          doc.internal.pageSize.height - 10,
          { align: "center" }
        );
      }

      // Add footer if enabled
      if (pdfOptions.includeFooter) {
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
    }
  }

  return doc;
};

export default {
  generateProjectTopicsPDF,
};
