import { stringify } from 'qs';
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

interface IRequest {
  method: RequestMethods;
  url: string;
  params?: any;
  data?: any;
}

const apiKey = process.env.API_KEY;
let BaseUrl = `/api`;

let headers = {
  'content-type': 'application/json',
  authorization: `Bearer ${apiKey}`,
};

export const Http = {
  setBaseUrl: (url: string) => (BaseUrl = url),

  setHeader: (params: any) => (headers = params),

  request: async <A>({ method, url, params = {}, data = {} }: IRequest): Promise<A> => {
    const query =
      Object.keys(params).length > 0
        ? `?${stringify({ ...params, api_key: apiKey }, { encode: false })}`
        : '';

    const res = await Axios(`${BaseUrl}${url}${query}`, {
      method: method,
      data: JSON.stringify(data),
      headers,
    });

    return res.status >= 200 && res.status <= 302 ? res.data : Promise.reject(res.data?.message);
  },

  get: async <A>(url: string, { params = {} } = {}): Promise<A> => {
    return Http.request({ method: 'GET', url, params });
  },

  post: async <A>(url: string, { params = {}, data = {} } = {}): Promise<A> => {
    return Http.request({ method: 'POST', url, params, data });
  },
};
