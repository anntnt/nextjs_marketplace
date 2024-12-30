'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    // params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    // Use the URL constructor to safely construct the full URL
    // const newUrl = new URL(pathname, window.location.origin);
    // newUrl.search = params.toString();

    // replace(newUrl.toString() as any); // Use 'as any' to bypass TypeScript's strict check
    replace(`${pathname}?${params.toString()}` as any);
    // console.log('newUrl:', newUrl);
  }, 300);

  return (
    <div className="relative">
      <input
        className="px-2 sm:px-4 py-2 rounded-lg border border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-600 "
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
    </div>
  );
}
