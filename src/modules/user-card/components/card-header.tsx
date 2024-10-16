import { FC } from 'react';

import { cn } from '@/shared/lib/cn';
import { getDisplayName } from '@/shared/lib/get-display-name/get-display-name';
import { Avatar } from '@/shared/ui/avatar';

interface CardHeaderProps {
  user: { login: string; html_url: string; avatar_url: string };
  className?: string;
}

export const CardHeader: FC<CardHeaderProps> = ({ user, className }) => {
  return (
    <div className={cn(className, 'flex flex-col items-center gap-2')}>
      <div>
        <Avatar
          username={user.login}
          imageUrl={user.avatar_url}
          formatName={getDisplayName}
        />
      </div>
      <a href={user.html_url} target='_blank' className='block w-full'>
        <h2 className='overflow-hidden text-ellipsis whitespace-nowrap text-center text-2xl font-bold has-hover:hover:underline'>
          {user.login}
        </h2>
      </a>
    </div>
  );
};
