// import Image from 'next/image';
// import { usePathname } from 'next/navigation';
// import ButtonLink from './components/buttonLink';

// import Link from 'next/link';
// import styles from './page.module.scss';

export default function Home() {
  // const productsLink = usePathname();

  return (
    <main className="bg-gray-50 dark:bg-gray-900 flex-grow  w-full max-w-full px-5 sm:px-20 py-12">
      <div className="max-w-screen-xl mx-auto p-4">
        <h1 className="mb-4 text-4xl text-center">
          Welcome to eStores – Your Marketplace for Everything!
        </h1>
        <br />
        <p className="text-red-600">
          <i>
            Note: This website is a project created solely for study and
            educational purposes. It is not an actual marketplace.
          </i>
        </p>
        <br />
        <p>
          At vero eos et accusamus et iusto odio dignissimos ducimus qui
          blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
          et quas molestias excepturi sint occaecati cupiditate non provident,
          similique sunt in culpa qui officia deserunt mollitia animi, id est
          laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
          distinctio. Nam libero tempore, cum soluta nobis est eligendi optio
          cumque nihil impedit quo minus id quod maxime placeat facere possimus,
          omnis voluptas assumenda est, omnis dolor repellendus. Temporibus
          autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe
          eveniet ut et voluptates repudiandae sint et molestiae non recusandae.
          Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis
          voluptatibus maiores alias consequatur aut perferendis doloribus
          asperiores repellat.
        </p>
      </div>
    </main>
  );
}
