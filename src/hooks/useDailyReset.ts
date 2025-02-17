// src/hooks/useDailyReset.ts
import { useEffect, useRef } from 'react';

export const useDailyReset = (onReset: () => void) => {
  const lastResetDateRef = useRef<string>(
    localStorage.getItem('lastResetDate') || new Date().toLocaleDateString()
  );

  useEffect(() => {
    const checkForReset = () => {
      const today = new Date().toLocaleDateString();
      
      if (lastResetDateRef.current !== today) {
        onReset();
        lastResetDateRef.current = today;
        localStorage.setItem('lastResetDate', today);
      }
    };

    // Check immediately
    checkForReset();

    // Check every minute for date change
    const interval = setInterval(checkForReset, 60000);

    return () => clearInterval(interval);
  }, [onReset]);
};