'use client';
import { Route } from 'next';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  link: string;
};
export default function ButtonLink(props: Props) {
  const router = useRouter();

  return (
    <button onClick={() => router.push(props.link as Route)}>
      {props.children}
    </button>
  );
}
