import { FC } from 'react';

import { cn } from '@/shared/libs/cn';

import { RepoItem } from './components/repo-item';
import { useGetUserRepos } from './model/use-get-user-repos';

interface UserRepoListProps {
  login: string;
  className?: string;
}

export const UserRepoList: FC<UserRepoListProps> = ({ login, className }) => {
  const { data, isLoading, isFetched } = useGetUserRepos(login);

  const isScrollable = data && data.length > 5;

  if (isLoading) return <>...Loading</>;

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
