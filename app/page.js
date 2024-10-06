import Image from 'next/image';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={`${styles.homePage} `}>
      <h1>Welcome to Tropical Snacks!</h1>
      <p>
        Craving a taste of the tropics? Dive into our irresistible selection of
        tropical snacks! From crispy plantain chips to sweet dried fruits and
        unique island treats, we’ve got the perfect bites to satisfy your
        cravings. Stop by and snack your way to paradise!
      </p>
    </div>
  );
}
