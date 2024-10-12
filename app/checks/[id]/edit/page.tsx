import { fetchCheckById, fetchCompanies } from "@/app/lib/data"
import EditForm from "@/app/ui/checks/EditForm";


export default async function Page({
  params
}: {
  params: { id: string }
}) {
  const { id } = await params;
  const [check, companies] = await Promise.all([
    fetchCheckById(id),
    fetchCompanies()
  ]);

  return (<>
    <EditForm companies={companies} check={check} />
  </>)
}