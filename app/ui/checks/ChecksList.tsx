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
    <div className="rounded-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {/* <ListHeader /> */}
      {checks.map(check => <ListRow key={check.id} check={check} />)}
    </div>
  )
}