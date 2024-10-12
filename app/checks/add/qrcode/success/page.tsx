import { addCheckFromService } from "@/app/lib/actions";
import { ProverkachekaParams } from "@/app/lib/definitions";

export default function Page({
  searchParams
}: {
  searchParams: ProverkachekaParams
}) {

  const createCheckFromServiceBind = addCheckFromService.bind(null, searchParams);

  return (
    <form action={createCheckFromServiceBind}>
      <button type="submit">Save</button>
    </form>
  )
}