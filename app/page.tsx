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
          <div className="py-8  text-2xl font-semibold text-red-600  sm:px-16 xl:px-48 dark:text-gray-400">
            We’re fixing an issue with images on the site. Please check back
            soon.
            <br />
            Thank you for your patience!
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
