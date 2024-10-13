'use client';
import { useRouter } from 'next/navigation';

export default function ButtonLink(props) {
  const router = useRouter();

  return (
    <button onClick={() => router.push(props.link)}>{props.children}</button>
  );
}
