import { SearchUsersInput } from '@/modules/search-users';

export const App = () => {
  return (
    <div className='w-full'>
      <h1 className='text-3xl font-bold underline'>GITHUB REPO</h1>
      <div className='mt-[200px] w-[500px]'>
        <SearchUsersInput />
      </div>
    </div>
  );
};
