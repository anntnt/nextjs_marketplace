import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="bg-gray-50 dark:bg-gray-900 flex-grow  w-full max-w-full px-5 sm:px-20 py-6 sm:py-10 md:py-12">
      <section className=" dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl  lg:py-16 lg:px-12">
          <h1 className="text-center mb-4 text-4xl font-semibold tracking-tight leading-none text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
            Welcome to eStores!
          </h1>

          <div
            className="py-8
           flex justify-center mb-4  font-semibold tracking-tight leading-none text-gray-900 dark:text-white"
          >
            <figure className="max-w-2xl">
              <Link href="/marketplace">
                <Image
                  className="h-auto max-w-full rounded-lg"
                  src="/images/ecommerce.jpg"
                  alt="e-commerce"
                  width={1279}
                  height={682}
                />
              </Link>
            </figure>
          </div>
          <div className="py-6   text-2xl text-center font-normal   sm:px-16 xl:px-48 dark:text-gray-400">
            <Link href="/marketplace">
              <span className="py-8 text-blue-1000 hover:text-blue-1000">
                Start shopping now and find your next favorite item!
              </span>
            </Link>{' '}
          </div>

          <div className="py-8  text-xl font-normal text-red-600  sm:px-16 xl:px-48 dark:text-gray-400">
            <i>
              Note: This website is a project created solely for study and
              educational purposes. It is not an actual marketplace.
            </i>
          </div>
        </div>
      </section>
    </main>
  );
}
