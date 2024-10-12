import { PageProps } from "@/.next/types/app/companies/add/page";
import AddForm from "@/app/ui/companies/AddForm";

export default async function Page({ searchParams }: PageProps) {
  const { name } = await searchParams;
  return (
    <div className="p-10 mx-auto w-96">
      <AddForm company_name={(name ?? '').toString()} />
    </div>
  )
}