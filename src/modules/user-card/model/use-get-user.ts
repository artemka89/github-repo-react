import { useQuery } from '@tanstack/react-query';

import { getUser } from '@/shared/api/api';

const userKey = 'user';

export const useGetUser = (login: string) => {
  return useQuery({
    queryKey: [userKey, login],
    queryFn: () => getUser(login),
    enabled: !!login,
  });
};
