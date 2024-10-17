import Image from 'next/image';
import Link from 'next/link';
import { getProductsInsecure } from '../../database/products';
import styles from '../page.module.scss';

export const metadata = {
  title: 'Products',
  description: 'Tropical Snack Products',
};
export default async function ProductsPage() {
  // const products = getProducts();
  const products = await getProductsInsecure();
  return (
    <div>
      <h1> Yummy snacks from the tropics</h1>
      <div className={styles.content}>
        {products.map((product) => {
          return (
            <div key={`product-${product.id}`}>
              <Link
                href={`/products/${product.id}`}
                data-test-id={`product-${product.id}`}
              >
                <Image
                  src={`/images/${product.image}`}
                  alt={product.name}
                  width={300}
                  height={300}
                />
                <h3>{product.name}</h3>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
