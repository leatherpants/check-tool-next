import { editCompany } from "@/app/lib/actions";
import { CompaniesTable } from "@/app/lib/definitions"
import Link from "next/link";

interface EditFormProps {
  company: CompaniesTable;
}

export default function EditForm({ company }: EditFormProps) {
  const editCompanyWithId = editCompany.bind(null, company.id);
  return (<>
    <form action={editCompanyWithId}
      className="grid grid-cols-1 gap-5 text-lg p-5"
    >
      <div className="flex flex-col">
        <label htmlFor="name" className="pl-3 font-bold">Company Name:</label>
        <input className="p-2 rounded-xl border focus:outline-none focus:ring" type="text" name="name" id="name"
          defaultValue={company.name}
          required />
      </div>
      <div className="flex flex-col">
        <label htmlFor="type" className="pl-3 font-bold">Type:</label>
        <input className="p-2 rounded-xl border focus:outline-none focus:ring" type="text" name="type" id="type"
          defaultValue={company.type} />
      </div>

      <div className="flex justify-center gap-5 mt-5">
        <button type="submit" className="py-1 px-2 self-center rounded-lg border bg-primary-500 text-white border-primary-500 hover:bg-primary-600 active:bg-primary-700">Save</button>
        <Link href='/companies/'
          className="border-2 rounded-xl px-2 py-1 block self-start
        border-gray-500 text-gray-500 hover:bg-gray-400 hover:text-white active:bg-gray-500" >
          Cancel
        </Link>
      </div>

    </form>
  </>)
}