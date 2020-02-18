import getConfig from 'next/config';
import { stringify } from 'query-string';
import Axios from 'axios';

declare type RequestMethods =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH';

const {
  publicRuntimeConfig: { API_KEY } = { API_KEY: '' },
}: { publicRuntimeConfig: { API_KEY: string } } = getConfig();
// const { publicRuntimeConfig: { API_KEY } = {} } = getConfig() || {};
let BaseUrl = `/api`;

let headers = {
  'content-type': 'application/json',
  authorization: `Bearer ${API_KEY}`,
};

export const Http = {
  setBaseUrl: (url: string) => (BaseUrl = url),
  setHeader: (params: any) => (headers = params),
  request: async <A>(
    methodType: RequestMethods,
    url: string,
    params?: any,
    payload?: any,
  ): Promise<A> => {
    const query = params ? `?${stringify({ ...params, api_key: API_KEY })}` : '';

    return Axios(`${BaseUrl}${url}${query}`, {
      method: methodType,
      data: JSON.stringify(payload),
      headers,
    })
      .then(res =>
        res.status >= 200 && res.status <= 302 ? res.data : Promise.reject(res.statusText),
      )
      .catch(e => {
        throw e;
      });
  },
};
