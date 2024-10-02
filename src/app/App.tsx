import { SearchUsersInput } from '@/modules/search-users';
import { UserCard } from '@/modules/user-card';
import { UserRepoList } from '@/modules/user-repos';

export const App = () => {
  return (
    <div className='container flex min-h-screen items-center justify-center'>
      <div className='flex w-full flex-col items-center justify-center'>
        <h1 className='mb-6 text-center text-5xl font-bold text-accent'>
          GITHUB REPO
        </h1>
        <SearchUsersInput className='mb-12 w-full max-w-[500px]' />
        <div className='flex w-full max-w-[842px] flex-col justify-center gap-2 md:flex-row'>
          <UserCard login='artemka89' />
          <UserRepoList login='artemka89' />
        </div>
      </div>
    </div>
  );
};
