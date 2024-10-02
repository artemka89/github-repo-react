import { FC } from 'react';

import { cn } from '@/shared/libs/cn';

import { CardHeader } from './components/card-header';
import { RepoInfo } from './components/repo-info';
import { useGetUser } from './model/use-get-user';

interface UserCardProps {
  login: string;
  className?: string;
}

export const UserCard: FC<UserCardProps> = ({ login, className }) => {
  const { data, isLoading } = useGetUser(login);

  if (isLoading) return <>...Loading</>;

  if (!data) return null;

  return (
    <div
      className={cn(
        className,
        'w-full rounded-md bg-muted px-4 py-6 md:max-w-[300px]',
      )}>
      <CardHeader user={data} />
      <RepoInfo reposInfo={data} className='mt-6' />
    </div>
  );
};
