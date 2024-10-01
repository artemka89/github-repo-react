export interface SearchingUser {
  id: string;
  login: string;
  avatar_url: string;
}

export interface SearchingUsers {
  total_count: number;
  items: SearchingUser[];
}

export interface User {
  login: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
}

export interface UserRepo {
  name: string;
  html_url: string;
}
