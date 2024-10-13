import { PageProps } from "@/.next/types/app/companies/add/qrcode/success/page";
import { fetchRawFromService } from "@/app/lib/data";
import { PrimaryButton } from "@/app/ui/PrimaryButton";
import Link from "next/link";

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  const raw = await fetchRawFromService(params);
  const company_name = raw.data.json.user;

  return (<>
    <div className="grid w-full h-dvh justify-center items-center">
      <PrimaryButton>
        <Link href={`/companies/add?name=${company_name}`} >Save</Link>
      </PrimaryButton>
    </div>
  </>
  )
}