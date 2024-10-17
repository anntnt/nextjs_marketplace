import Image from 'next/image';
// import { usePathname } from 'next/navigation';
import ButtonLink from './components/buttonLink';
// import Link from 'next/link';
import styles from './page.module.scss';

export default function Home() {
  // const productsLink = usePathname();

  return (
    <div className={`${styles.homePage} `}>
      <h1>Welcome to Tropical Snacks!</h1>
      <p>
        Craving a taste of the tropics? Dive into our irresistible selection of
        tropical snacks! From crispy plantain chips to sweet dried fruits and
        unique island treats, we’ve got the perfect bites to satisfy your
        cravings. Stop by and snack your way to paradise!
      </p>
      <br />
      <ButtonLink link="/products">View our products</ButtonLink>

      <Image
        src="/images/pineapple-supply.jpg"
        width={771}
        height={513}
        alt="Pineapple supply"
      />
    </div>
  );
}
