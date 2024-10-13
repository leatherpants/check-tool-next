import { PageProps } from "@/.next/types/app/companies/add/qrcode/success/page";
import { fetchRawFromService } from "@/app/lib/data";
import Link from "next/link";

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  const raw = await fetchRawFromService(params);
  const company_name = raw.data.json.user;

  return (<>
    <div className="grid justify-center items-center">
      <Link
        className="border-2 rounded-xl px-2 py-1 block 
        border-primary-500 text-white bg-primary-500 hover:bg-primary-600 active:bg-primary-700"
        href={`/companies/add?name=${company_name}`} >Save</Link>
    </div>
  </>
  )
}