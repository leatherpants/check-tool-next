import { fetchCheckById, fetchCompanies } from "@/app/lib/data"
import EditForm from "@/app/ui/checks/EditForm";


export default async function Page({
  params
}: {
  params: { id: string }
}) {
  const [check, companies] = await Promise.all([
    fetchCheckById(params.id),
    fetchCompanies()
  ]);

  return (<>
    <EditForm companies={companies} check={check} />
  </>)
}