import { deleteCheck } from "@/app/lib/actions";
import { ChecksTable } from "@/app/lib/definitions";
import { getDateStringInRussianFormat } from "@/app/lib/utils";
import Link from "next/link";

interface ListItemProps {
  check: ChecksTable;
}

export default function ListRow({ check: {
  company_type, date, number, company_name, sum, nds20, nds10, id
} }: ListItemProps) {
  const deleteCheckWithId = deleteCheck.bind(null, id);

  return (
    <div className="grid grid-cols-3 gap-1 p-3 justify-center items-center 
    first:rounded-t-xl last:rounded-b-xl
    odd:bg-gray-100 even:bg-gray-50 hover:bg-primary-100">
      <div>
        <p className="font-bold">Type:</p>
        <div className="">{company_type}</div>
      </div>
      <div>
        <p className="font-bold">Date:</p>
        <div className="">{getDateStringInRussianFormat(date)}</div>
      </div>
      <div>
        <p className="font-bold">Number:</p>
        <div className="">{number}</div>
      </div>
      <div>
        <p className="font-bold">Sum:</p>
        <div className="">{sum}</div>
      </div>
      <div>
        <p className="font-bold">nds20:</p>
        <div className="">{nds20}</div>
      </div>
      <div>
        <p className="font-bold">nds10:</p>
        <div className="">{nds10}</div>
      </div>
      <div className="col-span-full">
        <p className="font-bold">Company:</p>
        <div >{company_name}</div>
      </div>
      <div className="col-span-3 place-self-end flex flex-row space-x-2">
        <Link href={`/checks/${id}/edit`}
          className="border-2 rounded-xl px-2 py-1
         border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white active:bg-primary-700" >Edit</Link>
        <form action={deleteCheckWithId} >
          <button className="border-2 rounded-xl px-2 py-1
           border-red-500 text-red-500 hover:bg-red-500 hover:text-white active:bg-red-700" type="submit">Delete</button>
        </form>
      </div>
    </div>
  )
}