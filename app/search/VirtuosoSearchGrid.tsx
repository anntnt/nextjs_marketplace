'use client';

import { Card } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { VirtuosoGrid } from 'react-virtuoso';
import type { Product } from '../../database/products';
import AddToCartForm from './addToCartForm';

type Props = {
  query: string;
  userRoleId?: number;
  pageSize?: number;
};

const VirtuosoGridList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ style, className, children, ...rest }, ref) => (
  <div
    ref={ref}
    style={style}
    className={`grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${
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
  userRoleId,
  pageSize = 21, // Default page size
}: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Fetch products for current page
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const offset = (page - 1) * pageSize;
      const res = await fetch(
        `/api/searchProducts?query=${encodeURIComponent(query)}&limit=${pageSize}&offset=${offset}`,
      );
      if (!res.ok) throw new Error('Failed to fetch products');

      const data = await res.json();
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
    fetchProducts();
  }, [fetchProducts]);

  // Render each product card
  const renderItemContent = useCallback(
    (index: number) => {
      const product = products[index];
      if (!product) return null;

      return (
        <div className="p-2" key={product.id}>
          <Card
            data-test-id={`product-id-${product.id}`}
            className="max-w-sm"
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
            <Link
              href={`/marketplace/product/${product.id}`}
              className="hover:underline"
            >
              <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {product.name}
              </h2>
            </Link>

            <AddToCartForm product={product} />
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

  return (
    <>
      <VirtuosoGrid
        useWindowScroll
        totalCount={products.length}
        itemContent={renderItemContent}
        components={{ List: VirtuosoGridList }}
      />
      {/* Pagination */}
      <nav
        className="flex justify-center items-center gap-2 mt-6 text-gray-700 dark:text-gray-300"
        aria-label="Pagination"
      >
        <button
          className="px-3 py-1 rounded border border-gray-300 dark:border-gray-700 disabled:opacity-50"
          disabled={page === 1 || loading}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Previous
        </button>

        {pageNumbers.map((p, i) =>
          p === '...' ? (
            <span
              key={`dots-${p}-${pageNumbers.slice(0, i).filter((x) => x === '...').length}`}
              className="px-2"
            >
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => setPage(Number(p))}
              className={`px-3 py-1 rounded border ${
                p === page
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              disabled={loading}
            >
              {p}
            </button>
          ),
        )}

        <button
          className="px-3 py-1 rounded border border-gray-300 dark:border-gray-700 disabled:opacity-50"
          disabled={page === totalPages || loading}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        >
          Next
        </button>
      </nav>
    </>
  );
}
