import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="bg-gray-50 dark:bg-gray-900 flex-grow  w-full max-w-full px-5 sm:px-20 py-6 sm:py-10 md:py-12">
      <section className=" dark:bg-gray-900">
        <div className="py-7 mt-8 px-4 mx-auto max-w-screen-xl  lg:py-10 lg:px-12">
          <h1 className="text-center mb-4 text-4xl font-semibold tracking-tight leading-none text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
            Welcome to eStores!
          </h1>

          <div className="py-4   text-xl text-center font-normal   sm:px-16 xl:px-48 dark:text-gray-400">
            <Link href="/marketplace">
              <span className="py-8 hover:text-blue-1000">
                Start shopping now and find your next favorite item!
              </span>
            </Link>{' '}
          </div>
          <div
            className="py-8
           flex justify-center mb-4  font-semibold tracking-tight leading-none text-gray-900 dark:text-white"
          >
            <figure className="max-w-2xl rounded-lg   bg-white p-4  dark:border-gray-700 dark:bg-gray-800 shadow-xl dark:shadow-gray-800 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800  shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 ">
              <Link href="/marketplace">
                <Image
                  className="h-auto max-w-full rounded-lg cursor-pointer "
                  src="/images/ecommerce.jpg"
                  alt="e-commerce"
                  width={1023}
                  height={682}
                />
              </Link>
            </figure>
          </div>

          <div className="py-8  text-xl font-normal text-red-600  sm:px-16 xl:px-48 dark:text-gray-400">
            <i>
              Note: This website is a project created solely for study purposes
              and is not a real marketplace.
            </i>
          </div>
        </div>
      </section>
    </main>
  );
}
