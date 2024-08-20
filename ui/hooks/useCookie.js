import { useState } from 'react';

export const useCookie = (cookieName) => {
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  const [cookie, setCookieState] = useState(() => getCookie(cookieName));

  const setCookie = (value, days) => {
    const expires = new Date(Date.now() + days * 86400000).toUTCString();
    document.cookie = `${cookieName}=${value}; expires=${expires}; path=/`;
    setCookieState(value);
  };

  const deleteCookie = () => {
    document.cookie = `${cookieName}=; Max-Age=-99999999; path=/`;
    setCookieState(null);
  };

  return [cookie, setCookie, deleteCookie];
};
