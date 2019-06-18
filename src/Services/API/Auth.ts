//#region Local Imports
import { Http } from '@Services';
import { AuthModel } from "@Interfaces";
//#endregion Local Imports


export const AuthService = {
  login: async (payload: AuthModel.SigninPayload): Promise<AuthModel.SigninResponse> => {
    let response: AuthModel.SigninResponse;

    try {
      response = await Http.request<AuthModel.SigninResponse>(
        'POST',
        '/login',
        payload.params
      );
    } catch (error) {
      throw new Error(`Login Error: ${error}`);
    }

    return response;
  }
}
