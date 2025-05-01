"use client"

import { useState, useCallback } from "react";

type SetValue<T> = (value: T | ((prevValue: T) => T)) => void;

export function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  // State untuk menyimpan nilai
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Fungsi untuk mengupdate nilai
  const setValue: SetValue<T> = useCallback(
    (value) => {
      try {
        // Biarkan value menjadi fungsi jika itu adalah fungsi
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        
        // Simpan state
        setStoredValue(valueToStore);
        
        // Simpan ke localStorage
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.error(error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
}