/**
 *
 * @export
 * @interface IAccountApiKey
 */

export interface IAccountApiKey {
  /**
   *
   * @type {number}
   * @memberof IAccountApiKey
   */
  id?: number;

  /**
   *
   * @type {number}
   * @memberof IAccountApiKey
   */
  account_id: number;

  /**
   *
   * @type {string}
   * @memberof IAccountApiKey
   */
  token: string;

  /**
   *
   * @type {string}
   * @memberof IAccountApiKey
   */
  created_at: string;

  /**
   *
   * @type {string}
   * @memberof IAccountApiKey
   */
  updated_at: string;
}
