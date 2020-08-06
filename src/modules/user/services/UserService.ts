//#region Local Imports
import { Http } from '@onr/shared';
import { IUser } from '@onr/user';
import { UserModel } from './interfaces';
//#endregion Local Imports

export const UserService = {
  getUsers: async (payload: UserModel.GetUsersPayload): Promise<IUser[]> => {
    try {
      const response = await Http.get<IUser[]>(`/users`, {
        params: payload.params,
      });

      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(`[UserService] getUsers Error: ${JSON.stringify(error)}`);
    }
  },

  getUser: async (payload: UserModel.GetUserPayload): Promise<UserModel.GetUserResponse> => {
    try {
      const response = await Http.get<UserModel.GetUserResponse>(`/users/${payload.userId}`);

      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(`[UserService] getUser Error: ${JSON.stringify(error)}`);
    }
  },

  createUser: async (payload: UserModel.CreateUserPayload): Promise<UserModel.GetUserResponse> => {
    try {
      const response = await Http.post<UserModel.GetUserResponse>(`/users`, {
        data: payload.data,
      });

      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(`[UserService] createUser Error: ${JSON.stringify(error)}`);
    }
  },

  updateUser: async (payload: UserModel.UpdateUserPayload): Promise<UserModel.GetUserResponse> => {
    try {
      const response = await Http.patch<UserModel.GetUserResponse>(`/users/${payload.userId}`, {
        data: payload.data,
      });

      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(`[UserService] updateUser Error: ${JSON.stringify(error)}`);
    }
  },

  deleteUser: async (payload: UserModel.DeleteUserPayload): Promise<UserModel.GetUserResponse> => {
    try {
      const response = await Http.delete<UserModel.GetUserResponse>(`/users/${payload.userId}`);

      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(`[UserService] deleteUser Error: ${JSON.stringify(error)}`);
    }
  },
};
