'use client';

import { positiveRange } from "@/app/lib/utils";
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

  return (
    <div className="flex flex-row justify-center">
      {FirstPageBtn}
      {currentPage > 1 && PrevPageBtn}
      {positiveRange(currentPage - 3, currentPage + 4).map((page => {
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