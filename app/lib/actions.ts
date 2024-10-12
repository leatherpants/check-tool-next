'use server';

import { sql } from "@vercel/postgres";
import { fetchCheckFromService, fetchCompanyById } from "./data";
import { ProverkachekaParams } from "./definitions";
import { redirect } from "next/navigation";
import { z } from 'zod';
import { revalidatePath } from "next/cache";
import { getDateString } from "./utils";
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

// ...

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}


export async function addCheckFromService(params: ProverkachekaParams) {

  const { company_type, date, number, company_id, company_name, sum, nds10, nds20 } =
    await fetchCheckFromService(params);

  const dateString = date.toISOString().split('T')[0];

  // console.log(company_id);
  try {
    await sql`
      INSERT INTO checks (company_type, date, number, company_id, company_name, sum, nds10, nds20)
      VALUES (${company_type}, ${dateString}, ${number}, ${company_id}, ${company_name}, ${sum}, ${nds10}, ${nds20})
    `;
  } catch (error) {
    console.error('Database Error: ', error);
    throw new Error('Database Error: Failed to Create Check.');
  }

  redirect('/checks/add/qrcode');
}

export async function deleteCheck(id: string) {
  try {
    await sql`DELETE FROM checks WHERE id = ${id}`;
  } catch (error) {
    console.error('Database Error: Failed to delete check.', error);
    throw new Error('Database Error: Failed to delete check.');
  }

  revalidatePath('/checks');
}

const CheckFormSchema = z.object({
  // id: z.string(),
  date: z.coerce.date(),
  number: z.coerce.number(),
  sum: z.coerce.number(),
  nds10: z.coerce.number(),
  nds20: z.coerce.number(),
  company_id: z.string(),
  // company_type: z.string(),
})

export async function editCheck(id: string, formData: FormData) {

  const { date, number, sum, nds20, nds10, company_id } = CheckFormSchema.parse({
    date: formData.get('date'),
    number: formData.get('number'),
    sum: formData.get('sum'),
    nds10: formData.get('nds10'),
    nds20: formData.get('nds20'),
    company_id: formData.get('company_id')
  });

  const company = await fetchCompanyById(company_id);

  try {
    await sql`
    UPDATE checks
    SET date = ${getDateString(date)},
        number = ${number},
        sum = ${sum},
        nds10 = ${nds10},
        nds20 = ${nds20},
        company_id = ${company.id},
        company_name = ${company.name},
        company_type = ${company.type}
    WHERE id = ${id}
    `
  } catch (error) {
    console.error('Database Error: Failed to update check.', error);
    throw new Error('Database Error: Failed to update check.');
  }
  revalidatePath('/checks');
  redirect('/checks');
}


export async function addCheck(formData: FormData) {
  const { date, number, sum, nds20, nds10, company_id } = CheckFormSchema.parse({
    date: formData.get('date'),
    number: formData.get('number'),
    sum: formData.get('sum'),
    nds10: formData.get('nds10'),
    nds20: formData.get('nds20'),
    company_id: formData.get('company_id')
  });

  const company = await fetchCompanyById(company_id);

  try {
    await sql`
    INSERT INTO checks (
      date,
      number,
      sum,
      nds10,
      nds20,
      company_id,
      company_name,
      company_type
    )
    VALUES (
      ${getDateString(date)},
      ${number},
      ${sum},
      ${nds10},
      ${nds20},
      ${company.id},
      ${company.name},
      ${company.type}
    )
    `
  } catch (error) {
    console.error('Database Error: Failed to add check.', error);
    throw new Error('Database Error: Failed to add check.');
  }
  revalidatePath('/checks');
  redirect('/checks');

}



const CompanyFormSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
})

const CreateCompany = CompanyFormSchema.omit({ id: true });

export async function addCompany(formData: FormData) {
  const { name, type } = CreateCompany.parse({
    name: formData.get('name'),
    type: formData.get('type'),
  });

  try {
    await sql`
  INSERT INTO companies (name, type)
  VALUES (${name}, ${type})
  `;
  } catch (error) {
    console.error('Database Error: Failed to create company.', error);
    throw new Error('Database Error: Failed to create company.');
  }

  revalidatePath('/companies');
  redirect('/companies');
}

export async function deleteCompany(id: string) {
  try {
    await sql`DELETE FROM companies WHERE id = ${id}`;
  } catch (error) {
    console.error('Database Error: Failed to delete company.', error);
    throw new Error('Database Error: Failed to delete company.');
  }

  revalidatePath('/companies');
}

export async function editCompany(company_id: string, formData: FormData) {
  const { name, type } = CompanyFormSchema.parse({
    name: formData.get('name'),
    type: formData.get('type'),
  });

  try {
    await sql`
    UPDATE companies
    SET name = ${name}, type = ${type}
    WHERE id = ${company_id}
    `
  } catch (error) {
    console.error('Database Error: Failed to update company.', error);
    throw new Error('Database Error: Failed to update company.');
  }
  revalidatePath('/companies');
  redirect('/companies');
}

export async function addCompanyFromService(params: ProverkachekaParams) {

  const { company_type, date, number, company_id, company_name, sum, nds10, nds20 } =
    await fetchCheckFromService(params);

  const dateString = date.toISOString().split('T')[0];

  // console.log(company_id);
  try {
    await sql`
      INSERT INTO checks (company_type, date, number, company_id, company_name, sum, nds10, nds20)
      VALUES (${company_type}, ${dateString}, ${number}, ${company_id}, ${company_name}, ${sum}, ${nds10}, ${nds20})
    `;
  } catch (error) {
    console.error('Database Error: ', error);
    throw new Error('Database Error: Failed to Create Check.');
  }

  redirect('/checks/add/qrcode');
}