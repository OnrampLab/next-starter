import { stringify } from 'qs';
import Axios from 'axios';
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

let BaseUrl = `${process.env.API_URL}/api`;

export const Http = {
  apiToken: process.env.API_KEY,

  setBaseUrl: (url: string) => (BaseUrl = url),

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
      const query = Object.keys(params).length > 0 ? `?${stringify(params, { encode: false })}` : '';
      const apiUrl = `${BaseUrl}${url}${query}`;

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
