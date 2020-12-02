import { stringify } from 'qs';
import Axios from 'axios';
import getConfig from 'next/config';
import { HttpModel } from './interfaces';

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

interface IRequest {
  method: RequestMethods;
  url: string;
  params?: any;
  data?: any;
}

const { publicRuntimeConfig } = getConfig();

export const Http = {
  baseUrl: `${publicRuntimeConfig.processEnv.API_URL}/api`,
  apiToken: publicRuntimeConfig.processEnv.API_KEY,

  setBaseUrl: (url: string) => (Http.baseUrl = url),

  setToken(token: string) {
    Http.apiToken = token;
  },

  request: async <A>({
    method,
    url,
    params = {},
    data = {},
  }: IRequest): Promise<HttpModel.IResponse<A>> => {
    try {
      const query =
        Object.keys(params).length > 0 ? `?${stringify(params, { encode: false })}` : '';
      const apiUrl = `${Http.baseUrl}${url}${query}`;

      const res = await Axios(apiUrl, {
        method: method,
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${Http.apiToken}`,
        },
        data: JSON.stringify(data),
      });

      if (res.status >= 200 && res.status <= 302) {
        return res.data;
      } else {
        throw new Error(res.data?.message);
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  },

  get: async <A>(url: string, { params = {} } = {}): Promise<HttpModel.IResponse<A>> => {
    return Http.request({ method: 'GET', url, params });
  },

  post: async <A>(
    url: string,
    { params = {}, data = {} } = {},
  ): Promise<HttpModel.IResponse<A>> => {
    return Http.request({ method: 'POST', url, params, data });
  },

  patch: async <A>(
    url: string,
    { params = {}, data = {} } = {},
  ): Promise<HttpModel.IResponse<A>> => {
    return Http.request({ method: 'PATCH', url, params, data });
  },

  put: async <A>(url: string, { params = {}, data = {} } = {}): Promise<HttpModel.IResponse<A>> => {
    return Http.request({ method: 'PUT', url, params, data });
  },

  delete: async <A>(url: string, { params = {} } = {}): Promise<HttpModel.IResponse<A>> => {
    return Http.request({ method: 'DELETE', url, params });
  },
};
