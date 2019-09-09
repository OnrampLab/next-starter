import { LoginPayload, LoginResponse } from '@Interfaces';

/**
 * @module @interface AuthModel
 */
declare namespace AuthModel {
  export interface SigninPayload {
    params: LoginPayload;
  }

  export interface SigninResponse extends LoginResponse {}
}
