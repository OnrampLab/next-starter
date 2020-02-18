import { Http } from './Http';
import nock from 'nock';

describe('Axios request tests', () => {
  beforeAll(() => {
    Http.setBaseUrl('http://localhost:3000/api');
    nock('http://localhost:3000')
      .get('/api/200')
      .reply(200, { success: true });

    nock('http://localhost:3000')
      .get('/api/404')
      .reply(404, { success: false });
  });

  test('200 test', async () => {
    const result = await Http.request<{ success: boolean }>('get', '/200');
    expect(result.success).toEqual(true);
  });

  test('404 test', async () => {
    try {
      await Http.request('get', '/404');
    } catch (error) {
      expect(error).not.toBeUndefined();
    }
  });

  test('Catch test', async () => {
    try {
      await Http.request('get', '');
    } catch (error) {
      expect(error.code).toBeUndefined();
    }
  });
});
