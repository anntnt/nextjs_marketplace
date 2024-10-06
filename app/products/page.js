import Image from 'next/image';
import Link from 'next/link';
import { getProducts } from '../../database/products';
import styles from '../page.module.scss';

export const metadata = {
  title: 'Products',
  description: 'Tropical Snack Products',
};
export default function ProductsPage() {
  const products = getProducts();
  return (
    <div>
      <h1> Yummy snack food from the tropics</h1>
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
