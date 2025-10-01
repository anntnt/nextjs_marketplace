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
        className="w-full px-3 sm:px-4 py-2 pr-12 rounded-lg border border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-600"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
        required
      />
      <button
        type="submit"
        className="absolute inset-y-0 right-0 flex items-center justify-center px-3 text-sm font-medium text-white bg-blue-1000 rounded-e-lg border border-blue-700 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg
          className="w-4 h-4"
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
