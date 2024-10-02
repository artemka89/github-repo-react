import { FC } from 'react';

import { cn } from '@/shared/libs/cn';

interface RepoInfoProps {
  reposInfo: { public_repos: number; followers: number; following: number };
  className?: string;
}

export const RepoInfo: FC<RepoInfoProps> = ({ reposInfo, className }) => {
  return (
    <ul
      className={cn(
        className,
        'flex flex-col items-center gap-2 px-4 text-center text-lg sm:flex-row sm:justify-center sm:gap-4 md:block md:text-xl',
      )}>
      <li>Repositories: {reposInfo.public_repos}</li>
      <li>Followers: {reposInfo.followers}</li>
      <li>Following: {reposInfo.following}</li>
    </ul>
  );
};
