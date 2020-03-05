import { Http } from '@onr/shared';
import { AuthModel } from './interfaces';

export const AuthService = {
  login: async (payload: AuthModel.SigninPayload): Promise<AuthModel.SigninResponse> => {
    let response: AuthModel.SigninResponse;

    try {
      Http.setBaseUrl('');
      response = await Http.post<AuthModel.SigninResponse>('/onr-login', {
        data: payload.params,
      });
      Http.setBaseUrl('/api');
      sessionStorage.setItem('onr_id', `${response.id}`);
      sessionStorage.setItem('onr_token', response.token as string);
    } catch (error) {
      throw new Error(`Login Error: ${error.response.data.message}`);
    }

    return response;
  },

  logout: async () => {
    let response: AuthModel.SignoutResponse;
    try {
      // response = await Http.get<AuthModel.SignoutResponse>('/logout');
      response = {
        message: 'ok',
      };
      sessionStorage.removeItem('onr_id');
      sessionStorage.removeItem('onr_token');
    } catch (error) {
      throw new Error(`Login Error: ${error.message}`);
    }
    return response;
  },

  loginWithJWT: async (token: string) => {
    // TODO with jwt login
  },
};
