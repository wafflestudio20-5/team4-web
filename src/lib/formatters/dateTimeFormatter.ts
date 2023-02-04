export function formatDate(date: string | undefined): string {
  if (date) {
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    return `${year}.${month < 10 ? '0' + month : month}.${
      day < 10 ? '0' + day : day
    }`;
  } else {
    return '날짜가 없습니다.';
  }
}

export function formatDate2(date: string | undefined): string {
  if (date) {
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    return `${year}-${month < 10 ? '0' + month : month}-${
      day < 10 ? '0' + day : day
    }`;
  } else {
    return '날짜가 없습니다.';
  }
}

export function getRelativeDateTime(dateTime: string): string {
  const milliSeconds = Date.now() - Date.parse(dateTime);
  const seconds = milliSeconds / 1000;
  if (seconds < 60) return `방금 전`;
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}분 전`;
  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}시간 전`;
  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)}일 전`;
  const weeks = days / 7;
  if (weeks < 5) return `${Math.floor(weeks)}주 전`;
  const months = days / 30;
  if (months < 12) return `${Math.floor(months)}개월 전`;
  const years = days / 365;
  return `${Math.floor(years)}년 전`;
}
