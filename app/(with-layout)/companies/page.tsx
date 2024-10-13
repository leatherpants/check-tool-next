import Link from "next/link";
import CompaniesList from "@/app/ui/companies/CompaniesList";
import { PrimaryButton } from "@/app/ui/PrimaryButton";
import { SecondaryButton } from "@/app/ui/SecondaryButton";

export default function Page() {

  return (
    <div className="flex flex-col p-5 pb-24">
      <div className="flex gap-5 justify-center mb-5">
        <PrimaryButton>
          <Link href='/companies/add/qrcode'>Scan</Link>
        </PrimaryButton>
        <SecondaryButton>
          <Link href='/companies/add'>Add</Link>
        </SecondaryButton>
      </div>

      <div>
        <CompaniesList />
      </div>
    </div>
  )
}