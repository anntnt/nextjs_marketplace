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
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl mb-8 text-center">
        Quickly find answers by topic
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2   gap-6">
        {topics.map((topic) => (
          <div
            key={`topic-${topic.title}`}
            className="p-4 xl:pl-6 border rounded-lg shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold">{topic.title}</h3>
            <ul className="text-sm text-gray-600 mt-2 space-y-1">
              {topic.description.map((point) => (
                <li
                  key={`description-${point}`}
                  className="flex items-center gap-2 pl-0"
                >
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
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
