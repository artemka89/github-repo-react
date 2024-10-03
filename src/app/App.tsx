import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { SearchUsersInput } from '@/modules/search-users';
import { UserCard } from '@/modules/user-card';
import { UserRepoList } from '@/modules/user-repos';

export const App = () => {
  const [userLogin, setUserLogin] = useState<string>('');

  const [urlSearchParams] = useSearchParams();

  useEffect(() => {
    const loginSearchParams = urlSearchParams.get('login');
    if (loginSearchParams) {
      setUserLogin(loginSearchParams);
    }
  }, [urlSearchParams]);

  return (
    <div className='container min-h-screen'>
      <div className='flex w-full flex-col items-center justify-center pt-[50px] md:pt-[150px]'>
        <h1 className='mb-6 text-center text-5xl font-bold text-accent'>
          GITHUB REPO
        </h1>
        <SearchUsersInput
          setLogin={setUserLogin}
          className='mb-12 w-full max-w-[500px]'
        />
        <div className='flex w-full max-w-[842px] flex-col justify-center gap-2 md:flex-row'>
          <UserCard login={userLogin} />
          <UserRepoList login={userLogin} />
        </div>
      </div>
    </div>
  );
};
