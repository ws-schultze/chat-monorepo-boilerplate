export interface User {
  id?: string;
  username?: string;
}

export interface CreateUsernameResponse {
  success?: boolean;
  error?: string;
}

export interface SearchUsersResponse {
  users: Array<User>;
}
