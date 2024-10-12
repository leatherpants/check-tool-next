import Link from "next/link";
import CompaniesList from "../ui/companies/CompaniesList";

export default function Page() {

  return (
    <div className="flex flex-col p-5">
      <div className="flex gap-5 justify-center">
        <Link href='/companies/add/qrcode'
          className="border-2 rounded-xl px-3 py-2 mb-5 block 
    border-primary-500 text-white bg-primary-500 hover:bg-primary-600 active:bg-primary-700" >
          Scan
        </Link>
        <Link href='/companies/add'
          className="border-2 rounded-xl px-3 py-2 mb-5 block 
      border-primary-500 text-primary-500 hover:bg-primary-600 hover:text-white active:bg-primary-700" >
          Add
        </Link>

      </div>

      <div>
        <CompaniesList />
      </div>
    </div>
  )
}