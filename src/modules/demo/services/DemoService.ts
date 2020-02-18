import { PlanetaryModel, PlanetaryApiService, IMarsPhoto } from '@onr/demo';

export class DemoService {
  static async getPlanetImage(
    payload: PlanetaryModel.GetApodPayload,
  ): Promise<PlanetaryModel.GetApodResponse> {
    return PlanetaryApiService.getPlanetImage(payload);
  }

  static async getMarsPhotos(payload: PlanetaryModel.GetMarsPhotosPayload): Promise<IMarsPhoto[]> {
    try {
      const response = await PlanetaryApiService.getMarsPhotos(payload);
      return response.photos;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
