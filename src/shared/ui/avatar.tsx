import { FC } from 'react';

import { cn } from '@/shared/libs/cn';

interface AvatarProps {
  imageUrl?: string;
  name: string;
  size?: 48 | 64;
  className?: string;
  formatName?: (name: string) => string;
}

export const Avatar: FC<AvatarProps> = ({
  imageUrl,
  name,
  size = 64,
  className,
  formatName,
}) => {
  const displayName = formatName?.(name);

  return (
    <div
      className={cn(
        className,
        { 48: 'h-12 w-12', 64: 'h-16 w-16' }[size],
        'bg-input border-border text-accent flex items-center justify-center overflow-hidden rounded-full border-2',
        imageUrl,
      )}>
      {imageUrl ? (
        <img src={imageUrl} alt={`avatar-${name}`} />
      ) : (
        <span className={cn({ 48: 'text-xl', 64: 'text-3xl' }[size])}>
          {displayName}
        </span>
      )}
    </div>
  );
};
