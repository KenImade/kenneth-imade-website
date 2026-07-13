// Shared date display for posts: 2026-07-01 → "July 2026"
export function formatPostDate(date) {
  return date.toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });
}
