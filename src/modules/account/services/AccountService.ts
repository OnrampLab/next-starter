//#region Local Imports
import { Http } from '@onr/shared';
import { AccountModel } from '@onr/account';
import { IAccountApiKey, IAccount } from '../entities';
//#endregion Local Imports

export const AccountService = {
  getAccounts: async (
    payload: AccountModel.GetAccountsPayload,
  ): Promise<AccountModel.GetAccountsResponse> => {
    let response: AccountModel.GetAccountsResponse;

    try {
      response = await Http.get<AccountModel.GetAccountsResponse>(`/accounts`, {
        params: payload.params,
      });
    } catch (error) {
      console.log(error);
      throw new Error(`[AccountService] getAccounts Error: ${JSON.stringify(error)}`);
    }

    return response;
  },

  createAccount: async (payload: { data: any }): Promise<IAccount> => {
    let response: AccountModel.GetAccountResponse;

    try {
      response = await Http.post<AccountModel.GetAccountResponse>(`/accounts`, {
        data: payload.data,
      });
    } catch (error) {
      console.log(error);
      throw new Error(`[AccountService] createAccount Error: ${JSON.stringify(error)}`);
    }

    return response.data;
  },

  updateAccount: async (payload: { data: any; accountId: number }): Promise<IAccount> => {
    let response: AccountModel.GetAccountResponse;

    try {
      response = await Http.patch<AccountModel.GetAccountResponse>(
        `/accounts/${payload.accountId}`,
        {
          data: payload.data,
        },
      );
    } catch (error) {
      console.log(error);
      throw new Error(`[AccountService] updateAccount Error: ${JSON.stringify(error)}`);
    }

    return response.data;
  },

  deleteAccount: async (payload: { accountId: number }): Promise<IAccount> => {
    let response: AccountModel.GetAccountResponse;

    try {
      response = await Http.delete<AccountModel.GetAccountResponse>(
        `/accounts/${payload.accountId}`,
      );
    } catch (error) {
      console.log(error);
      throw new Error(`[AccountService] deleteAccount Error: ${JSON.stringify(error)}`);
    }

    return response;
  },

  getAccountApiKeys: async (payload: { accountId: number }): Promise<IAccountApiKey[]> => {
    let response: AccountModel.GetAccountApiKeysResponse;

    try {
      response = await Http.get<AccountModel.GetAccountApiKeysResponse>(
        `/accounts/${payload.accountId}/account-api-keys`,
      );
    } catch (error) {
      console.log(error);
      throw new Error(`[AccountService] getAccountApiKeys Error: ${JSON.stringify(error)}`);
    }

    return response.data;
  },

  createAccountApiKeys: async (payload: { accountId: number }): Promise<IAccountApiKey> => {
    let response: AccountModel.CreateAccountApiKeyResponse;

    try {
      response = await Http.post<AccountModel.CreateAccountApiKeyResponse>(
        `/accounts/${payload.accountId}/account-api-keys`,
      );
    } catch (error) {
      console.log(error);
      throw new Error(`[AccountService] createAccountApiKeys Error: ${JSON.stringify(error)}`);
    }

    return response.data;
  },

  deleteAccountApiKeys: async (payload: {
    accountId: number;
    accountApiKeyId: number;
  }): Promise<IAccountApiKey[]> => {
    let response: any;

    try {
      response = await Http.delete<any>(
        `/accounts/${payload.accountId}/account-api-keys/${payload.accountApiKeyId}`,
      );
    } catch (error) {
      console.log(error);
      throw new Error(`[AccountService] deleteAccountApiKeys Error: ${JSON.stringify(error)}`);
    }

    return response;
  },
};
