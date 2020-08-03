import { UserRequestQueryPayload, UserResponse, UsersResponse, UserRequestPayload } from '.';

/**
 * @module @interface UserModel
 */
declare namespace UserModel {
  export interface GetUsersPayload {
    params?: UserRequestQueryPayload;
  }

  export interface GetUserPayload extends GetUsersPayload {
    userId: number;
  }

  export interface CreateUserPayload extends UserRequestPayload {}

  export interface UpdateUserPayload extends UserRequestPayload {
    userId: number;
  }

  export interface DeleteUserPayload {
    userId: number;
  }

  export interface GetUserResponse extends UserResponse {}
  export interface GetUsersResponse extends UsersResponse {}
}
