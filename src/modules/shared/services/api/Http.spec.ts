import { Http } from './Http';
import nock from 'nock';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'content-Type': 'application/json',
  'access-control-allow-headers': 'Authorization',
};
describe('Axios request tests', () => {
  beforeAll(() => {
    Http.setBaseUrl('http://localhost:3000/api');
    nock('http://localhost:3000')
      .intercept('/api/200', 'OPTIONS')
      .reply(200, undefined, headers)
      .intercept('/api/404', 'OPTIONS')
      .reply(200, undefined, headers)
      .intercept('/api', 'OPTIONS')
      .reply(200, undefined, headers)
      .get('/api/200')
      .reply(200, { success: true })
      .get('/api/404')
      .reply(404, { success: false });
  });

  test('200 test', async () => {
    const result = await Http.request<{ success: boolean }>({
      method: 'get',
      url: '/200',
    });
    expect(result.success).toEqual(true);
  });

  test('404 test', async () => {
    try {
      await Http.request({
        method: 'get',
        url: '/404',
      });
    } catch (error) {
      expect(error).not.toBeUndefined();
    }
  });

  test('Catch test', async () => {
    try {
      await Http.request({
        method: 'get',
        url: '',
      });
    } catch (error) {
      expect(error.code).toBeUndefined();
    }
  });
});
