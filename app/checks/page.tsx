import Link from "next/link";
import { fetchChecksPages } from "../lib/data"
import ChecksList from "../ui/checks/ChecksList";
import Pagination from "../ui/checks/Pagination";
import { PageProps } from "@/.next/types/app/checks/page";

export default async function Page({ searchParams }: PageProps) {

  const { query, page } = await searchParams;

  const pages = await fetchChecksPages(query);

  return (<>
    <div className="flex flex-col p-5">
      <div className="flex gap-5 justify-center">
        <Link href='/checks/add/qrcode'
          className="border-2 rounded-xl px-3 py-2 mb-5 block 
    border-primary-500 text-white bg-primary-500 hover:bg-primary-600 active:bg-primary-700" >
          Scan
        </Link>
        <Link href='/checks/add'
          className="border-2 rounded-xl px-3 py-2 mb-5 block 
      border-primary-500 text-primary-500 hover:bg-primary-600 hover:text-white active:bg-primary-700" >
          Add
        </Link>

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