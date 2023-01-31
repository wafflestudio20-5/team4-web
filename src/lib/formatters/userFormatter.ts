export function formatSex(sex: string | undefined): string {
  switch (sex) {
    case 'male':
      return '남자';
    case 'female':
      return '여자';
    default:
      return '';
  }
}

export function formatUserInfo(
  sex: string | undefined,
  height: number | undefined,
  weight: number | undefined
): string {
  const s = sex ? `${formatSex(sex)}, ` : '';
  const h = height ? `${height}cm, ` : '';
  const w = height && weight ? `${weight}kg` : '';

  return s + h + w;
}

export function formatUserSize(height: number, weight: number): string {
  const heightString = height ? `${height}cm` : '';
  const weightString = height && weight ? ` · ${weight}kg` : '';

  return heightString + weightString;
}
