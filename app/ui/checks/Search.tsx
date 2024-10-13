'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search() {
  const pathname = usePathname()
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const route = useRouter();

  const handleSearch = useDebouncedCallback((query: string) => {
    if (query) {
      params.set('query', query);

    } else {
      params.delete('query');
    }
    route.replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (<>
    <input
      className="p-2 rounded-xl border focus:outline-none focus:ring"
      type="text" name="query" id="query" placeholder="Search here..."
      onChange={(e) => { handleSearch(e.target.value) }}
      defaultValue={searchParams.get('query')?.toString()}
    />
  </>)
}