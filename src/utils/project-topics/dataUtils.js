export const extractUniqueYears = (topics) => {
  const years = topics.map((topic) => topic.year);
  return [...new Set(years)].sort((a, b) => b - a); // Sort descending
}; 