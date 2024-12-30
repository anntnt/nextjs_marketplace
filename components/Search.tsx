'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { getSafeReturnToPath } from '../util/validation';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const router = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    router.push(`/search?query=${term}`);

    router.refresh();
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
