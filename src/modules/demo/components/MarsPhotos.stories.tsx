import React from 'react';
import { MarsPhotos, IMarsPhoto } from '@onr/demo';

export default {
  title: 'MarsPhotos',
};

const photos: IMarsPhoto[] = [
  {
    img_src: 'https://sw.onramplab.com/pma/themes/pmahomme/img/logo_right.png',
    earth_date: '2019-09-01',
    camera: {
      name: 'Test',
      full_name: 'Test Camera',
    },
  },
];

export const marsPhotos = () => <MarsPhotos photos={photos} />;
