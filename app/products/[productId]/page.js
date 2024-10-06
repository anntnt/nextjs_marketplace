import Image from 'next/image';
import { notFound } from 'next/navigation';
// import { useRouter } from 'next/navigation';
import React from 'react';
import { getProduct } from '../../../database/products';
import styles from '../../page.module.scss';
import ProductForm from './productForm.js';

export async function generateMetadata(props) {
  const singleProduct = getProduct(Number((await props.params).productId));
  if (!singleProduct) {
    return notFound();
  }
  return {
    title: singleProduct.name,
    description: singleProduct.name,
  };
}

export default async function SingleProductPage(props) {
  // const router = useRouter();
  const singleProduct = getProduct(Number((await props.params).productId));
  if (!singleProduct) {
    return notFound();
  }
  return (
    <div>
      <h1>{singleProduct.name}</h1>
      <div className={styles.singleProductContent}>
        <Image
          src={`/images/${singleProduct.image}`}
          width={500}
          height={500}
          alt={singleProduct.name}
          data-test-id="product-image"
        />
        <h2>
          <span data-test-id="product-price">{singleProduct.price}</span> €
        </h2>
        <ProductForm productId={singleProduct.id} />
      </div>
    </div>
  );
}
