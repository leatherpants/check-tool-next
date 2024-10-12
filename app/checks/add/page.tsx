import { fetchCompanies } from "@/app/lib/data"
import AddForm from "@/app/ui/checks/AddForm";

export default async function Page() {
  const companies = await fetchCompanies();
  return (<>
    <AddForm companies={companies} />
  </>)
}