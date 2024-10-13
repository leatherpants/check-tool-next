import { PageProps } from "@/.next/types/app/checks/add/qrcode/success/page";
import { addCheckFromService } from "@/app/lib/actions";

export default async function Page({ searchParams }: PageProps) {

  const params = await searchParams;

  const createCheckFromServiceBind = addCheckFromService.bind(null, params);

  return (

    <div className="grid justify-center items-center">
      <form action={createCheckFromServiceBind}>
        <button
          className="border-2 rounded-xl px-2 py-1 block 
      border-primary-500 text-white bg-primary-500 hover:bg-primary-600 active:bg-primary-700"
          type="submit">Save</button>
      </form>
    </div>

  )
}