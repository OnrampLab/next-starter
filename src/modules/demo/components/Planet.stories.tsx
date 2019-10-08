import React from 'react';
import { Planet, IPlanetImage } from '@onr/demo';

export default {
  title: 'Planet',
};

const image: IPlanetImage = {
  copyright: 'Stephane VetterTWAN',
  date: '2019-10-08',
  explanation: 'This phenomenon occurs in the sky over our heads, not the sea.',
  hdurl: 'https://apod.nasa.gov/apod/image/1910/SpritesHD_Vetter_1000.jpg',
  media_type: 'image',
  service_version: 'v1',
  title: 'Sprite Lightning in HD',
  url: 'https://apod.nasa.gov/apod/image/1910/SpritesHD_Vetter_1000.jpg',
};

export const marsPhotos = () => <Planet image={image} />;
