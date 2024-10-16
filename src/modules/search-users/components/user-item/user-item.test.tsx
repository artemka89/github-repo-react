import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { UserItem } from './user-item';

describe('user-item', () => {
  const user = {
    id: '1',
    login: 'login',
    avatar_url: 'https://avatars.com/avatar.jpg',
  };

  const onCLick = jest.fn();

  test('render correctly ', () => {
    render(<UserItem user={user} onClick={onCLick} />);

    expect(screen.getByText(user.login)).toBeInTheDocument();
  });

  test('should call onClick with args', async () => {
    render(<UserItem user={user} onClick={onCLick} />);

    const listItem = screen.getByRole('listitem');
    await userEvent.click(listItem);
    expect(onCLick).toHaveBeenCalled();
    expect(onCLick).toHaveBeenCalledWith(user.login);
  });
});
