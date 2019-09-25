import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { demoActions, Planet, IPlanetImage, IDemoStore } from '@onr/demo';

export const DemoMainPage: React.FC = () => {
  const dispatch = useDispatch();
  const image: IPlanetImage = useSelector((store: IDemoStore) => store.demoStore.image);

  useEffect(() => {
    dispatch(
      demoActions.getPlanetImage({
        params: {
          hd: true,
        },
      }),
    );
  }, []);

  return (
    <>
      <Planet image={image} />
    </>
  );
};
