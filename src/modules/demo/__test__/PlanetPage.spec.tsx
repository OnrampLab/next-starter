import { render, waitForElement, fireEvent } from '@testing-library/react';
import { Planet } from '../components';
import { IPlanetImage } from '../entities';
import thunkMiddleware from 'redux-thunk';
import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { DailyPlanetPage } from '../pages';
import { Provider } from 'react-redux';
import { demoReducer } from '../redux/reducers/demoReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Http } from '@onr/shared';
import nock from 'nock'

describe('PlanetPage component test', () => {
  beforeAll(() => {
    Http.setBaseUrl('http://localhost:3000/api')
  })
  beforeEach(() => {
    nock('http://localhost:3000')
      .get('/api/planetary/apod')
      .query({ api_key: 'NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo', hd: true })
      .reply(200, {
        copyright: "Pankod",
        date: "2019-05-23",
        explanation: "test",
        hdurl: "",
        media_type: "",
        service_version: "",
        title: "test",
        url: ""
      });
  })
  test('Render Component work fine', () => {
    const planetProps: IPlanetImage = {
      copyright: 'test',
      date: '2019/12/01',
      explanation: 'this is a planet explanation',
      hdurl: '',
      media_type: 'image',
      service_version: '200',
      title: 'planet title',
      url: '',
    };
    const result = render(<Planet image={planetProps}></Planet>);
    expect(() => result.getByTestId('planet-card')).toThrowError();
    result.getByTestId('planet-btn').click();
    expect(result.getByTestId('planet-card')).not.toBeUndefined();
  });

  test('Render Page Work fine', async () => {
    const mockFn = jest.fn()
    const store: any = createStore(combineReducers({ demoStore: (...arg ) => {mockFn();return demoReducer(...arg)} }), {}, composeWithDevTools(applyMiddleware(thunkMiddleware)));
    const result = render(
      <Provider store={store}>
        <DailyPlanetPage></DailyPlanetPage>
      </Provider>,
    );
    expect(mockFn).toBeCalled();
    await waitForElement(() => result.getByTestId('planet-btn'))
    fireEvent.click(result.getByTestId('planet-btn'));
    expect(result.getByTestId('planet-card')).not.toBeUndefined()
    expect(result.getAllByText('test').length).toBe(2)
  });
});
