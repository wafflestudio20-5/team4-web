export function formatUserSize(height: number, weight: number): string {
  const heightString = height ? `${height}cm` : '';
  const weightString = height && weight ? ` · ${weight}kg` : '';

  return heightString + weightString;
}
