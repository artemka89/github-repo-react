const API_URL = 'https://api.github.com';
const USER_PER_PAGE = 20;

export const getUserUrl = (login: string) => {
  return `${API_URL}/users/${login}`;
};

export const getUserReposUrl = (login: string) => {
  return `${API_URL}/users/${login}/repos`;
};

export const getSearchUsersUrl = ({
  login,
  page = 1,
  perPage = USER_PER_PAGE,
}: {
  login: string;
  page?: number;
  perPage?: number;
}) => {
  return `${API_URL}/search/users?q=${login}&per_page=${perPage}&page=${page}`;
};
