import { render, screen } from '@testing-library/react';

import { RepoItem } from './repo-item';

describe('user-item', () => {
  const repo = {
    name: 'project 1',
    html_url: 'some url',
  };

  test('render correctly ', () => {
    render(<RepoItem repo={repo} />);

    const link = screen.getByRole('link', { name: repo.name });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', repo.html_url);
  });
});
