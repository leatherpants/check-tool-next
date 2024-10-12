import { fetchCompanies } from "@/app/lib/data"
import ListRow from "./ListRow";

export default async function CompaniesList() {

  const companies = await fetchCompanies();

  return (<>
    <div className="rounded-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {/* <ListHeader /> */}
      {companies.map(company => <ListRow company={company} key={company.id} />)}
    </div>
  </>)
}