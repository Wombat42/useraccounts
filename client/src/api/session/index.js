import { getReq, postReq } from 'src/api/core';

export async function authenticate(user, password) {
  return postReq(null, '/api/session', { user, password });
}

export async function getSession() {
  return getReq(null, '/api/session');
}
