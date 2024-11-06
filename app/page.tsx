// import Image from 'next/image';
// import { usePathname } from 'next/navigation';
// import ButtonLink from './components/buttonLink';

// import Link from 'next/link';
// import styles from './page.module.scss';

export default function Home() {
  // const productsLink = usePathname();

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <h1 className="mb-4 text-4xl text-center">
        Welcome to Vilya – Your Marketplace for Everything!
      </h1>
      <br />
      <p>
        <i>
          Note: This website is a project created solely for study and
          educational purposes. It is not an actual marketplace.
        </i>
      </p>
      <br />
      <p>
        Discover Vilya, the ultimate destination for buying, selling, and
        connecting with others in one vibrant marketplace. Whether you’re
        searching for unique finds, everyday essentials, or want to turn your
        own items into cash, Vilya is here to make it easy, secure, and fun.
        Explore an extensive range of categories, from fashion and electronics
        to home goods and handcrafted treasures. Our platform is designed for
        simplicity, so you can list, browse, and buy in just a few clicks. Plus,
        with trusted sellers and a dedicated customer support team, you’re in
        good hands every step of the way. Join the Vilya community today and
        experience a better way to buy and sell online!
      </p>
    </div>
  );
}
