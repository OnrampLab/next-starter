import { IStore } from '@onr/core';
import { IPlanetImage } from '@onr/demo/entities';

export interface IDemoStore extends IStore {
  demoStore: {
    image: IPlanetImage;
  };
}
