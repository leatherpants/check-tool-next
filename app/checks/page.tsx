import Link from "next/link";
import { fetchChecksPages } from "../lib/data"
import ChecksList from "../ui/checks/ChecksList";
import Pagination from "../ui/checks/Pagination";
import { PageProps } from "@/.next/types/app/checks/page";
import Search from "../ui/checks/Search";
import { PrimaryButton } from "../ui/PrimaryButton";
import { SecondaryButton } from "../ui/SecondaryButton";

export default async function Page({ searchParams }: PageProps) {

  const { query, page } = await searchParams;

  const pages = await fetchChecksPages(query);

  return (<>
    <div className=" p-5 items-center">
      <div className="text-center my-5">
        <Search />
      </div>
      <div className="flex gap-5 justify-center mb-5">
        <PrimaryButton>
          <Link href='/checks/add/qrcode'>Scan</Link>
        </PrimaryButton>
        <SecondaryButton>
          <Link href='/checks/add' >Add</Link>
        </SecondaryButton>
      </div>
      <div className="">
        <ChecksList query={query} page={page} />
      </div>
      <div className="mt-3 mb-24">
        <Pagination pages={pages} />
      </div>
    </div >
  </>)
}