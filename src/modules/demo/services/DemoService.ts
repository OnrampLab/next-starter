import { PlanetaryModel, PlanetaryApiService } from 'demo';

export class DemoService {
  static async getPlanetImage(
    payload: PlanetaryModel.GetApodPayload,
  ): Promise<PlanetaryModel.GetApodResponse> {
    return PlanetaryApiService.getPlanetImage(payload);
  }
}
