export function getDateStringInRussianFormat(date: Date): string {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const dayString = day < 10 ? '0' + day : day;
  const monthString = month < 10 ? '0' + month : month;
  return `${dayString}.${monthString}.${date.getFullYear()}`;
}

export function range(from: number, to: number): number[] {
  const result: number[] = [];
  for (let i = from; i < to; i++) {
    result.push(i)
  }
  return result;
}

export function getDateString(date: Date): string {
  return date.toISOString().split('T')[0];
}