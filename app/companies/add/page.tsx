import AddForm from "@/app/ui/companies/AddForm";
import { SearchParams } from "next/dist/server/request/search-params";

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const { name } = await searchParams;
  return (
    <div className="p-10 mx-auto w-96">
      <AddForm company_name={(name ?? '').toString()} />
    </div>
  )
}