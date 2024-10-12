import { PageProps } from "@/.next/types/app/checks/add/qrcode/success/page";
import { addCheckFromService } from "@/app/lib/actions";

export default async function Page({ searchParams }: PageProps) {

  const params = await searchParams;

  const createCheckFromServiceBind = addCheckFromService.bind(null, params);

  return (
    <form action={createCheckFromServiceBind}>
      <button type="submit">Save</button>
    </form>
  )
}