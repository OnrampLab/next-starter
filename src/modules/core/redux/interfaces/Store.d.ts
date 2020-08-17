import { IAccount } from '@onr/account';
import { IUser } from '@onr/user';
import { IWrapperPage } from '@onr/core';

export interface IStore {
  accountStore: {
    accounts: IAccount[];
  };
  authStore: {
    currentUser: IUser;
  };
  wrapper: IWrapperPage.IStateProps;
}
