import { getDisplayName } from '@/shared/libs/get-display-name';
import { Avatar } from '@/shared/ui/avatar';
import { Input } from '@/shared/ui/input';

export const App = () => {
  return (
    <div className='w-full'>
      <h1 className='text-3xl font-bold underline'>GITHUB REPO</h1>
      <div className='mt-[200px] flex h-full w-[500px] items-center justify-center'>
        <Input placeholder='Enter user login' />
      </div>
      <Avatar name='artemka89' size={64} formatName={getDisplayName} />
    </div>
  );
};
