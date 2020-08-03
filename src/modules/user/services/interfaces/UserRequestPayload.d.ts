import { UserRoleName } from '@onr/user';

/**
 *
 * @export
 * @interface UserRequestPayload
 */

export interface UserRequestPayload {
  /**
   *
   * @type {array|undefined}
   * @memberof UserRequestPayload
   */
  data: {
    password?: string;
    name: string;
    email: string;
    roles: UserRoleName[];
    accounts: number[]; // only need to pass account ids
  };
}
