import { IAccount } from '@onr/account';

export enum UserRoleName {
  SystemAdmin = 'system-admin',
  AccountAdmin = 'account-admin',
  AccountAnalyst = 'account-analyst',
}

export interface UserRole {
  created_at?: string;
  id?: number;
  name: string;
  updated_at?: string;
}

/**
 *
 * @export
 * @interface IUser
 */
export interface IUser {
  /**
   *
   * @type {number}
   * @memberof IUser
   */
  id?: number;

  /**
   *
   * @type {string}
   * @memberof IUser
   */
  name?: string;

  /**
   *
   * @type {string}
   * @memberof IUser
   */
  password?: string;

  /**
   *
   * @type {string}
   * @memberof IUser
   */
  email?: string;

  /**
   *
   * @type {string[]}
   * @memberof IUser
   */
  roles?: UserRole[];

  /**
   *
   * @type {IAccount[]}
   * @memberof IUser
   */
  accounts?: IAccount[];
}
