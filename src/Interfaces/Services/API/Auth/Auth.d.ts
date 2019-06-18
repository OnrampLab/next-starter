import { LoginPayload, LoginResponse } from "@Interfaces";

/**
* @module @interface AuthModel
*/
declare module AuthModel {
    export interface SigninPayload {
        params: LoginPayload;
    }

	export interface SigninResponse extends LoginResponse { }
}
