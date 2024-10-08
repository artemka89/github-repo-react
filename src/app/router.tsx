import { createBrowserRouter, Navigate } from 'react-router-dom';

import { GithubReposPage } from '@/pages/github-repos-page';

import { RootLayout } from './root-layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Navigate to='/users' /> },
      { path: '/users', element: <GithubReposPage /> },
      {
        path: '/todo',
        lazy: async () => {
          const { TodoListPage } = await import('@/pages/todo-list-page');
          return { element: <TodoListPage /> };
        },
      },
    ],
  },

  {
    path: '*',
    element: <div>Not found</div>,
  },
]);
