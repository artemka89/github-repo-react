import { useState } from 'react';

import { SearchUsersInput } from '@/modules/search-users';
import { UserCard } from '@/modules/user-card';
import { UserRepoList } from '@/modules/user-repos';

export const App = () => {
  const [userLogin, setUserLogin] = useState<string>('');

  return (
    <div className='container flex min-h-screen items-center justify-center'>
      <div className='flex w-full flex-col items-center justify-center md:-mt-[72px]'>
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
