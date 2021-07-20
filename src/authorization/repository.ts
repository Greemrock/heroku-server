const admin: { username: string; password: string } = {
  username: 'admin',
  password: '12345',
};

export const logIn = (
  username: string,
  password: string,
): Promise<{ username: string; password: string } | void> => {
  if (username === admin.username && password === admin.password) {
    return Promise.resolve({ username, password });
  }
  return Promise.reject(new Error('Incorrect username or password.'));
};
