import { useEffect, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 */
export function useLocalStorage(key, initialValue) {
  /** React hook for localStorage state sync */
  const [value, setValue] = useState(() => {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore
    }
  }, [key, value]);

  return [value, setValue];
}
