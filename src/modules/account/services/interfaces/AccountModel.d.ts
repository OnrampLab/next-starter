import { AccountsPayload, AccountsResponse } from '.';
import { IAccount, IAccountApiKey } from '@onr/account/entities';

/**
 * @module @interface AccountModel
 */
declare namespace AccountModel {
  export interface GetAccountsPayload {
    params: AccountsPayload;
  }

  export interface GetAccountsResponse extends AccountsResponse {}
  export interface GetAccountResponse {
    data: IAccount;
  }

  export interface GetAccountApiKeysResponse {
    data: IAccountApiKey[];
  }

  export interface CreateAccountApiKeyResponse {
    data: IAccountApiKey;
  }
}
