import { PageProps } from "@/.next/types/app/companies/add/qrcode/success/page";
import { fetchRawFromService } from "@/app/lib/data";
import Link from "next/link";

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  const raw = await fetchRawFromService(params);
  const company_name = raw.data.json.user;

  return (<>
    <Link href={`/companies/add?name=${company_name}`} >Save</Link>
  </>
  )
}