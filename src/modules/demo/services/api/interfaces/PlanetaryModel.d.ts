import { ApodPayload, IPlanetImage } from '@onr/demo';

/**
 * @module @interface PlanetaryModel
 */
declare namespace PlanetaryModel {
  export interface GetApodPayload {
    params: ApodPayload;
  }

  export interface GetApodResponse extends IPlanetImage {}
}
