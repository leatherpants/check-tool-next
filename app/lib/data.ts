import { sql } from "@vercel/postgres";
import { ChecksTable, CompaniesTable, ProverkachekaParams } from "./definitions";

export async function fetchAllChecks() {
  try {
    const checks = await sql<ChecksTable>`SELECT * FROM checks ORDER BY company_type, company_name, date`;
    return checks.rows;
  } catch (error) {
    console.error('Database Error: ', error);
    throw new Error('Failed to fetch check data.');
  }
}

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredChecks(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  if (query) {
    try {
      const checks = await sql<ChecksTable>`
      SELECT *
      FROM checks
      WHERE
          checks.company_type ILIKE ${`%${query}%`} OR
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
  } else {
    try {
      const checks = await sql<ChecksTable>`
      SELECT *
      FROM checks
      ORDER BY checks.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
      return checks.rows;
    } catch (error) {
      console.error('Database Error: ', error);
      throw new Error('Failed to fetch check data.');
    }
  }

}

export async function fetchChecksPages(query: string) {
  const count = await fetchChecksCount(query);
  const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
  if (totalPages < 1) return 1;
  return totalPages;
}

export async function fetchChecksCount(query: string) {
  if (query) {
    try {
      const count = await sql`
      SELECT COUNT(*)
      FROM checks
      WHERE
          checks.company_type ILIKE ${`%${query}%`} OR
          checks.date::text ILIKE ${`%${query}%`} OR
          checks.number::text ILIKE ${`%${query}%`} OR
          checks.sum::text ILIKE ${`%${query}%`} OR
          checks.nds10::text ILIKE ${`%${query}%`} OR
          checks.nds20::text ILIKE ${`%${query}%`} OR
          checks.company_name ILIKE ${`%${query}%`}
      `;
      return Number(count.rows[0].count);
    } catch (error) {
      console.error('Database Error: ', error);
      throw new Error('Failed to fetch page number.');
    }
  } else {
    try {
      const count = await sql`
      SELECT COUNT(*)
      FROM checks
      `;
      return Number(count.rows[0].count);
    } catch (error) {
      console.error('Database Error: ', error);
      throw new Error('Failed to fetch page number.');
    }
  }
}

export async function fetchCheckById(id: string) {
  try {
    const checks = await sql<ChecksTable>`
    SELECT * FROM checks
    WHERE id = ${id}
    `;
    return checks.rows[0];
  } catch (error) {
    console.error('Database Error: ', error);
    throw new Error('Failed to fetch check.');
  }
}

export async function fetchCompanies() {
  try {
    const companies = await sql<CompaniesTable>`
    SELECT * FROM companies
    `;
    return companies.rows;
  } catch (error) {
    console.error('Database Error: ', error);
    throw new Error('Failed to fetch companies.');
  }
}

export async function fetchCompanyById(id: string) {
  try {
    const companies = await sql<CompaniesTable>`
    SELECT * FROM companies
    WHERE id = ${id}
    `;
    return companies.rows[0];
  } catch (error) {
    console.error('Database Error: ', error);
    throw new Error('Failed to fetch company.');
  }
}

export async function fetchCheckFromService(params: ProverkachekaParams): Promise<ChecksTable> {

  const data = await fetchRawFromService(params);

  const companies = await fetchCompanies();
  const company_name = data.data.json.user;
  const company = companies.find(company => company.name.toLowerCase() === String(company_name).toLowerCase());
  const type = company?.type ?? 'Продукты';
  const company_id = company?.id ?? '';
  return {
    id: '',
    company_type: type,
    date: new Date(data.data.json.dateTime),
    number: data.data.json.requestNumber,
    company_id,
    company_name,
    sum: data.data.json.totalSum,
    nds20: data.data.json.nds18 ?? 0,
    nds10: data.data.json.nds10 ?? 0,
    fd: data.data.json.fiscalDocumentNumber ?? 0,
  }
}

export async function fetchRawFromService({
  fn, i, fp, t, n, s
}: ProverkachekaParams) {
  const TOKEN = process.env.CHECK_TOKEN;
  const encodedParams = new URLSearchParams();
  encodedParams.append('fn', fn);
  encodedParams.append('fd', i);
  encodedParams.append('fp', fp);
  encodedParams.append('t', t);
  encodedParams.append('n', n);
  encodedParams.append('s', s);
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
  return data;
}
