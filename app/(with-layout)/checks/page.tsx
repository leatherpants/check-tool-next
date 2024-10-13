import Link from "next/link";
import { fetchChecksCount, fetchChecksPages } from "../../lib/data"
import ChecksList from "@/app/ui/checks/ChecksList";
import Pagination from "@/app/ui/checks/Pagination";
import { PageProps } from "@/.next/types/app/(with-layout)/checks/page";
import Search from "@/app/ui/checks/Search";
import { PrimaryButton } from "@/app/ui/PrimaryButton";
import { SecondaryButton } from "@/app/ui/SecondaryButton";

export default async function Page({ searchParams }: PageProps) {

  const { query, page } = await searchParams;

  const [pages, count] = await Promise.all([
    fetchChecksPages(query),
    fetchChecksCount(query),
  ]);

  return (<>
    <div className=" p-5 items-center">
      <div className="my-5 flex flex-col space-y-5 sm:space-y-0 sm:flex-row sm:space-x-5 sm:justify-center">
        <Search />
        <div className="flex gap-5 justify-center">
          <PrimaryButton>
            <Link href='/checks/add/qrcode'>Scan</Link>
          </PrimaryButton>
          <SecondaryButton>
            <Link href='/checks/add' >Add</Link>
          </SecondaryButton>
        </div>
      </div>
      <div className="">
        <ChecksList query={query} page={page} />
      </div>
      <div className="my-5 text-center">
        <p><span className="font-bold">{count}</span> checks found in total.</p>
      </div>
      <div className="mt-5">
        <Pagination pages={pages} />
      </div>
    </div >
  </>)
}