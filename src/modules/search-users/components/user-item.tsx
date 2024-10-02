import { FC } from 'react';

import { cn } from '@/shared/libs/cn';
import { getDisplayName } from '@/shared/libs/get-display-name';
import { Avatar } from '@/shared/ui/avatar';

import { User } from '../model/types';

interface UserItemProps {
  user: User;
  className?: string;
  onClick: (value: string) => void;
}

export const UserItem: FC<UserItemProps> = ({ user, onClick, className }) => {
  return (
    <li
      onClick={onClick.bind(null, user.login)}
      className={cn(
        className,
        'has-hover:bg-input flex h-14 cursor-pointer items-center gap-2 bg-transparent px-2 transition-colors',
      )}>
      <Avatar
        size={48}
        imageUrl={user.avatar_url}
        username={user.login}
        formatName={getDisplayName}
      />
      <span className='text-lg'>{user.login}</span>
    </li>
  );
};
