import { getSearchUsersUrl, getUserReposUrl, getUserUrl } from './consts';
import { SearchingUsers, User, UserRepo } from './types';

async function fetchUserData<R>(url: string, login: string): Promise<R> {
  try {
    if (typeof login !== 'string') {
      throw new TypeError('username must be a string');
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const user: Promise<R> = await response.json();
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return [] as R;
  }
}

export async function getUserData(login: string) {
  const userUrl = getUserUrl(login);
  const repoUrl = getUserReposUrl(login);

  const user = await fetchUserData<User>(userUrl, login);
  const repos = await fetchUserData<UserRepo[]>(repoUrl, login);

  return { user, repos };
}

export async function getSearchingUsers(login: string, page = 1) {
  const url = getSearchUsersUrl({ login, page });

  const response = await fetchUserData<SearchingUsers>(url, login);
  return response;
}
