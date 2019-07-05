import { Http } from '@Services';
import { PlanetaryModel } from '@Interfaces';

export const PlanetaryService = {
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
