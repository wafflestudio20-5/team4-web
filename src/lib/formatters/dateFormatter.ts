export function formatDate(date: string | undefined): string {
  if (date) {
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    return `${year}.${month}.${day}`;
  } else {
    return '날짜가 없습니다.';
  }
}
