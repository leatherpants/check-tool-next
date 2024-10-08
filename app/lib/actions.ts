'use server';

import { sql } from "@vercel/postgres";
import { fetchCheckFromService } from "./data";
import { ProverkachekaParams } from "./definitions";
import { redirect } from "next/navigation";

export async function createCheckFromService(params: ProverkachekaParams) {

  const { type, date, number, company_id, company_name, sum, nds10, nds20 } =
    await fetchCheckFromService(params);

  const dateString = date.toISOString().split('T')[0];

  // console.log(company_id);
  try {
    await sql`
      INSERT INTO checks (type, date, number, company_id, company_name, sum, nds10, nds20)
      VALUES (${type}, ${dateString}, ${number}, ${company_id}, ${company_name}, ${sum}, ${nds10}, ${nds20})
    `;
  } catch (error) {
    console.error('Database Error: ', error);
    throw new Error('Database Error: Failed to Create Check.');
  }

  redirect('/checks/create/qrcode');
}