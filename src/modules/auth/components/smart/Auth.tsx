import React, { useState, useEffect } from 'react';
import { AuthModel } from '@onr/auth/services/interfaces';
import { AuthService } from '@onr/auth/services';
import { message } from 'antd';
enum AuthState {
  Prepare,
  Resolve
}
interface IAuthContext extends AuthModel.IAuthContext {
  authState: AuthState
}
const AuthContext = React.createContext<IAuthContext | undefined>(undefined);

const AuthProvider: React.FC = props => {
  const [data, setData] = useState<AuthModel.SigninResponse | null>(null);
  const [state, setState] = useState<AuthState>(AuthState.Prepare);
  useEffect(() => {
    let id = +(sessionStorage.getItem('onr_id') || '-1');
    let token: string = sessionStorage.getItem('onr_token') || '';
    if (id && id !== -1 && token) {
      setData({ id, token });
    }
    setState(AuthState.Resolve);
  }, []);
  const login = (form: AuthModel.SigninPayload) => {
    setState(AuthState.Prepare);
    return AuthService.login(form)
      .then(response => {
        setData(response);
        setState(AuthState.Resolve);
        return response;
      })
      .catch(err => {
        setState(AuthState.Resolve);
        throw err.message;
      });
  };
  const logout = () => {
    setState(AuthState.Prepare);
    AuthService.logout()
      .then(response => {
        setData(null);
        setState(AuthState.Resolve);
        return response;
      })
      .catch(err => {
        setState(AuthState.Resolve);
        message.error(err.message);
      });
  };

  return (
    <AuthContext.Provider
      {...(props as any)}
      value={{
        data: data,
        login,
        logout,
        authState: state,
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

export { AuthProvider, useAuth, AuthState };
