import { deleteCompany } from "@/app/lib/actions";
import { CompaniesTable } from "@/app/lib/definitions";
import Link from "next/link";
import { PrimaryButton } from "../PrimaryButton";
import { DangerButton } from "../DangerButton";

export default function ListRow({ company: { id, name, type } }: { company: CompaniesTable }) {
  const deleteCompanyWithId = deleteCompany.bind(null, id);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-3 p-3 justify-center items-center md:max-w-96
    first:rounded-t-xl last:rounded-b-xl md:rounded-xl
    odd:bg-gray-100 even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-700 hover:bg-primary-100 dark:hover:bg-primary-950">

      <div>
        <p className="font-bold">Name:</p>
        <div className="">{name}</div>
      </div>
      <div>
        <p className="font-bold">Type:</p>
        <div className="">{type}</div>
      </div>
      <div className="col-span-full place-self-end flex flex-row space-x-2">
        <PrimaryButton>
          <Link href={`/companies/${id}/edit`}>Edit</Link>
        </PrimaryButton>
        <form action={deleteCompanyWithId} >
          <DangerButton type="submit">Delete</DangerButton>
        </form>
      </div>
    </div>
  )
}