import { sql } from "@vercel/postgres";
import { ChecksTable, CompanyTable, ProverkachekaParams } from "./definitions";

export async function fetchAllChecks() {
  try {
    const checks = await sql<ChecksTable>`SELECT * FROM checks`;
    return checks.rows;
  } catch (error) {
    console.error('Database Error: ', error);
    throw new Error('Failed to fetch check data.');
  }
}

const ITEMS_PER_PAGE = 10;

export async function fetchFilteredChecks(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const checks = await sql<ChecksTable>`
    SELECT *
    FROM checks
    WHERE
        checks.type ILIKE ${`%${query}%`} OR
        checks.date::text ILIKE ${`%${query}%`} OR
        checks.number::text ILIKE ${`%${query}%`} OR
        checks.sum::text ILIKE ${`%${query}%`} OR
        checks.nds10::text ILIKE ${`%${query}%`} OR
        checks.nds20::text ILIKE ${`%${query}%`} OR
        checks.company_name ILIKE ${`%${query}%`}
    ORDER BY checks.date DESC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return checks.rows;
  } catch (error) {
    console.error('Database Error: ', error);
    throw new Error('Failed to fetch check data.');
  }
}

export async function fetchChecksPages(query: string) {
  try {
    const count = await sql`
    SELECT COUNT(*)
    FROM checks
    JOIN companies ON checks.company_id = companies.id
    WHERE
        checks.type ILIKE ${`%${query}%`} OR
        checks.data::text ILIKE ${`%${query}%`} OR
        checks.number::text ILIKE ${`%${query}%`} OR
        checks.sum::text ILIKE ${`%${query}%`} OR
        checks.nds10::text ILIKE ${`%${query}%`} OR
        checks.nds20::text ILIKE ${`%${query}%`} OR
        companies.name ILIKE ${`%${query}%`}
    `;
    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error: ', error);
    throw new Error('Failed to fetch total number of checks.');
  }
}

export async function fetchCompanies() {
  try {
    const companies = await sql<CompanyTable>`
    SELECT * FROM companies
    `;
    return companies.rows;
  } catch (error) {
    console.error('Database Error: ', error);
    throw new Error('Failed to fetch companies.');
  }
}

export async function fetchCheckFromService({
  fn, i, fp, t, n, s
}: ProverkachekaParams): Promise<ChecksTable> {

  const TOKEN = process.env.CHECK_TOKEN;
  const encodedParams = new URLSearchParams();
  encodedParams.append('fn', fn);
  encodedParams.append('fd', i);
  encodedParams.append('fp', fp);
  encodedParams.append('t', t);
  encodedParams.append('n', n);
  encodedParams.append('s', s);
  // encodedParams.append("qrraw", "t=20200924T1837&s=349.93&fn=9282440300682838&i=46534&fp=1273019065&n=1");
  encodedParams.append("token", TOKEN ?? '');

  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: encodedParams
  };

  const res = await fetch('https://proverkacheka.com/api/v1/check/get', options);
  const data = await res.json();
  if (data.code !== 1) throw new Error();

  const companies = await fetchCompanies();
  const company_name = data.data.json.user;
  const company = companies.find(company => company.name === company_name);
  const type = company?.type ?? 'Продукты';
  const company_id = company?.id ?? '';
  return {
    id: '',
    type,
    date: new Date(data.data.json.dateTime),
    number: data.data.json.requestNumber,
    company_id,
    company_name,
    sum: data.data.json.totalSum,
    nds20: data.data.json.nds18 ?? 0,
    nds10: data.data.json.nds10 ?? 0,
  }
}