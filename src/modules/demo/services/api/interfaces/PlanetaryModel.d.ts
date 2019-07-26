import { ApodPayload, ApodResponse } from '.';

/**
 * @module @interface PlanetaryModel
 */
declare namespace PlanetaryModel {
  export interface GetApodPayload {
    params: ApodPayload;
  }

  export interface GetApodResponse extends ApodResponse {}
}
