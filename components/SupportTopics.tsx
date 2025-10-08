'use client';

export default function Component() {
  const topics = [
    {
      title: 'My account',
      description: ['Change your email address', 'Change your password'],
    },
    {
      title: 'Orders & Shipping',
      description: [
        'Track your orders',
        'Change delivery address',
        'Explore shipping options',
      ],
    },
    {
      title: 'Payments & Billing',
      description: ['Accepted payment methods', 'Invoice and billing details'],
    },
    {
      title: 'Returns & Refunds',
      description: [
        'Check return eligibility',
        'Request a return or exchange',
        'Refund processing time',
      ],
    },
    {
      title: 'Discounts & Promotions',
      description: ['Apply discount codes', 'Find current sales & offers'],
    },
    {
      title: 'More',
      description: ['Find the right size or fit', 'Enable cookies?'],
    },
  ];

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h2 className="mb-8 text-center text-2xl text-brand-text dark:text-dark-text">
        Quickly find answers by topic
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {topics.map((topic) => (
          <div
            key={`topic-${topic.title}`}
            className="rounded-lg border border-brand-muted/20 bg-brand-surface p-4 shadow-sm transition hover:shadow-md hover:shadow-brand-primary/20 dark:border-dark-muted/20 dark:bg-dark-surface"
          >
            <h3 className="text-lg font-semibold text-brand-text dark:text-dark-text">
              {topic.title}
            </h3>
            <ul className="mt-2 space-y-1 text-sm text-brand-muted dark:text-dark-muted">
              {topic.description.map((point) => (
                <li
                  key={`description-${point}`}
                  className="flex items-center gap-2 pl-0"
                >
                  <svg
                    className="h-5 w-5 text-brand-primary"
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
                      d="M9.529 9.988a2.502 2.502 0 1 1 5 .191A2.441 2.441 0 0 1 12 12.582V14m-.01 3.008H12M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
