import { ApodPayload, MarsPayload, IPlanetImage, IMarsPhoto } from '@onr/demo';

/**
 * @module @interface PlanetaryModel
 */
declare namespace PlanetaryModel {
  export interface GetApodPayload {
    params: ApodPayload;
  }

  export interface GetApodResponse extends IPlanetImage {}

  export interface GetMarsPhotosPayload {
    params: MarsPayload;
  }

  export interface GetMarsPhotosResponse {
    photos: IMarsPhoto[];
  }
}
