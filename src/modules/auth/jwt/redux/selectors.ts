import { STORE_KEY } from './consts';

export const selectAuthState = (state) => state[STORE_KEY].state;
export const selectAuthData = (state) => state[STORE_KEY].data;
export const selectCurrentUser = (state) => state[STORE_KEY].currentUser;
