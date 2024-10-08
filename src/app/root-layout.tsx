import { FC } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import { cn } from '@/lib/utils';

export const RootLayout: FC = () => {
  return (
    <div className='container min-h-screen'>
      <header className='flex justify-end gap-6 border-b border-border py-4'>
        <NavLink
          to='/users'
          className={({ isActive }) =>
            cn(
              'text-lg font-medium text-accent transition-colors hover:text-primary',
              { 'text-primary': isActive },
            )
          }>
          Github Repos
        </NavLink>
        <NavLink
          to='/todo'
          className={({ isActive }) =>
            cn(
              'text-lg font-medium text-accent transition-colors hover:text-primary',
              { 'text-primary': isActive },
            )
          }>
          Todo List
        </NavLink>
      </header>
      <Outlet />
    </div>
  );
};
