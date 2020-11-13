import { Http, HttpModel } from '@onr/shared';
import { AuthService as AuthCoreService } from '@onr/auth/core';
import { AuthModel } from '@onr/auth';

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
