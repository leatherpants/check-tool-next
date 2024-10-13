import clsx from "clsx";
import Link from "next/link";

interface PageButtonProps {
  text: string;
  isFirst?: boolean;
  isLast?: boolean;
  isCurrent?: boolean;
  href: string;
}

export default function PageButton({ href, text, isCurrent = false, isFirst = false, isLast = false }: PageButtonProps) {
  return (<>
    <Link className={`
            px-3 py-2 border
          ${clsx({
      'border-primary-500 bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700': isCurrent,
      'border-primary-500 text-primary-500 hover:bg-primary-600 hover:text-white active:bg-primary-700': !isCurrent,
      'rounded-l-lg': isFirst,
      'rounded-r-lg': isLast
    })}
          `}
      href={href}
    >
      {text}
    </Link>
  </>)
}