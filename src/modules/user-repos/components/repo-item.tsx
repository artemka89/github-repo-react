import { FC } from 'react';

import { cn } from '@/shared/libs/cn';

import { UserRepo } from '../model/types';

interface RepoItemProps {
  repo: UserRepo;
  className?: string;
}

export const RepoItem: FC<RepoItemProps> = ({ repo, className }) => {
  return (
    <li
      className={cn(
        className,
        'has-hover:border-border cursor-pointer rounded-md border border-transparent bg-muted transition-colors',
      )}>
      <a
        href={repo.html_url}
        target='_blank'
        className='flex justify-center overflow-hidden text-ellipsis whitespace-nowrap px-4 py-4 text-xl font-medium'>
        {repo.name}
      </a>
    </li>
  );
};
