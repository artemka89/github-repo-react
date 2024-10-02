import { FC, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { cn } from '@/shared/libs/cn';
import { useAppearanceDelay } from '@/shared/libs/use-appearance-delay';
import { Spinner } from '@/shared/ui/spinner';

interface UserListProps {
  isScrollable?: boolean;
  children: React.ReactNode;
  className?: string;
  isLoading: boolean;
  isInfinity: boolean;
  isEmpty: boolean;
  onScrollToBottom: () => void;
}

export const ScrollableUserList: FC<UserListProps> = ({
  isScrollable = false,
  children,
  className,
  isLoading,
  isInfinity,
  isEmpty,
  onScrollToBottom,
}) => {
  const { ref, inView } = useInView({ root: null, threshold: 0 });

  const isLoadingMore = useAppearanceDelay(isLoading);

  useEffect(() => {
    if (inView) {
      onScrollToBottom();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <div
      className={cn(
        'z-99 relative overflow-hidden rounded-xl border border-border bg-muted-foreground',
        { 'pr-1': isScrollable },
      )}>
      <ul
        className={cn(
          className,
          'max-h-[284px] overflow-y-auto',
          '[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border',
          '[&::-webkit-scrollbar-track]:my-1 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-muted',
          '[&::-webkit-scrollbar]:w-1.5',
        )}>
        {!isEmpty ? (
          children
        ) : (
          <li className='flex h-14 cursor-pointer items-center gap-2 bg-transparent px-2 text-lg'>
            Users Not Found
          </li>
        )}
        {isInfinity && <div ref={ref} className='h-1' />}
        {isLoadingMore && (
          <div className='absolute bottom-2 right-2 flex justify-end px-2 py-1'>
            <Spinner className='size-8 text-primary' />
          </div>
        )}
      </ul>
    </div>
  );
};
