import { AuthState as CoreAuthState } from '@onr/auth/core';

export const AuthState = {
  ...CoreAuthState, 
  NeedRefresh: 'AuthState.NeedRefresh',
} as const;
/*
  NeedRefresh: the token has been expired, and has to re-authorize
*/
