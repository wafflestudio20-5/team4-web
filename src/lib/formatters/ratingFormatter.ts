export function formatRating(rating: number): number {
  return Math.floor(rating * 5) / 10;
}

export function getBarWidth(rating: number): number {
  return Math.floor(rating * 10);
}
