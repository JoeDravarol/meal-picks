import { useEffect, useState } from 'react';

// https://usehooks.com/useLocalStorage/
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(
    () => JSON.parse(localStorage.getItem(key)) ?? initialValue
  );

  useEffect(() => {
    // Storage events occur when another tab is modifying localStorage.
    // Use it to keep two tabs in sync
    const fromStorage = e => {
      if (e.key === key) {
        setStoredValue(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', fromStorage);
    return () => {
      window.removeEventListener('storage', fromStorage);
    };
  }, [key]);

  const setValue = value => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
