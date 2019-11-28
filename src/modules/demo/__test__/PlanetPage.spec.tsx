import { render } from '@testing-library/react';
import { Planet } from '../components';
import { IPlanetImage } from '../entities';
import React from 'react'

describe('PlanetPage component test', () => {
  test('Render hook work fine', () => {
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
});
