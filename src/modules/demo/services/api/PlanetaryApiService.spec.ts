import { PlanetaryApiService } from './PlanetaryApiService';
import { Http } from '@onr/shared';

describe('Planetary Service tests', () => {
  beforeAll(() => {
    Http.setBaseUrl('http://localhost:3000/api')
  })

  test('200 test', async () => {
    const result = await PlanetaryApiService.getPlanetImage({ params: { hd: true } });
    expect(result.copyright).toEqual('Pankod');
  });

  test('500 test', async () => {
    await expect(PlanetaryApiService.getPlanetImage({ params: { hd: false } }).catch(err => Promise.reject(err.message))).rejects.toMatch(/^\[PlanetaryApiService\] getPlanetImage Error/)
  });
});
