import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function ErrorMessage(props: Props) {
  if (!props.children) {
    return null;
  }
  return (
    <div className="rounded-md border border-red-500 bg-red-50 px-3 py-2 text-sm text-red-700">
      {props.children}
    </div>
  );
}
