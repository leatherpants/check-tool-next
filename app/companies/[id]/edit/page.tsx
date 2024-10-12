import { fetchCompanyById } from "@/app/lib/data"
import EditForm from "@/app/ui/companies/EditForm"

export default async function Page({ params }: {
  params: { id: string }
}) {

  const company = await fetchCompanyById(params.id);

  return (<>
    <div className="p-10 w-96 mx-auto">
      <EditForm company={company} />

    </div>
  </>)
}