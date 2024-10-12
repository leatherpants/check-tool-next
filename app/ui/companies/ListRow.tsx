import { deleteCompany } from "@/app/lib/actions";
import { CompaniesTable } from "@/app/lib/definitions";
import Link from "next/link";

export default function ListRow({ company: { id, name, type } }: { company: CompaniesTable }) {
  const deleteCompanyWithId = deleteCompany.bind(null, id);

  return (
    <div className="grid grid-cols-2 gap-3 p-3 justify-center items-center 
    first:rounded-t-xl last:rounded-b-xl md:rounded-xl
    odd:bg-gray-100 even:bg-gray-50 hover:bg-primary-100">

      <div>
        <p className="font-bold">Name:</p>
        <div className="">{name}</div>
      </div>
      <div>
        <p className="font-bold">Type:</p>
        <div className="">{type}</div>
      </div>
      <div className="col-span-2 place-self-end flex flex-row space-x-2">
        <Link href={`/companies/${id}/edit`}
          className="border-2 rounded-xl px-2 py-1
         border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white active:bg-primary-700" >Edit</Link>
        <form action={deleteCompanyWithId} >
          <button className="border-2 rounded-xl px-2 py-1
           border-red-500 text-red-500 hover:bg-red-500 hover:text-white active:bg-red-700" type="submit">Delete</button>
        </form>
      </div>
    </div>
  )
}