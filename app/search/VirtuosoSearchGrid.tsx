'use client';

import { Card } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { VirtuosoGrid } from 'react-virtuoso';
import type { Product } from '../../database/products';
import AddToCartForm from './addToCartForm';

type Props = {
  query: string;
  pageSize?: number;
};

const VirtuosoGridList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ style, className, children, ...rest }, ref) => (
  <div
    ref={ref}
    style={style}
    className={`grid gap--y-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 ${
      className ?? ''
    }`}
    {...rest}
  >
    {children}
  </div>
));
VirtuosoGridList.displayName = 'VirtuosoGridList';

export default function VirtuosoSearchGrid({
  query,
  pageSize = 30, // Default page size
}: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const smoothScrollTo = useCallback((targetY: number, duration = 900) => {
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

    const top = containerRef.current?.getBoundingClientRect().top ?? 0;
    const scrollTarget = window.scrollY + top - 120;

    smoothScrollTo(Math.max(0, scrollTarget));
  }, [smoothScrollTo]);

  // Fetch products for current page
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const offset = (page - 1) * pageSize;
      const res = await fetch(
        `/api/searchProducts?query=${encodeURIComponent(query)}&limit=${pageSize}&offset=${offset}`,
      );
      if (!res.ok) throw new Error('Failed to fetch products');

      const data: { products: Product[]; totalCount: number } = await res.json();
      setProducts(data.products);
      setTotalCount(data.totalCount);
    } catch (error) {
      console.error(error);
      setProducts([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, [query, page, pageSize]);

  useEffect(() => {
    fetchProducts().catch((error) => {
      console.error(error);
    });
  }, [fetchProducts]);

  // Render each product card
  const renderItemContent = useCallback(
    (index: number) => {
      const product = products[index];
      if (!product) return null;

      return (
        <div
          className="mx-auto flex w-full max-w-sm p-2 sm:mx-0 sm:w-auto"
          key={`search-product-${product.id}`}
        >
          <Card
            data-test-id={`product-id-${product.id}`}
            className="flex h-[390px] w-full flex-col !rounded-sm"
            renderImage={() => (
              <Link href={`/marketplace/product/${product.id}`}>
                <Image
                  width={500}
                  height={500}
                  src={product.imageUrl}
                  alt={`Product ${product.name}`}
                />
              </Link>
            )}
          >
            <div className="flex flex-1 flex-col gap-4">
              <Link
                href={`/marketplace/product/${product.id}`}
                className="hover:underline"
              >
                <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white h-14">
                  {product.name}
                </h2>
              </Link>

              <AddToCartForm product={product} />
            </div>
          </Card>
        </div>
      );
    },
    [products],
  );

  const totalPages = Math.ceil(totalCount / pageSize);

  // Simple pagination UI similar to Amazon style: Prev 1 2 3 ... N Next
  function getPageNumbers(current: number, total: number) {
    const pages = [];
    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      if (current <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', total);
      } else if (current > total - 4) {
        pages.push(1, '...', total - 4, total - 3, total - 2, total - 1, total);
      } else {
        pages.push(1, '...', current - 1, current, current + 1, '...', total);
      }
    }
    return pages;
  }

  const pageNumbers = getPageNumbers(page, totalPages);
  const shouldShowPagination = totalPages > 1 && totalCount > 0;

  const changePage = useCallback(
    (newPage: number) => {
      setPage(newPage);
      requestAnimationFrame(scrollToTop);
    },
    [scrollToTop],
  );

  return (
      <div ref={containerRef}>
        {loading && (
          <div className="mb-6 flex w-full items-center justify-center">
            <div className="flex items-center gap-3 rounded-full border border-brand-muted/30 bg-brand-surface px-4 py-2 text-sm text-brand-muted shadow-sm shadow-brand-primary/15 dark:border-dark-muted/40 dark:bg-dark-surface dark:text-dark-muted">
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
              Loading results…
            </div>
          </div>
        )}
        <VirtuosoGrid
          useWindowScroll
          totalCount={products.length}
          itemContent={renderItemContent}
          components={{ List: VirtuosoGridList }}
        />
        {/* Pagination */}
        {shouldShowPagination && (
          <nav
            className="mt-6 flex items-center justify-center gap-2 text-brand-muted dark:text-dark-muted"
            aria-label="Pagination"
          >
            <button
              className="rounded border border-brand-muted/30 px-3 py-1 transition-colors hover:border-brand-primary hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/60 disabled:opacity-50 disabled:hover:border-brand-muted/30 disabled:hover:text-brand-muted dark:border-dark-muted/30 dark:hover:border-brand-primary dark:hover:text-brand-primary dark:disabled:hover:border-dark-muted/30 dark:disabled:hover:text-dark-muted"
              disabled={page === 1 || loading}
              onClick={() => changePage(1)}
            >
              First
            </button>
            {pageNumbers.map((pageNumber) =>
              pageNumber === '...'
                ? (
                    <span key={`dots-${pageNumber}-${page}`} className="px-2">
                      ...
                    </span>
                  )
                : (
                    <button
                      key={`page-${page}-${pageNumber}`}
                      onClick={() => changePage(Number(pageNumber))}
                      className={`rounded border px-3 py-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/60 disabled:opacity-50 ${
                        pageNumber === page
                          ? 'border-brand-primary bg-brand-primary text-white'
                          : 'border-brand-muted/30 text-brand-muted hover:border-brand-primary hover:text-brand-primary dark:border-dark-muted/30 dark:text-dark-muted dark:hover:border-brand-primary dark:hover:text-brand-primary'
                      }`}
                      disabled={loading || pageNumber === page}
                    >
                      {pageNumber}
                    </button>
                  ),
            )}

            <button
              className="rounded border border-brand-muted/30 px-3 py-1 transition-colors hover:border-brand-primary hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/60 disabled:opacity-50 disabled:hover:border-brand-muted/30 disabled:hover:text-brand-muted dark:border-dark-muted/30 dark:hover:border-brand-primary dark:hover:text-brand-primary dark:disabled:hover:border-dark-muted/30 dark:disabled:hover:text-dark-muted"
              disabled={page === totalPages || loading}
              onClick={() => changePage(totalPages)}
            >
              Last
            </button>
          </nav>
        )}
      </div>
  );
}
