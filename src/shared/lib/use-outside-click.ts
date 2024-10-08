import { RefObject, useCallback, useEffect } from 'react';

export const useOutsideClick = (
  ref: RefObject<HTMLElement>,
  callback: () => void,
  flag?: boolean,
) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const callbackFn = useCallback(() => callback(), []);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callbackFn();
      }
    };

    if (flag) {
      document.addEventListener('click', handleClick, true);
    }

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [callbackFn, ref, flag]);

  return ref;
};
