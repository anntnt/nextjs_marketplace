'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

type Props = {
  placeholder: string;
  className?: string;
};

export default function Search({ placeholder, className }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    term = term.trim();
    if (term.length > 0) {
      router.push(`/search?query=${term}`);
      router.refresh();
    }
  }, 300);

  return (
    <div className={`relative w-full ${className ?? ''}`}>
      <input
        className="w-full rounded-full border border-blue-1000 px-4 py-2 pr-12 text-sm shadow-sm transition-colors focus:border-blue-900 focus:outline-none dark:border-blue-500 dark:bg-gray-800 dark:text-white"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
        required
      />
      <button
        type="submit"
        className="border-white absolute inset-y-1 right-2 flex items-center justify-center rounded-full px-3 py-1 text-sm font-semibold text-blue-1000 transition-colors hover:text-blue-900 focus:outline-none dark:text-blue-300 dark:hover:text-blue-200"
      >
        <svg
          className="h-4 w-4 text-blue-1000 dark:text-blue-300"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
        <span className="sr-only">Search</span>
      </button>
    </div>
  );
}
