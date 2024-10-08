import { ChecksTable } from "@/app/lib/definitions"
import ListRow from "./ListRow";
import ListHeader from "./ListHeader";

interface ChecksListProps {
  checks: ChecksTable[];
}

export default function ChecksList({
  checks
}: ChecksListProps) {
  return (
    <div className="flex flex-col">
      <ListHeader />
      {checks.map(check => (
        <ListRow
          key={check.id}
          type={check.type}
          date={check.date}
          number={check.number}
          company={check.company_name}
          sum={check.sum}
          nds20={check.nds20}
          nds10={check.nds10} />
      ))}
    </div>
  )
}