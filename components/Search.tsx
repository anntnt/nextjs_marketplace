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
        className="w-full rounded-full border border-brand-border/70 bg-brand-surface px-4 py-2 pr-12 text-sm text-brand-text shadow-sm transition-colors placeholder:text-brand-muted focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30 dark:border-dark-muted/60 dark:bg-dark-surface dark:text-dark-text dark:placeholder:text-dark-muted"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
        required
      />
      <button
        type="submit"
        className="absolute inset-y-1 right-2 flex items-center justify-center rounded-full px-3 py-1 text-sm font-semibold text-brand-primary transition-colors hover:text-brand-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/60 dark:text-brand-primary"
      >
        <svg
          className="h-4 w-4 text-brand-primary"
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
