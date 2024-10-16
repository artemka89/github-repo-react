import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useGetSearchingUsers } from './model/use-get-searching-users';
import { SearchUsersInput } from '.';

const testQueryClient = new QueryClient();

jest.mock('./model/use-get-searching-users');

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>
);

const router = createMemoryRouter(
  [{ path: '/users', element: <SearchUsersInput setLogin={() => {}} /> }],
  {
    initialEntries: ['/users'],
    initialIndex: 1,
  },
);

describe('user-item', () => {
  const items = [
    {
      id: '1',
      login: 'login1',
      avatar_url: 'https://avatars.com/avatar1.jpg',
    },
    {
      id: '2',
      login: 'login2',
      avatar_url: 'https://avatars.com/avatar2.jpg',
    },
  ];

  test('should render without data', () => {
    (useGetSearchingUsers as jest.Mock).mockImplementation(() => ({
      data: undefined,
      isSuccess: true,
    }));

    renderHook(() => useGetSearchingUsers('user-login'), {
      wrapper,
    });

    render(<RouterProvider router={router} />);

    const userList = screen.getByRole('list');

    expect(userList).toHaveTextContent('Users Not Found');
    expect(screen.queryByTestId('fade screen')).toBeNull();
  });

  test('should render with data', () => {
    (useGetSearchingUsers as jest.Mock).mockImplementation(() => ({
      data: { pages: [{ items }] },
      isSuccess: true,
    }));

    renderHook(() => useGetSearchingUsers('user-login'), {
      wrapper,
    });

    render(<RouterProvider router={router} />);

    const userItems = screen.getAllByTestId('user-item');
    expect(userItems).toHaveLength(2);
  });

  test('should type in input', async () => {
    const login = 'user1';

    render(<RouterProvider router={router} />);

    const input = screen.getByRole('textbox');

    await userEvent.type(input, login);
    expect(input).toHaveValue(login);
  });

  test('should focus on input', async () => {
    render(<RouterProvider router={router} />);

    const input = screen.getByRole('textbox');
    await userEvent.click(input);

    expect(input).toHaveFocus();
    expect(screen.queryByTestId('fade screen')).toBeInTheDocument();
  });
});
