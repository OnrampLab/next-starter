import { IMarsCamera } from '@onr/demo';

/**
 *
 * @export
 * @interface IMarsPhoto
 */

export interface IMarsPhoto {
  /**
   *
   * @type {string}
   * @memberof IMarsPhoto
   */
  earth_date: string;

  /**
   *
   * @type {string}
   * @memberof IMarsPhoto
   */
  img_src: string;

  /**
   *
   * @type {IMarsCamera}
   * @memberof IMarsPhoto
   */
  camera: IMarsCamera;
}
