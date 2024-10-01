import { FC } from 'react';

import { cn } from '@/shared/libs/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input: FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      type='text'
      className={cn(
        className,
        'border-border bg-input h-full w-full rounded-xl border px-4 pb-3 pt-2 text-xl disabled:cursor-not-allowed disabled:opacity-50',
      )}
      {...props}
    />
  );
};
