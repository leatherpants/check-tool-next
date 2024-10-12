import { addCompany } from "@/app/lib/actions";
import Link from "next/link";

export default function AddForm({ company_name }: { company_name: string }) {
  return (
    <form action={addCompany}
      className="grid grid-cols-1 gap-5 text-lg p-5"
    >
      <div className="flex flex-col">
        <label htmlFor="name" className="pl-3 font-bold">Company Name:</label>
        <input className="p-2 rounded-xl border focus:outline-none focus:ring" type="text" name="name" id="name"
          defaultValue={company_name} required />
      </div>
      <div className="flex flex-col">
        <label htmlFor="type" className="pl-3 font-bold">Type:</label>
        <input className="p-2 rounded-xl border focus:outline-none focus:ring" type="text" name="type" id="type" />
      </div>
      <div className="flex justify-center gap-5 mt-5">
        <button type="submit" className="border-2 rounded-xl px-2 py-1 block self-center
        border-primary-500 text-white bg-primary-500 hover:bg-primary-600 active:bg-primary-700">Save</button>
        <Link href='/companies/'
          className="border-2 rounded-xl px-2 py-1 block self-start
        border-gray-500 text-gray-500 hover:bg-gray-400 hover:text-white active:bg-gray-500" >
          Cancel
        </Link>
      </div>
    </form>
  )
}