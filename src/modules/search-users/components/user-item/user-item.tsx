import { FC } from 'react';

import { cn } from '@/shared/lib/cn';
import { getDisplayName } from '@/shared/lib/get-display-name/get-display-name';
import { Avatar } from '@/shared/ui/avatar';

import { User } from '../../model/types';

interface UserItemProps {
  user: User;
  className?: string;
  onClick: (value: string) => void;
}

export const UserItem: FC<UserItemProps> = ({ user, onClick, className }) => {
  const onClickItem = () => {
    onClick(user.login);
  };

  return (
    <li
      data-testid='user-item'
      onClick={onClickItem}
      className={cn(
        className,
        'flex h-14 cursor-pointer items-center gap-2 bg-transparent px-2 transition-colors has-hover:hover:bg-input',
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
