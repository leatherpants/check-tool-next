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
      uppercase py-3 px-5 border rounded-3xl
      ${clsx({
      'bg-primary-200 text-primary-950': isCurrentPath,
      'bg-primary-100 text-primary-950': !isCurrentPath
    })}
      `} >{category}</Link>
  </>);
}