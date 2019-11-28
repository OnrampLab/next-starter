import { PlanetaryApiService } from './PlanetaryApiService';
import { Http } from '@onr/shared';
import nock from 'nock'

describe('Planetary Service tests', () => {
  beforeAll(() => {
    Http.setBaseUrl('http://localhost:3000/api')
  })

  beforeEach(() => {
    nock('http://localhost:3000')
      .persist()
      .get('/api/planetary/apod')
      .query({ api_key: 'NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo', hd: true })
      .reply(200, {
        copyright: "Pankod",
        date: "2019-05-23",
        explanation: "test",
        hdurl: "",
        media_type: "",
        service_version: "",
        title: "test",
        url: ""
      });
    nock('http://localhost:3000')
      .get('/api/planetary/apod')
      .query({ api_key: 'NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo', hd: false })
      .reply(500);
  })

  test('200 test', async () => {
    const result = await PlanetaryApiService.getPlanetImage({ params: { hd: true } });
    expect(result.copyright).toEqual('Pankod');
  });

  test('500 test', async () => {
    await expect(PlanetaryApiService.getPlanetImage({ params: { hd: false } }).catch(err => Promise.reject(err.message))).rejects.toMatch(/^\[PlanetaryApiService\] getPlanetImage Error/)
  });
});
