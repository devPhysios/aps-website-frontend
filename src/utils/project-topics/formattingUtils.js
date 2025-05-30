export function formatSupervisor(supervisor) {
  if (!supervisor || !supervisor.name) return "Unknown";
  return `${supervisor.title ? supervisor.title + " " : ""}${supervisor.name}`.trim();
} 