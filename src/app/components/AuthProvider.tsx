import React, { ReactNode } from 'react';
import { AuthProvider } from '@onr/auth/components/smart/Auth';
import { UserProvider } from '@onr/auth/components/smart/User';

export const AuthenticationProvider: React.FC<{ children: ReactNode }> = props => {
  return (
    <AuthProvider>
      <UserProvider>{props?.children || null}</UserProvider>
    </AuthProvider>
  );
};
