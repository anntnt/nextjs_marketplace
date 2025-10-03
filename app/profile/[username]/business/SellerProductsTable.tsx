'use client';

import type { Product } from '../../../../database/products';
import { TableVirtuoso } from 'react-virtuoso';
import Image from 'next/image';
import Link from 'next/link';
import { Tooltip } from 'flowbite-react';
import { useCallback } from 'react';
import ButtonRemoveProduct from './ButtonRemoveProduct';
import { formatEuroFromCents } from '../../../../util/price';

type Props = {
  products: Product[];
  username: string;
};

type RowProps = {
  product: Product;
  username: string;
};

function SellerProductRow({ product, username }: RowProps) {
  return (
    <>
      <td
        className="whitespace-nowrap py-2 md:w-[384px]"
        data-test-id={`seller-product-id-${product.id}`}
      >
        <Link href={`/marketplace/product/${product.id}`} className="hover:underline">
          <div className="flex items-center gap-4">
            <div className="flex items-center aspect-square w-75 h-32 shrink-0">
              <Image
                className="h-auto w-4/5 sm:w-full max-h-full dark:hidden"
                alt={`Product ${product.name}`}
                src={product.imageUrl}
                width={120}
                height={120}
              />

              <Image
                className="hidden h-auto w-full max-h-full dark:block"
                alt={`Product ${product.name}`}
                src={product.imageUrl}
                width={120}
                height={120}
              />
            </div>
            {product.name}
          </div>
        </Link>
      </td>

      <td className="p-2 text-base font-normal text-gray-900 dark:text-white">
        {formatEuroFromCents(product.price)}
      </td>
      <td className="p-2 text-base font-normal text-gray-900 dark:text-white">
        <Link
          prefetch
          href={{
            pathname: `/profile/${username}/business/edit-product`,
            query: { productId: String(product.id) },
          }}
        >
          <Tooltip content="Edit product">
            <svg
              className="w-[35px] h-[35px] text-gray-800 dark:text-white"
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
          </Tooltip>
        </Link>
      </td>

      <td className="p-2 text-right text-base font-bold text-gray-900 dark:text-white">
        <Tooltip content="Remove product">
          <ButtonRemoveProduct id={product.id} />
        </Tooltip>
      </td>
    </>
  );
}
const tableComponents = {
  Table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <table
      {...props}
      className={`w-full text-left font-medium text-gray-900 dark:text-white md:table-fixed ${props.className ?? ''}`.trim()}
    />
  ),
  TableRow: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      {...props}
      className={`divide-y divide-gray-200 dark:divide-gray-800 ${props.className ?? ''}`.trim()}
    />
  ),
  TableBody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody
      {...props}
      className={`divide-y divide-gray-200 dark:divide-gray-800 ${props.className ?? ''}`.trim()}
    />
  ),
};

export default function SellerProductsTable({ products, username }: Props) {
  const renderProductRow = useCallback(
    (rowIndex: number, product: Product) => (
      <SellerProductRow
        key={`seller-product-${rowIndex}-${product.id}`}
        product={product}
        username={username}
      />
    ),
    [username],
  );

  return (
    <div className="relative overflow-x-auto border-b border-gray-200 dark:border-gray-800">
      <TableVirtuoso
        data={products}
        useWindowScroll
        components={tableComponents}
        itemContent={renderProductRow}
      />
    </div>
  );
}
