import { createBrowserRouter, Navigate } from 'react-router-dom';

import { App } from './App';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/users' replace={true} />,
  },
  { path: '/users', element: <App /> },
  {
    path: '*',
    element: <div>Not found</div>,
  },
]);
