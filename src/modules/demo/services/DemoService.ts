import { PlanetaryModel, PlanetaryApiService, IMarsPhoto } from '@onr/demo';

export class DemoService {
  static async getPlanetImage(
    payload: PlanetaryModel.GetApodPayload,
  ): Promise<PlanetaryModel.GetApodResponse> {
    return PlanetaryApiService.getPlanetImage(payload);
  }

  static async getMarsPhotos(payload: PlanetaryModel.GetMarsPhotosPayload): Promise<IMarsPhoto[]> {
    const response = await PlanetaryApiService.getMarsPhotos(payload);

    return response.photos;
  }
}
