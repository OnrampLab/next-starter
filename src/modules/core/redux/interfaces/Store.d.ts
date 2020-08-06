import { IAccount } from '@onr/account';
import { IUser } from '@onr/user';

export interface IStore {
  accountStore: {
    accounts: IAccount[];
  };
  authStore: {
    currentUser: IUser;
  };
}
