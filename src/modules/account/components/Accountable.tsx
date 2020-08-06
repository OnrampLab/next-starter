import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { accountActions } from '@onr/account';
import { useAuth, AuthState } from '@onr/auth';

export const Accountable: React.FC = ({ children }) => {
  const auth = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.authState !== AuthState.Authorized) return;
    dispatch(
      accountActions.getAccounts({
        params: {},
      }),
    );
  }, [auth.authState]);

  return <>{children}</>;
};
