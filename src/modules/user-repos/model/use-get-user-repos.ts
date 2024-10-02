import { useQuery } from '@tanstack/react-query';

import { getUserRepo } from '@/shared/api/api';

const userReposKey = 'userRepos';

export const useGetUserRepos = (login: string) => {
  return useQuery({
    queryKey: [userReposKey, login],
    queryFn: () => getUserRepo(login),
    enabled: !!login,
  });
};
