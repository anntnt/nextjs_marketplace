'use client';

import { Card } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { VirtuosoGrid } from 'react-virtuoso';
// Update the import path below if the Product type is located elsewhere
import type { Product } from '../../../database/products';
import AddToCartForm from './addToCartForm';

type Props = {
  products: Product[];
  userRoleId?: number;
};

// List component for grid layout
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

// Render each item
const renderItemContent =
  (products: Product[], userRoleId?: number) => (index: number) => {
    const product = products[index];
    if (!product) return null;

    return (
      <div className="p-2">
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
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {product.name}
            </h5>
          </Link>

          <AddToCartForm product={product} roleId={userRoleId} />
        </Card>
      </div>
    );
  };

export default function VirtuosoProductGrid({ products, userRoleId }: Props) {
  return (
    <VirtuosoGrid
      useWindowScroll
      totalCount={products.length}
      itemContent={renderItemContent(products, userRoleId)}
      components={{
        List: VirtuosoGridList,
      }}
    />
  );
}
