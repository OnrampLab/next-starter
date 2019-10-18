import React, { useState, useEffect } from 'react';
import { AuthModel } from '@onr/auth/services/interfaces';
import { AuthService } from '@onr/auth/services';
import { message } from 'antd';

const AuthContext = React.createContext<AuthModel.IAuthContext | undefined>(undefined);

const AuthProvider: React.FC = props => {
  const [data, setData] = useState<AuthModel.SigninResponse | null>(null);
  const login = (form: AuthModel.SigninPayload) => {
    return AuthService.login(form)
      .then(response => {
        setData(response);
        return response;
      })
      .catch(err => {
        throw err.message;
      });
  };
  const logout = () => AuthService.logout()
    .then(response => {
      setData(null)
      return response
    }).catch(err => {
      message.error(err.message)
    });

  return (
    <AuthContext.Provider
      {...(props as any)}
      value={{
        data: data,
        login,
        logout,
      }}
    />
  );
};

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

export { AuthProvider, useAuth };
