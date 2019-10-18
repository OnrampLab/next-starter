import { Http } from '@onr/shared';
import { AuthModel } from './interfaces';

export const AuthService = {
  login: async (payload: AuthModel.SigninPayload): Promise<AuthModel.SigninResponse> => {
    let response: AuthModel.SigninResponse;

    try {
      // response = await Http.request<AuthModel.SigninResponse>('POST', '/login', payload.params);
      response = {
        id: 111,
        token: '1111'
      }
    } catch (error) {
      throw new Error(`Login Error: ${error}`);
    }

    return response;
  },

  logout: async () => {
    let response: AuthModel.SignoutResponse;
    try {
      // response = await Http.request<AuthModel.SignoutResponse>('GET', '/logout')
      response = {
        message: 'ok'
      }
    } catch (error) {
      throw new Error(`Login Error: ${error.message}`)
    }
    return response
  },

  loginWithJWT: async (token: string) => {
    // TODO with jwt login
  }
};
