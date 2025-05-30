import { computed } from "vue";

export function usePaginationRange(currentPage, totalPages) {
  return computed(() => {
    const range = [];
    const maxVisiblePages = 5;

    if (totalPages.value <= maxVisiblePages) {
      return Array.from({ length: totalPages.value }, (_, i) => i + 1);
    }

    range.push(1);

    if (currentPage.value > 3) {
      range.push("...");
    }

    const start = Math.max(2, currentPage.value - 1);
    const end = Math.min(totalPages.value - 1, currentPage.value + 1);

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    if (currentPage.value < totalPages.value - 2) {
      range.push("...");
    }

    if (totalPages.value > 1) {
      range.push(totalPages.value);
    }

    return range;
  });
} 