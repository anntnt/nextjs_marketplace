'use client';

import { createContext, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
};
export const ThemeContext = createContext('');

export default function ThemeProvider({ children }: Props) {
  return <ThemeContext.Provider value="dark">{children}</ThemeContext.Provider>;
}
