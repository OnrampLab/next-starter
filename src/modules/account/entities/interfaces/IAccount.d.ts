/**
 *
 * @export
 * @interface IAccount
 */

export interface IAccount {
  /**
   *
   * @type {number}
   * @memberof IAccount
   */
  id?: number;

  /**
   *
   * @type {string}
   * @memberof IAccount
   */
  name: string;

  /**
   *
   * @type {string}
   * @memberof IAccount
   */
  redirect_domain: string;

  /**
   *
   * @type {string}
   * @memberof IAccount
   */
  logo: string;

  /**
   *
   * @type {string}
   * @memberof IAccount
   */
  signature: string;

  /**
   *
   * @type {string}
   * @memberof IAccount
   */
  address: string;

  /**
   *
   * @type {bool}
   * @memberof IAccount
   */
  email_validation_enabled: bool;
}
