import { fetchCompanies } from "@/app/lib/data"
import ListRow from "./ListRow";

export default async function CompaniesList() {

  const companies = await fetchCompanies();

  return (<>
    <div className="rounded-xl">
      {/* <ListHeader /> */}
      {companies.map(company => <ListRow company={company} key={company.id} />)}
    </div>
  </>)
}