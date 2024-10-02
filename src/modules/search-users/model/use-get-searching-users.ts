import { useInfiniteQuery } from '@tanstack/react-query';

import { getSearchingUsers } from '@/shared/api/api';
import { USER_PER_PAGE } from '@/shared/api/consts';

const searchingUsersKey = 'searching-users';

export const useGetSearchingUsers = (login: string) => {
  return useInfiniteQuery({
    queryKey: [searchingUsersKey, login],
    queryFn: ({ pageParam }) => getSearchingUsers(login, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage?.items && lastPage.items.length === 0) return null;
      const isLastPage =
        lastPageParam === Math.ceil(lastPage.total_count / USER_PER_PAGE);
      if (isLastPage) return null;
      return lastPageParam + 1;
    },
    enabled: !!login,
  });
};
