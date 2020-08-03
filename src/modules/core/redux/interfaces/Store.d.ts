import { IAccount } from '@onr/account';

export interface IStore {
  accountStore: {
    accounts: IAccount[];
  };
}
