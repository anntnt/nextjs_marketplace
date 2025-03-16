export const metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service',
};
export default function Page() {
  return (
    <main className="bg-gray-50 dark:bg-gray-900 flex-grow  w-full max-w-full px-5 sm:px-20 py-12">
      <h1 className="mb-4 text-4xl text-center">Terms of Service</h1>

      <section className="py-8 antialiased  md:py-16     text-xl  font-normal   sm:px-16 xl:px-48 dark:text-gray-400">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <p className="py-8   text-red-600   ">
            <i>
              Note: This website is a project created solely for study purposes
              and is not a real marketplace.
            </i>
          </p>
          <p>
            By using <b>eStores</b>, you agree to these terms:
          </p>
          <ul>
            <li>
              <b>Use of the Platform:</b> This marketplace is for learning
              purposes.
            </li>
            <li>
              <b>Prohibited Activities:</b> Do not post harmful content,
              impersonate others, or disrupt the platform.
            </li>
            <li>
              <b>Limitation of Liability:</b> We are not liable for any damages.
            </li>
            <li>
              <b>Third-Party Links:</b> We may link to external sites but are
              not responsible for them.
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
