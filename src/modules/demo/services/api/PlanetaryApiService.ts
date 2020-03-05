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
      response = await Http.get<PlanetaryModel.GetApodResponse>('/planetary/apod', {
        params: payload.params,
      });
    } catch (error) {
      console.error(error);
      throw new Error(`[PlanetaryApiService] getPlanetImage Error: ${JSON.stringify(error)}`);
    }

    return response;
  },

  getMarsPhotos: async (
    payload: PlanetaryModel.GetMarsPhotosPayload,
  ): Promise<PlanetaryModel.GetMarsPhotosResponse> => {
    let response: PlanetaryModel.GetMarsPhotosResponse;

    try {
      response = await Http.get<PlanetaryModel.GetMarsPhotosResponse>(
        '/mars-photos/api/v1/rovers/curiosity/photos',
        {
          params: payload.params,
        },
      );
    } catch (error) {
      console.error(error);
      throw new Error(`[PlanetaryApiService] getMarsPhotos Error: ${JSON.stringify(error)}`);
    }

    return response;
  },
};
