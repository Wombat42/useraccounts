import { getReq } from 'src/api/core';

export async function getUser(sessionID, userID) {
  return getReq(sessionID, `/api/user/${userID}`);
}

export async function getUserAccount(sessionID, userID) {
  return getReq(sessionID, `/api/user/${userID}/account`);
}
