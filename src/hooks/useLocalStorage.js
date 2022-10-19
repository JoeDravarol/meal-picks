import { useState } from 'react';

// https://usehooks.com/useLocalStorage/
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(
    () => JSON.parse(localStorage.getItem(key)) ?? initialValue
  );

  const setValue = value => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
