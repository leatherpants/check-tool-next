import ListRow from "./ListRow";
import { fetchFilteredChecks } from "@/app/lib/data";

interface ChecksListProps {
  query: string;
  page: string
}

export default async function ChecksList({
  query, page
}: ChecksListProps) {
  let currentPage = 1;
  if (page && Number.parseInt(page) > 1) currentPage = Number.parseInt(page);
  const checks = await fetchFilteredChecks(query, currentPage);

  return (
    <div className="rounded-xl">
      {/* <ListHeader /> */}
      {checks.map(check => <ListRow key={check.id} check={check} />)}
    </div>
  )
}