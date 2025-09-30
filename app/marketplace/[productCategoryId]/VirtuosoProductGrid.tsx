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
    className={`grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${
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

  const effectivePageSize = pageSize ?? 21; // Default page size if not provided

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const offset = (currentPage - 1) * effectivePageSize;
      const res = await fetch(
        `/api/products?categoryId=${categoryId}&limit=${effectivePageSize}&offset=${offset}`,
      );
      if (!res.ok) throw new Error('Failed to fetch products');
      const newProducts: Product[] = await res.json();

      setProducts(newProducts);
      setTotalPages(Math.ceil(100 / effectivePageSize)); // Assume 100 for now or return total count from backend
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
            <AddToCartForm product={product} roleId={userRoleId} />
          </Card>
        </div>
      );
    },
    [products, userRoleId],
  );

  const renderPagination = () => {
    const pageLinks = [];
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pageLinks.push(
        <button
          key={i}
          className={`px-3 py-1 border rounded-md mx-1 ${
            i === currentPage ? 'bg-blue-600 text-white' : 'bg-white text-black'
          }`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>,
      );
    }

    return (
      <div className="flex justify-center items-center gap-2 py-6">
        <button
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded-md"
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        {start > 1 && <span>...</span>}
        {pageLinks}
        {end < totalPages && <span>...</span>}
        <button
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded-md"
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
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
      />
      {renderPagination()}
    </>
  );
}
