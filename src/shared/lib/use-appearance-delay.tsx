import { startTransition, useEffect, useState } from 'react';

type Options = {
  defaultValue?: boolean;
  appearanceDelay?: number;
  minDisplay?: number;
};

export function useAppearanceDelay(show?: boolean, options = {} as Options) {
  const {
    minDisplay = 1000,
    defaultValue = false,
    appearanceDelay = 100,
  } = options;

  const [delayedShow, setDelayedShow] = useState(defaultValue);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        startTransition(() => {
          setDelayedShow(true);
        });
      }, appearanceDelay);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        startTransition(() => {
          setDelayedShow(false);
        });
      }, minDisplay);
      return () => clearTimeout(timer);
    }
  }, [appearanceDelay, show, minDisplay]);
  return delayedShow;
}
