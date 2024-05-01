function handlePageInput(tab, value, data) {
  const parsedValue = parseInt(value, 10);
  switch (tab) {
    case "MCQ":
      if (
        !isNaN(parsedValue) &&
        parsedValue >= 1 &&
        parsedValue <= totalPages("MCQ", data)
      ) {
        currentPageMCQ.value = parsedValue;
      } else {
        currentPageMCQ.value = 1;
      }
      break;
    case "Essay":
      if (
        !isNaN(parsedValue) &&
        parsedValue >= 1 &&
        parsedValue <= totalPages("Essay", data)
      ) {
        currentPageEssay.value = parsedValue;
      } else {
        currentPageEssay.value = 1;
      }
      break;
    case "Cloze":
      if (
        !isNaN(parsedValue) &&
        parsedValue >= 1 &&
        parsedValue <= totalPages("Cloze", data)
      ) {
        currentPageCloze.value = parsedValue;
      } else {
        currentPageCloze.value = 1;
      }
      break;
    default:
      break;
  }
}

export { handlePageInput };
