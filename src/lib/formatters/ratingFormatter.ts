export function formatRating(rating: number): number {
  return Math.floor(rating * 5) / 10;
}
