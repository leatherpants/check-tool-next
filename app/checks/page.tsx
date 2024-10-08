import { fetchFilteredChecks } from "../lib/data"
import ChecksList from "../ui/checks/ChecksList";

export default async function Page() {

  const checks = await fetchFilteredChecks('', 1);

  return (
    <div>
      <ChecksList checks={checks} />
    </div>
  )
}