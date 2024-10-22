import Image from 'next/image';
import { notFound } from 'next/navigation';
// import { useRouter } from 'next/navigation';
import React from 'react';
import { getProductInsecure } from '../../../database/products';
import styles from '../../page.module.scss';
import ProductForm from './productForm';

type Props = {
  params: Promise<{
    productId: string;
  }>;
};

/* export async function generateMetadata(props: Props) {
  const singleProduct = getProductInsecure(
    Number((await props.params).productId),
  );
  return {
    // Optional chaining because we cannot call notFound() in generateMetadata
    title: singleProduct.name,
    description: singleProduct.description,
  };
}*/

export default async function SingleProductPage(props: Props) {
  const singleProduct = await getProductInsecure(
    Number((await props.params).productId),
  );
  if (!singleProduct) {
    return notFound();
  }

  return (
    <div>
      <h1>{singleProduct.name}</h1>
      <div className={styles.singleProductContent}>
        <Image
          src={`/images/${singleProduct.image}`}
          width={300}
          height={300}
          alt={singleProduct.name}
          data-test-id="product-image"
        />
        <h2>
          € <span data-test-id="product-price">{singleProduct.price}</span>
        </h2>
        <ProductForm productId={singleProduct.id} />
      </div>
    </div>
  );
}
