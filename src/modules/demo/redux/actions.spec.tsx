import { actionConsts, demoActions } from '@onr/demo';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Http } from '@onr/shared';
import nock from 'nock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const headers = {
  'Access-Control-Allow-Origin': '*',
  'content-Type': 'application/json',
  'access-control-allow-headers': 'Authorization',
};

describe('Home action tests', () => {
  beforeAll(() => {
    Http.setBaseUrl('http://localhost:3000/api');
  });
  beforeEach(() => {
    nock('http://localhost:3000')
      .persist()
      .intercept('/api/planetary/apod', 'OPTIONS')
      .query(true)
      .reply(200, undefined, headers)
      .get('/api/planetary/apod')
      .query({ hd: true })
      .reply(200, {
        copyright: 'Pankod',
        date: '2019-05-23',
        explanation: '',
        hdurl: '',
        media_type: '',
        service_version: '',
        title: '',
        url: '',
      });
  });
  test('getApod test', async () => {
    const store = mockStore({});

    const expectedActions = [
      {
        payload: {
          image: {
            copyright: 'Pankod',
            date: '2019-05-23',
            explanation: '',
            hdurl: '',
            media_type: '',
            service_version: '',
            title: '',
            url: '',
          },
        },
        type: actionConsts.demo.setPlanetImage,
      },
    ];

    // eslint-disable-next-line
    await store.dispatch<any>(demoActions.getPlanetImage({ params: { hd: true } }));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
