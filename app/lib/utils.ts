export function getDateStringInRussianFormat(date: Date): string {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const dayString = day < 10 ? '0' + day : day;
  const monthString = month < 10 ? '0' + month : month;
  return `${dayString}.${monthString}.${date.getFullYear()}`;
}