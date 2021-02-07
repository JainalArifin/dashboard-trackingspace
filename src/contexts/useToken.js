import React, { useState, createContext, useContext } from 'react';
import { decodeToken } from '../utils/converter';

const TokenContext = createContext();

export const TokenStateProvider = ({ children }) => {
  const authToken = window.localStorage.getItem('authToken');

  const [token, setToken] = useState(authToken);

  return (
    <TokenContext.Provider value={[token, setToken]}>
      {children}
    </TokenContext.Provider>
  );
};

export default function useTokenContext() {
  
  const [token, setToken] = useContext(TokenContext);
  
  // const authToken = window.localStorage.getItem('authToken');
  // setToken(authToken);
  
  // console.log('--', token);

  const getToken = (isDecoded = false) =>
    isDecoded ? decodeToken(token) : token;

  return { getToken, setToken };
}
