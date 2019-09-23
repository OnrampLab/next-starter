import 'isomorphic-unfetch';
import getConfig from 'next/config';
import { stringify } from 'query-string';

import { HttpModel } from './interfaces';

/**
 * @module Http
 */

const { publicRuntimeConfig: { API_KEY, API_URL } = {} } = getConfig();

const BaseUrl = `${API_URL}/api`;

export const Http = {
  request: async <A>(
    methodType: string,
    url: string,
    params?: HttpModel.IRequestQueryPayload,
    payload?: HttpModel.IRequestPayload,
  ): Promise<A> => {
    return new Promise((resolve, reject) => {
      const query = params ? `?${stringify({ ...params, api_key: API_KEY })}` : '';

      fetch(`${BaseUrl}${url}${query}`, {
        body: JSON.stringify(payload),
        cache: 'no-cache',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${API_KEY}`,
        },
        method: `${methodType}`,
      })
        .then(async response => {
          switch (response.status) {
            case 200:
              return response.json().then(resolve);
            default:
              return reject(response);
          }
        })
        .catch(e => {
          reject(e);
        });
    });
  },
};
