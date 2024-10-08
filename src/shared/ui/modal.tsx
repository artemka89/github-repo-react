import { FC } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

import { cn } from '../lib/cn';

import { Button } from './button';

interface PortalProps {
  children: React.ReactNode;
  element?: HTMLElement;
}

export const Portal: FC<PortalProps> = ({
  children,
  element = document.body,
}) => {
  return createPortal(children, element);
};

interface ModalProps {
  className?: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: FC<ModalProps> = ({
  className,
  children,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <Portal element={document.getElementById('app') ?? document.body}>
      <div
        onClick={onClose}
        className={cn(
          'fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50 opacity-0 transition-opacity',
          {
            ['opacity-1']: isOpen,
          },
        )}>
        <div
          onClick={(event) => event.stopPropagation()}
          className={cn(
            'relative w-full max-w-[500px] scale-0 rounded-md bg-muted p-8 transition-transform',
            {
              ['scale-100']: isOpen,
            },
          )}>
          <Button
            onClick={onClose}
            size={'icon'}
            className='absolute right-2 top-2 bg-transparent text-neutral-300 hover:text-primary'>
            <X size={32} />
          </Button>
          <div className={className}>{children}</div>
        </div>
      </div>
    </Portal>
  );
};
