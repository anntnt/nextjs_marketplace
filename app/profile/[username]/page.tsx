import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getUser } from '../../../database/users';

export default async function UserProfilePage() {
  // 1. Check if the sessionToken cookie exists
  const cookieStore = await cookies();
  const sessionTokenCookie = cookieStore.get('sessionToken');

  if (!sessionTokenCookie) {
    redirect('/login');
  }

  // 2. Query the current user with the sessionToken
  const user = sessionTokenCookie && (await getUser(sessionTokenCookie.value));

  if (!user) {
    redirect('/login');
  }


  return (
    <main className="flex-grow w-full max-w-full bg-brand-bg px-5 py-12 text-brand-text transition-colors dark:bg-dark-bg dark:text-dark-text sm:px-10">
      <h1 className="text-4xl font-semibold text-center text-brand-text dark:text-dark-text">{user.username}'s Dashboard</h1>

      <section className="mb-4 py-8 md:py-12">
        <div className="mx-auto max-w-screen-xl px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-20">
          {user.roleId === 2 && (
            <div className="text-center text-lg">
              Manage and showcase{' '}
              <Link href={`/profile/${user.username}/business`}>
                <span className="py-8 font-bold text-brand-primary transition-colors hover:text-brand-secondary">
                  my products
                </span>
              </Link>{' '}
              on eStores.
            </div>
          )}
          {user.roleId === 3 && (
            <div className="text-center text-lg">
              Visit our{' '}
              <Link href="/#categories">
                <span className="py-8 font-bold text-brand-primary transition-colors hover:text-brand-secondary">
                  categories
                </span>
              </Link>{' '}
              and discover amazing products!
            </div>
          )}
          <hr className="my-4 border-brand-muted/20 dark:border-dark-muted/20" />
          <nav className="mb-4 flex text-brand-muted dark:text-dark-muted" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center">
                <Link
                  href="/"
                  className="inline-flex items-center text-sm font-medium transition-colors hover:text-brand-primary"
                >
                  <svg
                    className="me-2 h-4 w-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
                    />
                  </svg>
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="mx-1 h-4 w-4 text-brand-muted rtl:rotate-180 dark:text-dark-muted"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m9 5 7 7-7 7"
                    />
                  </svg>
                  <Link
                    href="/"
                    className="ms-1 text-sm font-medium transition-colors hover:text-brand-primary md:ms-2"
                  >
                    My account
                  </Link>
                </div>
              </li>
            </ol>
          </nav>
          <div className="mb-4 text-3xl font-semibold text-brand-text dark:text-dark-text sm:text-2xl md:mb-6">
            General overview
          </div>

          <div className="grid grid-cols-2 gap-6 border-b border-t border-brand-muted/20 py-4 dark:border-dark-muted/20 md:py-8 lg:grid-cols-4 xl:gap-16">
            <div>
              {user.roleId === 2 ? (
                <Link
                  href={`/profile/${user.username}/business`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-brand-primary bg-brand-surface px-5 py-2 text-md font-medium text-brand-text transition-colors hover:border-brand-secondary hover:bg-brand-secondary/10 hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/70 dark:border-brand-primary dark:bg-dark-surface dark:text-dark-text"
                >
                  <svg
                    className="me-1.5 h-6 w-6 text-brand-primary"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 12c.263 0 .524-.06.767-.175a2 2 0 0 0 .65-.491c.186-.21.333-.46.433-.734.1-.274.15-.568.15-.864a2.4 2.4 0 0 0 .586 1.591c.375.422.884.659 1.414.659.53 0 1.04-.237 1.414-.659A2.4 2.4 0 0 0 12 9.736a2.4 2.4 0 0 0 .586 1.591c.375.422.884.659 1.414.659.53 0 1.04-.237 1.414-.659A2.4 2.4 0 0 0 16 9.736c0 .295.052.588.152.861s.248.521.434.73a2 2 0 0 0 .649.488 1.809 1.809 0 0 0 1.53 0 2.03 2.03 0 0 0 .65-.488c.185-.209.332-.457.433-.73.1-.273.152-.566.152-.861 0-.974-1.108-3.85-1.618-5.121A.983.983 0 0 0 17.466 4H6.456a.986.986 0 0 0-.93.645C5.045 5.962 4 8.905 4 9.736c.023.59.241 1.148.611 1.567.37.418.865.667 1.389.697Zm0 0c.328 0 .651-.091.94-.266A2.1 2.1 0 0 0 7.66 11h.681a2.1 2.1 0 0 0 .718.734c.29.175.613.266.942.266.328 0 .651-.091.94-.266.29-.174.537-.427.719-.734h.681a2.1 2.1 0 0 0 .719.734c.289.175.612.266.94.266.329 0 .652-.091.942-.266.29-.174.536-.427.718-.734h.681c.183.307.43.56.719.734.29.174.613.266.941.266a1.819 1.819 0 0 0 1.06-.351M6 12a1.766 1.766 0 0 1-1.163-.476M5 12v7a1 1 0 0 0 1 1h2v-5h3v5h7a1 1 0 0 0 1-1v-7m-5 3v2h2v-2h-2Z"
                    />
                  </svg>
                  My Products
                </Link>
              ) : user.roleId === 3 ? (
                <>
                  {' '}
                  <Link
                    href={`/profile/${user.username}/orders`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-brand-primary bg-brand-surface px-5 py-2 text-md font-medium text-brand-text transition-colors hover:border-brand-secondary hover:bg-brand-secondary/10 hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/70 dark:border-brand-primary dark:bg-dark-surface dark:text-dark-text"
                  >
                    <svg
                      className="me-1.5 h-6 w-6 text-brand-primary"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 9h6m-6 3h6m-6 3h6M6.996 9h.01m-.01 3h.01m-.01 3h.01M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
                      />
                    </svg>
                    My Orders
                  </Link>
                </>
              ) : (
                <div />
              )}
            </div>
            <div>
              <Link
                href={`/profile/${user.username}/messages-inbox`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-brand-primary bg-brand-surface px-5 py-2 text-md font-medium text-brand-text transition-colors hover:border-brand-secondary hover:bg-brand-secondary/10 hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/70 dark:border-brand-primary dark:bg-dark-surface dark:text-dark-text"
              >
                <svg
                  className="me-1.5 h-6 w-6 text-brand-primary"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 13h3.439a.991.991 0 0 1 .908.6 3.978 3.978 0 0 0 7.306 0 .99.99 0 0 1 .908-.6H20M4 13v6a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6M4 13l2-9h12l2 9"
                  />
                </svg>
                Messages Inbox
              </Link>
            </div>
            <div>
              <Link
                href="/support"
                className="inline-flex items-center gap-1.5 rounded-lg border border-brand-primary bg-brand-surface px-5 py-2 text-md font-medium text-brand-text transition-colors hover:border-brand-secondary hover:bg-brand-secondary/10 hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/70 dark:border-brand-primary dark:bg-dark-surface dark:text-dark-text"
              >
                <svg
                  className="me-1.5 h-6 w-6 text-brand-primary"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 17h6l3 3v-3h2V9h-2M4 4h11v8H9l-3 3v-3H4V4Z"
                  />
                </svg>
                Get Support
              </Link>
            </div>
          </div>
          <div className="py-4 md:py-8">
            <div className="mb-4 grid gap-4 sm:grid-cols-2 sm:gap-8 md:gap-10 lg:gap-16">
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <h2 className="flex items-center text-xl font-bold leading-none text-gray-900 dark:text-white sm:text-2xl">
                    {user.firstname} {user.lastname}
                  </h2>
                </div>
                <dl className="">
                  <dt className="font-semibold text-gray-900 dark:text-white">
                    {user.emailAddress}
                  </dt>
                </dl>
              </div>
              <div className="space-y-4">
                <dl>
                  <dt className="font-semibold text-gray-900 dark:text-white">
                    Birth date
                  </dt>
                  <dd className="text-gray-900 dark:text-gray-400">
                    {user.birthday.toLocaleDateString()}
                  </dd>
                </dl>

                <dl>
                  <dt className="mb-1 font-semibold text-gray-900 dark:text-white">
                    Address
                  </dt>
                  <dd className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
                    <div>
                      <div>
                        <p className="mb-0.5  text-gray-900 dark:text-white">
                          {user.address}
                        </p>
                      </div>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
            <Link
              href="/edit-your-data"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-brand-primary bg-brand-primary px-5 py-2.5 text-md font-medium text-white transition-colors hover:bg-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/70"
            >
              <svg
                className="-ms-0.5 me-1.5 h-6 w-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                />
              </svg>
              Edit your data
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
