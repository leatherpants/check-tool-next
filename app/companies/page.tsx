import Link from "next/link";
import CompaniesList from "../ui/companies/CompaniesList";
import { PrimaryButton } from "../ui/PrimaryButton";
import { SecondaryButton } from "../ui/SecondaryButton";

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