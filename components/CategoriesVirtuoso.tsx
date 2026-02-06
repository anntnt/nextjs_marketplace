'use client';

import { Card } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { VirtuosoGrid } from 'react-virtuoso';

type Category = {
  id: number;
  categoryName: string;
  imageUrl: string;
};

const CategoriesGridList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ style, className, children, ...rest }, ref) => (
  <div
    ref={ref}
    style={style}
    className={`grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 ${
      className ?? ''
    }`}
    {...rest}
  >
    {children}
  </div>
));

CategoriesGridList.displayName = 'CategoriesGridList';

const PAGE_SIZE = 30;

export default function CategoriesVirtuoso() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const categoriesRef = React.useRef<HTMLDivElement>(null);

  const smoothScrollTo = useCallback((targetY: number, duration = 1100) => {
    if (typeof window === 'undefined') return;

    const startY = window.scrollY;
    const distance = targetY - startY;
    if (distance === 0) return;

    const startTime = performance.now();
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      window.scrollTo(0, startY + distance * eased);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, []);

  const scrollToTop = useCallback(() => {
    if (typeof window === 'undefined') return;

    if (!categoriesRef.current) return;
    const rect = categoriesRef.current.getBoundingClientRect();
    const scrollTarget = window.scrollY + rect.top - 120;
    

    smoothScrollTo(Math.max(0, scrollTarget));
  }, [smoothScrollTo]);

  const changePage = useCallback(
    (newPage: number) => {
      setPage(newPage);
      requestAnimationFrame(scrollToTop);
    },
    [scrollToTop],
  );

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const offset = (page - 1) * PAGE_SIZE;
      const response = await fetch(
        `/api/categories?limit=${PAGE_SIZE}&offset=${offset}`,
      );

      if (!response.ok) {
        throw new Error('Failed to load categories');
      }

      const data: { categories: Category[]; total: number } =
        await response.json();
      setCategories(data.categories);
      setTotal(data.total);
    } catch (error) {
      console.error(error);
      setCategories([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const renderItemContent = (index: number) => {
    const category = categories[index];
    if (!category) return <div className="p-2" />;

    return (
      <div className="p-2" key={category.id}>
        <Card
          className="flex flex-col"
          renderImage={() => (
            <Link href={`/marketplace/${category.id}`}>
              <Image
                width={500}
                height={500}
                src={category.imageUrl}
                alt={`Category ${category.categoryName}`}
              />
            </Link>
          )}
        >
          <Link
            href={`/marketplace/${category.id}`}
            className="text-brand-text transition-colors hover:text-brand-primary dark:text-dark-text dark:hover:text-brand-primary"
          >
            <h2 className="text-lg font-semibold tracking-tight">
              {category.categoryName}
            </h2>
          </Link>
        </Card>
      </div>
    );
  };

  const renderPagination = () => {
    if (total === 0 || total <= PAGE_SIZE) {
      return null;
    }

    const start = Math.max(1, page - 1);
    const end = Math.min(totalPages, page + 1);
    const buttons = [];

    for (let i = start; i <= end; i++) {
      buttons.push(
        <button
          key={`category-page-${i}`}
          className={`mx-1 rounded-md border px-3 py-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/60 ${
            i === page
              ? 'border-brand-primary bg-brand-primary text-white'
              : 'border-brand-muted/30 bg-brand-surface text-brand-muted hover:border-brand-primary hover:text-brand-primary dark:border-dark-muted/30 dark:bg-dark-surface dark:text-dark-muted dark:hover:border-brand-primary dark:hover:text-brand-primary'
          }`}
          onClick={() => changePage(i)}
          disabled={loading || i === page}
        >
          {i}
        </button>,
      );
    }

    return (
      <div className="mt-8 flex items-center justify-center gap-2 text-brand-muted dark:text-dark-muted">
        <button
          className="rounded-md border border-brand-muted/30 px-3 py-1 transition-colors hover:border-brand-primary hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/60 disabled:opacity-40 disabled:hover:border-brand-muted/30 disabled:hover:text-brand-muted dark:border-dark-muted/30 dark:hover:border-brand-primary dark:hover:text-brand-primary dark:disabled:hover:border-dark-muted/30 dark:disabled:hover:text-dark-muted"
          onClick={() => changePage(1)}
          disabled={page === 1 || loading}
        >
          First
        </button>
        {start > 1 && <span>…</span>}
        {buttons}
        {end < totalPages && <span>…</span>}
        <button
          className="rounded-md border border-brand-muted/30 px-3 py-1 transition-colors hover:border-brand-primary hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/60 disabled:opacity-40 disabled:hover:border-brand-muted/30 disabled:hover:text-brand-muted dark:border-dark-muted/30 dark:hover:border-brand-primary dark:hover:text-brand-primary dark:disabled:hover:border-dark-muted/30 dark:disabled:hover:text-dark-muted"
          onClick={() => changePage(totalPages)}
          disabled={page === totalPages || loading}
        >
          Last
        </button>
      </div>
    );
  };

  return (
<div ref={categoriesRef} className="relative">
      {(loading || categories.length === 0) && (
        <div className="mb-6 flex w-full items-center justify-center">
          <div className="flex items-center gap-3 rounded-full border border-brand-muted/30 bg-brand-surface px-4 py-2 text-sm text-brand-muted shadow-sm shadow-brand-primary/10 dark:border-dark-muted/40 dark:bg-dark-surface dark:text-dark-muted">
            <svg
              className="h-4 w-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            Loading categories…
          </div>
        </div>
      )}
      <VirtuosoGrid
        useWindowScroll
        totalCount={categories.length}
        itemContent={renderItemContent}
        components={{ List: CategoriesGridList }}
      />
      {renderPagination()}
    </div>
  );
}

