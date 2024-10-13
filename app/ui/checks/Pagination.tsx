'use client';

import { range } from "@/app/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";
import PageButton from "../PageButton";

interface PaginationProps {
  pages: number;
}

export default function Pagination({ pages }: PaginationProps) {
  const path = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number.parseInt(searchParams.get('page') ?? '1');
  const setSearchParams = new URLSearchParams(searchParams);

  setSearchParams.set('page', '1');
  const FirstPageBtn = <PageButton text='<<' isFirst={true} href={`${path}/?${setSearchParams.toString()}`} />
  setSearchParams.set('page', pages.toString());
  const LastPageBtn = <PageButton text='>>' isLast={true} href={`${path}/?${setSearchParams.toString()}`} />
  setSearchParams.set('page', (currentPage - 1).toString());
  const PrevPageBtn = <PageButton text='<' href={`${path}/?${setSearchParams.toString()}`} />
  setSearchParams.set('page', (currentPage + 1).toString());
  const NextPageBtn = <PageButton text='>' href={`${path}/?${setSearchParams.toString()}`} />

  const from = currentPage - 2 < 1 ? 1 : currentPage - 2;
  const to = currentPage + 2 > pages ? pages + 1 : currentPage + 3;

  return (
    <div className="flex flex-row justify-center">
      {FirstPageBtn}
      {currentPage > 1 && PrevPageBtn}
      {range(from, to).map((page => {
        setSearchParams.set('page', page.toString());
        const isCurrentPage = page === currentPage;
        return (
          <PageButton key={`page+${page}`} text={page.toString()} isCurrent={isCurrentPage} href={`${path}/?${setSearchParams.toString()}`} />
        )
      }))}
      {currentPage < pages && NextPageBtn}
      {LastPageBtn}
    </div>
  )
}