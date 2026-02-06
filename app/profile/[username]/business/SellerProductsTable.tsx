'use client';

import { Tooltip } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import { forwardRef, useCallback } from 'react';
import { Virtuoso } from 'react-virtuoso';
import type { Product } from '../../../../database/products';
import { formatEuroFromCents } from '../../../../util/price';
import ButtonRemoveProduct from './ButtonRemoveProduct';

type Props = {
  products: Product[];
  username: string;
};

type RowProps = {
  product: Product;
  username: string;
};

function SellerProductCard({ product, username }: RowProps) {
  return (
    <article
      className="flex flex-col gap-4 rounded-xl border border-brand-border bg-brand-surface p-4 shadow-sm transition-colors dark:border-gray-800 dark:bg-dark-surface"
      data-test-id={`seller-product-id-${product.id}`}
    >
      <Link
        href={`/marketplace/product/${product.id}`}
        className="flex items-start gap-5 sm:items-center"
      >
        <div className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-xl bg-white dark:bg-dark-bg">
          <Image
            className="h-full w-full object-cover dark:hidden"
            alt={`Product ${product.name}`}
            src={product.imageUrl}
            width={128}
            height={128}
          />

          <Image
            className="hidden h-full w-full object-cover dark:block"
            alt={`Product ${product.name}`}
            src={product.imageUrl}
            width={128}
            height={128}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-lg font-semibold text-brand-text transition-colors hover:underline dark:text-dark-text">
            {product.name}
          </span>
          <span className="text-base font-semibold text-gray-900 dark:text-white">
            {formatEuroFromCents(product.price)}
          </span>
        </div>
      </Link>
      <div className="flex items-center justify-center gap-3">
        <Tooltip content="Edit product">
          <Link
            prefetch
            href={{
              pathname: `/profile/${username}/business/edit-product`,
              query: { productId: String(product.id) },
            }}
            aria-label="Edit product"
            className="text-gray-800 transition-colors hover:text-brand-primary dark:text-white"
          >
            <svg
              className="h-[35px] w-[35px]"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </Tooltip>
        <Tooltip content="Remove product">
          <ButtonRemoveProduct id={product.id} />
        </Tooltip>
      </div>
    </article>
  );
}

const VirtuosoList = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      className={`flex flex-col gap-4 ${className ?? ''}`.trim()}
    />
  ),
);
VirtuosoList.displayName = 'SellerProductsList';

const listComponents = {
  List: VirtuosoList,
};

export default function SellerProductsTable({ products, username }: Props) {
  const renderProductCard = useCallback(
    (index: number, product: Product) => (
      <SellerProductCard product={product} username={username} />
    ),
    [username],
  );

  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-brand-border p-8 text-center text-brand-muted dark:border-gray-800 dark:text-dark-muted">
        No products yet. Add your first product to start selling.
      </div>
    );
  }

  return (
    <div className="relative">
      <Virtuoso
        data={products}
        useWindowScroll
        components={listComponents}
        itemContent={renderProductCard}
      />
    </div>
  );
}
