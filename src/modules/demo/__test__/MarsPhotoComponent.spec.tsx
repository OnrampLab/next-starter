import * as React from 'react';
import { render } from '@testing-library/react';
import { MarsPhotos } from '../components';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('MarsPhoto component test', () => {
  test('hook normally', () => {
    const result = render(<MarsPhotos photos={[]}></MarsPhotos>);
    expect(result.findByTestId('row')).not.toBeUndefined();
  });
});
