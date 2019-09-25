/**
 *
 * @export
 * @interface IMarsCamera
 */

export interface IMarsCamera {
  /**
   *
   * @type {number}
   * @memberof IMarsCamera
   */
  id?: number;

  /**
   *
   * @type {string}
   * @memberof IMarsCamera
   */
  name: string;

  /**
   *
   * @type {string}
   * @memberof IMarsCamera
   */
  full_name: string;

  /**
   *
   * @type {number}
   * @memberof IMarsCamera
   */
  rover_id?: number;
}
