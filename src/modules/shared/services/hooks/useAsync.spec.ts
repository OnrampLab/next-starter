import nock from 'nock';
import { renderHook, act } from '@testing-library/react-hooks';
import { useAsync } from './useAsync';
import { Http } from '../api';

describe('Test useAsync work', () => {
  beforeAll(() => {
    Http.setBaseUrl('http://localhost:3000/api');
  });
  beforeEach(() => {
    nock('http://localhost:3000/api')
      .get('/ok')
      .delay(100)
      .reply(200, {
        message: 'success',
        data: {},
      });
    nock('http://localhost:3000/api')
      .get('/error')
      .delay(100)
      .reply(404, {
        message: 'failed',
      });
  });
  test('basic work', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useAsync({ callback: async () => Http.request({ url: '/ok', method: 'get' }) }),
    );
    expect(result.current.fetchingState).toBe(false);
    await act(async () => {
      result.current.requestMethod();
      await waitForNextUpdate();
      expect(result.current.fetchingState).toBe(true);
      await waitForNextUpdate();
      expect(result.current.fetchingState).toBe(false);
    });
  });

  test('Initial state should work', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useAsync({
        callback: async () => Http.request({ url: '/ok', method: 'get' }),
        initState: true,
      }),
    );
    expect(result.current.fetchingState).toBe(true);
    await act(async () => {
      result.current.requestMethod();
      await waitForNextUpdate();
      expect(result.current.fetchingState).toBe(false);
    });
  });

  test('use dispatch fn should work', async () => {
    const fn = jest.fn();
    const { result, waitForNextUpdate } = renderHook(() =>
      useAsync({
        callback: async () => Http.request({ url: '/ok', method: 'get' }),
        dispatchFn: fn,
      }),
    );
    await act(async () => {
      result.current.requestMethod();
      await waitForNextUpdate();
      expect(result.current.fetchingState).toBe(true);
      await waitForNextUpdate();
      expect(result.current.fetchingState).toBe(false);
      expect(fn).toBeCalled();
    });
  });

  test('After request failed, fetching state should false', async () => {
    const fn = jest.fn();
    const { result } = renderHook(() =>
      useAsync({
        callback: async () => Http.request({ url: '/error', method: 'get' }),
      }),
    );
    await act(async () => {
      try {
        await result.current.requestMethod();
        fn();
        expect(fn).not.toBeCalled();
      } catch (error) {
        expect(error).not.toBeUndefined();
      }
      expect(result.current.fetchingState).toBe(false);
    });
  });

  test('unmount should not affect state update', async () => {
    const fn = jest.fn();
    const { result, unmount, waitForNextUpdate } = renderHook(() =>
      useAsync({
        callback: async () => Http.request({ url: '/ok', method: 'get' }),
        dispatchFn: fn,
      }),
    );
    const sleep = async (t: number) => new Promise(res => setTimeout(res, t));
    await act(async () => {
      result.current.requestMethod();
      await waitForNextUpdate();
      expect(result.current.fetchingState).toBe(true);
      unmount();
      await sleep(200);
      expect(fn).not.toBeCalled();
    });
  });
});
