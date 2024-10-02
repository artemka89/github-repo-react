import { FC } from 'react';

import { cn } from '@/shared/libs/cn';

interface AvatarProps {
  imageUrl?: string;
  username: string;
  size?: 48 | 64;
  className?: string;
  formatName?: (name: string) => string;
}

export const Avatar: FC<AvatarProps> = ({
  imageUrl,
  username,
  size = 64,
  className,
  formatName,
}) => {
  const displayName = formatName?.(username);

  return (
    <div
      className={cn(
        className,
        { 48: 'h-12 w-12', 64: 'h-16 w-16' }[size],
        'flex items-center justify-center overflow-hidden rounded-full border-2 border-border bg-input text-accent',
        imageUrl,
      )}>
      {imageUrl ? (
        <img src={imageUrl} alt={`avatar-${username}`} />
      ) : (
        <span className={cn({ 48: 'text-xl', 64: 'text-3xl' }[size])}>
          {displayName}
        </span>
      )}
    </div>
  );
};