import React, { FC } from 'react';

import { cn } from '@/shared/libs/cn';

interface PopupProps {
  isOpen: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Popup: FC<PopupProps> = ({ isOpen, children, className }) => {
  return (
    <div
      className={cn(
        className,
        'invisible absolute bottom-0 left-0 right-0 top-[calc(100%+4px)] z-50 opacity-0',
        { 'visible opacity-100': isOpen },
      )}>
      {children}
    </div>
  );
};
