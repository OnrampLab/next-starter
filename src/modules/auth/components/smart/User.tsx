import React from 'react';
import { AuthModel } from '@onr/auth/services/interfaces';
import { useAuth } from './Auth';

const UserContext = React.createContext<AuthModel.SigninResponse | undefined>(undefined);

const UserProvider: React.FC = props => {
  const { data } = useAuth();
  return <UserContext.Provider value={data} {...props} />;
};

function useUser() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used with in a UserProvider`);
  }
  return context;
}

export { UserProvider, useUser, UserContext };
