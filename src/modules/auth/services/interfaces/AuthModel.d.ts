import { LoginPayload, LoginResponse } from '../interfaces';

/**
 * @module @interface AuthModel
 */
declare namespace AuthModel {
  export interface SigninPayload {
    data: LoginPayload;
  }

  export interface SigninResponse extends LoginResponse {}

  export interface SignoutResponse {
    message: string;
  }

  export interface IAuthContext {
    login: Function;
    logout: Function;
    data?: SigninResponse;
  }
}
