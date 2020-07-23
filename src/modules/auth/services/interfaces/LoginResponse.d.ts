/**
 *
 * @export
 * @interface LoginResponse
 */

export interface LoginResponse {
  /**
   *
   * @type {number|null}
   * @memberof LoginResponse
   */
  expires_in: number;

  /**
   *
   * @type {string|null}
   * @memberof LoginResponse
   */
  access_token: string;

  /**
   *
   * @type {string|null}
   * @memberof LoginResponse
   */
  token_type: string;

  /**
   *
   * @type {string|null}
   * @memberof LoginResponse
   */
  email: string;
}
