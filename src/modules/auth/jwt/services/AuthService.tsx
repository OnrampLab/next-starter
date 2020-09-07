import { Http, HttpModel } from '@onr/shared';
import { IUser } from '@onr/user';
import { AuthModel } from './interfaces';
import { AuthService as AuthCoreService } from '@onr/auth/core';

export const AuthService = {
  ...AuthCoreService, 
  loginWithJWT: async (token: string) => {
    try {
      Http.setToken(token);

      const response: HttpModel.IResponse<AuthModel.SigninResponse> = await Http.post<
        AuthModel.SigninResponse
      >('/auth/refresh');

      Http.setToken(response.data.access_token);

      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
