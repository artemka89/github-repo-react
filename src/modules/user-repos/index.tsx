import { FC } from 'react';

import { cn } from '@/shared/libs/cn';
import { useAppearanceDelay } from '@/shared/libs/use-appearance-delay';

import { RepoItem } from './components/repo-item';
import { useGetUserRepos } from './model/use-get-user-repos';

interface UserRepoListProps {
  login: string;
  className?: string;
}

export const UserRepoList: FC<UserRepoListProps> = ({ login, className }) => {
  const { data, isLoading, isFetched } = useGetUserRepos(login);

  const isLoadingWithDelay = useAppearanceDelay(isLoading);

  const isScrollable = data && data.length > 5;

  if (isLoadingWithDelay)
    return (
      <div className='w-full animate-pulse space-y-2'>
        {[...new Array(5)].map((_, index) => (
          <div key={index} className='h-[62px] rounded-md bg-neutral-600' />
        ))}
      </div>
    );

  if (isFetched && data?.length === 0)
    return (
      <div className='flex w-full items-center justify-center text-2xl'>
        Repositories not found
      </div>
    );

  return (
    <ul
      className={cn(
        className,
        'max-h-[342px] w-full space-y-2 overflow-y-auto',
        { 'pr-1': isScrollable },
        '[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-muted [&::-webkit-scrollbar]:w-1.5',
      )}>
      {data?.map((repo) => <RepoItem key={repo.id} repo={repo} />)}
    </ul>
  );
};
