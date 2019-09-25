//#region Local Imports
import { Http } from '@onr/shared';
import { PlanetaryModel } from './interfaces';
//#endregion Local Imports

export const PlanetaryApiService = {
  getPlanetImage: async (
    payload: PlanetaryModel.GetApodPayload,
  ): Promise<PlanetaryModel.GetApodResponse> => {
    let response: PlanetaryModel.GetApodResponse;

    try {
      response = await Http.request<PlanetaryModel.GetApodResponse>(
        'GET',
        '/planetary/apod',
        payload.params,
      );
    } catch (error) {
      console.log(error);
      throw new Error(`[PlanetaryApiService] getPlanetImage Error: ${JSON.stringify(error)}`);
    }

    return response;
  },

  getMarsPhotos: async (
    payload: PlanetaryModel.GetMarsPhotosPayload,
  ): Promise<PlanetaryModel.GetMarsPhotosResponse> => {
    let response: PlanetaryModel.GetMarsPhotosResponse;

    try {
      response = await Http.request<PlanetaryModel.GetMarsPhotosResponse>(
        'GET',
        '/mars-photos/api/v1/rovers/curiosity/photos',
        payload.params,
      );
    } catch (error) {
      console.log(error);
      throw new Error(`[PlanetaryApiService] getMarsPhotos Error: ${JSON.stringify(error)}`);
    }

    return response;
  },
};
