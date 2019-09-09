//#region Local Imports
import { Http } from 'shared';
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
      response = {
        copyright: '',
        date: '',
        explanation: '',
        hdurl: '',
        service_version: '',
        title: '',
        url: '',
      };
    }

    return response;
  },
};
