import { Http } from './Http';

describe('Http request tests', () => {
  test('200 test', async () => {
    const result = await Http.request<{ success: boolean }>('GET', '/200');
    expect(result.success).toEqual(true);
  });

  test('404 test', async () => {
    try {
      await Http.request('GET', '/404');
    } catch (error) {
      expect(error.status).toEqual(404);
    }
  });

  test('Catch test', async () => {
    try {
      await Http.request('GET', '');
    } catch (error) {
      expect(error.code).toBeUndefined();
    }
  });
});
