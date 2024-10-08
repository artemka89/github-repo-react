import { FC, memo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { cn } from '@/shared/lib/cn';
import useDebounceValue from '@/shared/lib/use-debounce-value';
import { useOutsideClick } from '@/shared/lib/use-outside-click';
import { Input } from '@/shared/ui/inputFirst';

import { Popup } from './components/popup';
import { ScrollableUserList } from './components/scrollable-user-list';
import { UserItem } from './components/user-item';
import { useGetSearchingUsers } from './model/use-get-searching-users';

interface SearchUsersProps {
  setLogin: (value: string) => void;
  className?: string;
}

export const SearchUsersInput: FC<SearchUsersProps> = memo(
  function SearchUsersInput({ setLogin, className }) {
    const [searchValue, setSearchValue] = useState('');
    const debouncesLogin = useDebounceValue(searchValue, 500);

    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [isFocusInput, setIsFocusInput] = useState(false);

    const setUrlSearchParams = useSearchParams()[1];

    const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
      useGetSearchingUsers(debouncesLogin);

    const ref = useRef<HTMLDivElement>(null);
    useOutsideClick(ref, onClosePopup, isFocusInput);

    const isData = !!data?.pages[0]?.items;
    const isScrollablePopup = isData ? data.pages[0].items.length > 5 : false;
    const isEmptyList = isData
      ? !data.pages[0].items.length && Boolean(searchValue)
      : true;

    function onChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
      if (!isOpenPopup) {
        setIsOpenPopup(true);
      }
      setSearchValue(event.target.value);
    }

    function onFocusInput() {
      setIsFocusInput(true);
    }

    function onClosePopup() {
      setIsOpenPopup(false);
      setIsFocusInput(false);
      setSearchValue('');
    }

    function onClickItem(value: string) {
      setIsOpenPopup(false);
      setIsFocusInput(false);
      setLogin(value);
      setUrlSearchParams({ login: value });
      setSearchValue('');
    }

    function getNextUsers() {
      fetchNextPage();
    }

    return (
      <>
        {isFocusInput && (
          <div className='fixed bottom-0 left-0 right-0 top-0 bg-black/50' />
        )}
        <div ref={ref} className={cn(className, 'z-50` relative')}>
          <Input
            placeholder='Enter user login'
            value={searchValue}
            onChange={onChangeInput}
            onFocus={onFocusInput}
          />
          <Popup isOpen={isOpenPopup && isData}>
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
  },
);
