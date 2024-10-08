import { useCallback, useSyncExternalStore } from 'react';

export const useMatchMedia = (query: string) => {
  const getSnapshot = () => {
    return window.matchMedia(query).matches;
  };

  const subscribe = useCallback(
    (callback: () => void) => {
      const mediaQueryList = window.matchMedia(query);
      mediaQueryList.addEventListener('change', callback);

      return () => mediaQueryList.removeEventListener('change', callback);
    },
    [query],
  );

  return useSyncExternalStore(subscribe, getSnapshot);
};
