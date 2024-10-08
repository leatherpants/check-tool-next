import { getDateStringInRussianFormat } from "@/app/lib/utils";

interface ListItemProps {
  type: string;
  date: Date;
  number: number;
  company: string;
  sum: number;
  nds20: number;
  nds10: number;
}

export default function ListRow({
  type, date, number, company, sum, nds20, nds10,
}: ListItemProps) {
  return (
    <div className="flex gap-5">
      <p>{type}</p>
      <p>{getDateStringInRussianFormat(date)}</p>
      <p>{number}</p>
      <p>{company}</p>
      <p>{sum}</p>
      <p>{nds20}</p>
      <p>{nds10}</p>
      <button type="button">Edit</button>
      <button type="button">Delete</button>
    </div>
  )
}