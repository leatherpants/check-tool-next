'use client';

import { range } from "@/app/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";

interface PaginationProps {
  pages: number;
}

export default function Pagination({ pages }: PaginationProps) {
  const path = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number.parseInt(searchParams.get('page') ?? '1');
  const setSearchParams = new URLSearchParams(searchParams);

  return (
    <div className="flex flex-row justify-center">
      {range(1, pages + 1).map((page => {
        setSearchParams.set('page', page.toString());
        const isCurrentPage = page === currentPage;
        return (
          <Link className={`
            px-3 py-2 border first:rounded-l-lg last:rounded-r-lg
          ${clsx({
            'border-primary-500 bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700': isCurrentPage,
            'border-primary-500 text-primary-500 hover:bg-primary-600 active:bg-primary-700': !isCurrentPage,
          })}
          `}
            key={`page+${page}`}
            href={`${path}/?${setSearchParams.toString()}`}
          >
            {page}
          </Link>
        )
      }))}
    </div>
  )
}