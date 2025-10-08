'use client';

import { Card } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { VirtuosoGrid } from 'react-virtuoso';
import type { Product } from '../../../database/products';
import AddToCartForm from './addToCartForm';

const VirtuosoGridList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ style, className, children, ...rest }, ref) => (
  <div
    ref={ref}
    style={style}
    className={`grid gap-y-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 ${
      className ?? ''
    }`}
    {...rest}
  >
    {children}
  </div>
));
VirtuosoGridList.displayName = 'VirtuosoGridList';

export default function VirtuosoProductGrid({
  categoryId,
  userRoleId,
  pageSize,
}: {
  categoryId: number;
  userRoleId?: number;
  pageSize?: number;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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

    const target = document.getElementById('category-products');
    const top = target?.getBoundingClientRect().top ?? 0;
    const scrollTarget = window.scrollY + top - 120;

    smoothScrollTo(Math.max(0, scrollTarget));
  }, [smoothScrollTo]);

  const changePage = useCallback(
    (newPage: number) => {
      setCurrentPage(newPage);
      requestAnimationFrame(scrollToTop);
    },
    [scrollToTop],
  );

  const effectivePageSize = pageSize ?? 30; // Default page size if not provided

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const offset = (currentPage - 1) * effectivePageSize;
      const res = await fetch(
        `/api/products?categoryId=${categoryId}&limit=${effectivePageSize}&offset=${offset}`,
      );
      if (!res.ok) throw new Error('Failed to fetch products');
      const data: { products: Product[]; totalCount: number } = await res.json();

      setProducts(data.products);
      setTotalPages(Math.max(1, Math.ceil(data.totalCount / effectivePageSize)));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [categoryId, effectivePageSize, currentPage]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const renderItemContent = useCallback(
    (index: number) => {
      const product = products[index];
      if (!product) return null;

      return (
        <div
          className="p-2"
          key={product.id}
        >
          <Card
            data-test-id={`product-id-${product.id}`}
            className="flex h-full w-full flex-col !rounded-sm"
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
                className="text-brand-text transition-colors hover:text-brand-primary dark:text-dark-text"
              >
                <h2 className="h-14 text-xl font-semibold tracking-tight">
                  {product.name}
                </h2>
              </Link>
              <AddToCartForm product={product} roleId={userRoleId} />
            </div>
          </Card>
        </div>
      );
    },
    [products, userRoleId],
  );

  const renderPagination = () => {
    if (products.length === 0 || totalPages <= 1) {
      return null;
    }

    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, currentPage + 1);
    const buttons = [];

    for (let i = start; i <= end; i++) {
      buttons.push(
        <button
          key={`product-page-${i}`}
          className={`mx-1 rounded-md border px-3 py-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/60 ${
            i === currentPage
              ? 'border-brand-primary bg-brand-primary text-white'
              : 'border-brand-muted/30 bg-brand-surface text-brand-text hover:border-brand-primary hover:text-brand-primary dark:border-dark-muted/30 dark:bg-dark-surface dark:text-dark-text dark:hover:border-brand-primary dark:hover:text-brand-primary'
          }`}
          onClick={() => changePage(i)}
        >
          {i}
        </button>,
      );
    }

    return (
      <div className="flex items-center justify-center gap-2 py-6 text-brand-muted dark:text-dark-muted">
        <button
          disabled={currentPage === 1}
          className="rounded-md border border-brand-muted/30 px-3 py-1 transition-colors hover:border-brand-primary hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/60 disabled:cursor-not-allowed disabled:border-brand-muted/20 disabled:text-brand-muted dark:border-dark-muted/30 dark:hover:border-brand-primary dark:hover:text-brand-primary dark:disabled:border-dark-muted/20 dark:disabled:text-dark-muted"
          onClick={() => changePage(1)}
        >
          First
        </button>
        {start > 1 && <span>…</span>}
        {buttons}
        {end < totalPages && <span>…</span>}
        <button
          disabled={currentPage === totalPages}
          className="rounded-md border border-brand-muted/30 px-3 py-1 transition-colors hover:border-brand-primary hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/60 disabled:cursor-not-allowed disabled:border-brand-muted/20 disabled:text-brand-muted dark:border-dark-muted/30 dark:hover:border-brand-primary dark:hover:text-brand-primary dark:disabled:border-dark-muted/20 dark:disabled:text-dark-muted"
          onClick={() => changePage(totalPages)}
        >
          Last
        </button>
      </div>
    );
  };

  return (
    <>
      <VirtuosoGrid
        useWindowScroll
        totalCount={products.length}
        itemContent={(index) => renderItemContent(index)}
        components={{
          List: VirtuosoGridList,
        }}
        style={{ height: "390px" }}
        // Hier Höhe definieren:
      />
      {renderPagination()}
    </>
  );
}
