import { Check, Company } from "./definitions";

const TOKEN = process.env.CHECK_TOKEN;

export async function fetchOneCheck(input: string, companies: Company[]): Promise<Check> {
  let json;

  const encodedParams = new URLSearchParams();
  encodedParams.append("qrraw", input);
  encodedParams.append("token", TOKEN ?? '');

  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: encodedParams
  };

  const res = await fetch('https://proverkacheka.com/api/v1/check/get', options);
  json = await res.json();
  if (json.code !== 1) throw new Error();

  return generateListItem(json, companies);
}

// export async function fetchChecks(inputArr: string[]): Promise<CheckListItem[]> {
//   const dataArr = await Promise.all(
//     inputArr.map(async r => await fetchOneCheck(r))
//   )
//   return dataArr;
// }

function generateListItem(input: any, companies: Company[]): Check {
  const type = companies.find(company => company.name === input.data.json.user)?.type ?? 'Продукты';
  return {
    type,
    date: new Date(input.data.json.dateTime),
    number: input.data.json.requestNumber,
    company: input.data.json.user,
    sum: input.data.json.totalSum,
    nds20: input.data.json.nds18,
    nds10: input.data.json.nds10,
  }
}

function getDayMonthYear(date: Date): string {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${date.getFullYear()}`
}