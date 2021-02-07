import React from 'react';
import { TokenStateProvider } from './useToken';

export default function AppContextProvider({ children }) {
  return <TokenStateProvider>{children}</TokenStateProvider>;
}

export { default as useTokenContext } from './useToken';