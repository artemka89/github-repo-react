import { FC, useRef, useState } from 'react';

import { cn } from '@/shared/libs/cn';
import useDebounceValue from '@/shared/libs/use-debounce-value';
import { useOutsideClick } from '@/shared/libs/use-outside-click';
import { Input } from '@/shared/ui/input';

import { Popup } from './components/popup';
import { ScrollableUserList } from './components/scrollable-user-list';
import { UserItem } from './components/user-item';
import { useGetSearchingUsers } from './model/use-get-searching-users';

interface SearchUsersProps {
  className?: string;
}

export const SearchUsersInput: FC<SearchUsersProps> = ({ className }) => {
  const [searchValue, setSearchValue] = useState('');
  const debouncesLogin = useDebounceValue(searchValue, 500);

  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const { data, fetchNextPage, isPending, isFetchingNextPage, hasNextPage } =
    useGetSearchingUsers(debouncesLogin);

  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, onClosePopup, isOpenPopup);

  const isData = !!data?.pages[0]?.items;
  const isScrollablePopup = isData ? data.pages[0].items.length > 5 : false;
  const isEmptyList = isData
    ? !data.pages[0].items.length && Boolean(searchValue)
    : true;

  function onClosePopup() {
    setIsOpenPopup(false);
    setSearchValue('');
  }

  function onClickItem(value: string) {
    console.log(value);
    setIsOpenPopup(false);
    setSearchValue('');
  }

  function getNextUsers() {
    fetchNextPage();
  }

  return (
    <>
      {isOpenPopup && (
        <div className='fixed bottom-0 left-0 right-0 top-0 bg-black/50' />
      )}
      <div ref={ref} className={cn(className, 'z-50` relative')}>
        <Input
          placeholder='Enter user login'
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          onFocus={() => setIsOpenPopup(true)}
        />
        <Popup isOpen={isOpenPopup && !isPending}>
          <ScrollableUserList
            isScrollable={isScrollablePopup}
            onScrollToBottom={getNextUsers}
            isLoading={isFetchingNextPage}
            isInfinity={hasNextPage}
            isEmpty={isEmptyList}>
            {data?.pages.map(
              (page) =>
                page?.items &&
                page?.items.map((user) => (
                  <UserItem key={user.id} user={user} onClick={onClickItem} />
                )),
            )}
          </ScrollableUserList>
        </Popup>
      </div>
    </>
  );
};
