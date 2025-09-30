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
    className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${
      className ?? ''
    }`}
    {...rest}
  >
    {children}
  </div>
));

CategoriesGridList.displayName = 'CategoriesGridList';

const PAGE_SIZE = 12;

export default function CategoriesVirtuoso() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

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
          className="max-w-sm"
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
            className="hover:underline"
          >
            <h2 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
              {category.categoryName}
            </h2>
          </Link>
        </Card>
      </div>
    );
  };

  const renderPagination = () => {
    if (total === 0) {
      return null;
    }

    const start = Math.max(1, page - 1);
    const end = Math.min(totalPages, page + 1);
    const buttons = [];

    for (let i = start; i <= end; i++) {
      buttons.push(
        <button
          key={`category-page-${i}`}
          className={`px-3 py-1 border rounded-md mx-1 ${
            i === page ? 'bg-blue-600 text-white' : 'bg-white text-black'
          }`}
          onClick={() => setPage(i)}
          disabled={loading}
        >
          {i}
        </button>,
      );
    }

    return (
      <div className="mt-8 flex items-center justify-center gap-2">
        <button
          className="px-3 py-1 border rounded-md"
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          disabled={page === 1 || loading}
        >
          Previous
        </button>
        {start > 1 && <span>…</span>}
        {buttons}
        {end < totalPages && <span>…</span>}
        <button
          className="px-3 py-1 border rounded-md"
          onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
          disabled={page === totalPages || loading}
        >
          Next
        </button>
      </div>
    );
  };

  if (!loading && categories.length === 0) {
    return (
      <div className="text-center text-gray-600 dark:text-gray-300">
        No categories available right now.
      </div>
    );
  }

  return (
    <div className="relative">
      {loading && (
        <div className="mb-4 text-center text-sm text-gray-500 dark:text-gray-400">
          Loading categories…
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
