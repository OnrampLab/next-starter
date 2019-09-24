import { Http } from '@onr/shared';
import { AuthModel } from './interfaces';

export const AuthService = {
  login: async (payload: AuthModel.SigninPayload): Promise<AuthModel.SigninResponse> => {
    let response: AuthModel.SigninResponse;

    try {
      response = await Http.request<AuthModel.SigninResponse>('POST', '/login', payload.params);
    } catch (error) {
      throw new Error(`Login Error: ${error}`);
    }

    return response;
  },
};
