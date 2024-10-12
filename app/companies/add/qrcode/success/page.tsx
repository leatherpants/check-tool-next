import { addCheckFromService } from "@/app/lib/actions";
import { fetchRawFromService } from "@/app/lib/data";
import { ProverkachekaParams } from "@/app/lib/definitions";
import Link from "next/link";

export default async function Page({
  searchParams
}: {
  searchParams: ProverkachekaParams
}) {
  const raw = await fetchRawFromService(searchParams);
  const company_name = raw.data.json.user;

  return (<>
    <Link href={`/companies/add?name=${company_name}`} >Save</Link>
  </>
  )
}