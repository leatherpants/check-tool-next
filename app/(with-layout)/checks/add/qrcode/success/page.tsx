import { PageProps } from "@/.next/types/app/(with-layout)/checks/add/qrcode/success/page";
import { addCheckFromService } from "@/app/lib/actions";
import { PrimaryButton } from "@/app/ui/PrimaryButton";

export default async function Page({ searchParams }: PageProps) {

  const params = await searchParams;

  const createCheckFromServiceBind = addCheckFromService.bind(null, params);

  return (

    <div className="grid justify-center items-center">
      <form action={createCheckFromServiceBind}>
        <PrimaryButton type="submit">Save</PrimaryButton>
      </form>
    </div>

  )
}