import { editCheck } from "@/app/lib/actions";
import { ChecksTable, CompaniesTable } from "@/app/lib/definitions"
import Link from "next/link";

export default function EditForm({
  companies,
  check: { id, date, number, sum, nds10, nds20, company_id }
}: {
  companies: CompaniesTable[];
  check: ChecksTable;
}) {
  const editCheckWithId = editCheck.bind(null, id);

  return (<>
    <form action={editCheckWithId}
      className="grid grid-cols-1 gap-5 text-lg p-5
      md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
      "
    >
      <div className="flex flex-col">
        <label className="pl-3 font-bold"
          htmlFor="date">Date:</label>
        <input className="p-2 rounded-xl border focus:outline-none focus:ring"
          type="date" name="date" id="date" defaultValue={date.toISOString().split('T')[0]} required />
      </div>
      <div className="flex flex-col">
        <label className="pl-3 font-bold"
          htmlFor="number">Number:</label>
        <input className="p-2 rounded-xl border focus:outline-none focus:ring"
          type="number" name="number" id="number" defaultValue={number} required />
      </div>
      <div className="flex flex-col">
        <label className="pl-3 font-bold"
          htmlFor="sum">Sum:</label>
        <input className="p-2 rounded-xl border focus:outline-none focus:ring"
          type="number" name="sum" id="sum" defaultValue={sum} required />
      </div>
      <div className="flex flex-col">
        <label className="pl-3 font-bold"
          htmlFor="nds10">nds10:</label>
        <input className="p-2 rounded-xl border focus:outline-none focus:ring"
          type="number" name="nds10" id="nds10" defaultValue={nds10} required />
      </div>
      <div className="flex flex-col">
        <label className="pl-3 font-bold"
          htmlFor="nds20">nds20:</label>
        <input className="p-2 rounded-xl border focus:outline-none focus:ring"
          type="number" name="nds20" id="nds20" defaultValue={nds20} required />
      </div>
      <div className="flex flex-col">
        <label className="pl-3 font-bold"
          htmlFor="company_name">Company:</label>
        <select className="p-2 rounded-xl border focus:outline-none focus:ring"
          name="company_id" id="company_id" defaultValue={company_id} required>
          {companies.map(company => <option value={company.id} key={company.id}>{company.name}</option>)}
        </select>
      </div>
      <div className="flex justify-center gap-5 mt-5">
        <button type="submit" className="border-2 rounded-xl px-2 py-1 block 
        border-primary-500 text-white bg-primary-500 hover:bg-primary-600 active:bg-primary-700">
          Save
        </button>
        <Link href='/checks/'
          className="border-2 rounded-xl px-2 py-1 block leading-10
        border-gray-500 text-gray-500 hover:bg-gray-400 hover:text-white active:bg-gray-500" >
          Cancel
        </Link>
      </div>
    </form >
  </>)
}