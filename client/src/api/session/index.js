import { post } from 'src/api/core';

export async function getSession(user, password) {
  return post('/api/session', { user: user, password: password });
}
