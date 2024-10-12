import { PageProps } from "@/.next/types/app/companies/[id]/edit/page";
import { fetchCompanyById } from "@/app/lib/data"
import EditForm from "@/app/ui/companies/EditForm"

export default async function Page({ params }: PageProps) {

  const { id } = await params;

  const company = await fetchCompanyById(id);

  return (<>
    <div className="p-10 w-96 mx-auto">
      <EditForm company={company} />

    </div>
  </>)
}