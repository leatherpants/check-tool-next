'use client';

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
  category: string;
}

export default function NavItem({ category }: NavItemProps) {
  const path = usePathname();
  const isCurrentPath = path.split('/')[1] === category;
  return (<>
    <Link href={`/${category}`} className={`
      uppercase py-3 px-5 rounded-3xl lg:rounded-l-xl lg:rounded-r-none lg:ml-2
      ${clsx({
      'bg-primary-200 text-primary-950 lg:bg-white': isCurrentPath,
      'bg-primary-100 text-primary-950 lg:bg-primary-500 lg:text-white': !isCurrentPath
    })}
      `} >{category}</Link>
  </>);
}