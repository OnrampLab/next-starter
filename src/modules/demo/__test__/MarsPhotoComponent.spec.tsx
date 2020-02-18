import * as React from 'react';
import { render } from '@testing-library/react';
import { MarsPhotos } from '../components';

describe('MarsPhoto component test', () => {
  test('hook normally', () => {
    const result = render(<MarsPhotos photos={[]}></MarsPhotos>);
    expect(result.findByTestId('row')).not.toBeUndefined();
  });
});
