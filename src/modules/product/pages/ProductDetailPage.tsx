import React, { useState } from 'react';
import { DailyPlanetPage } from '@onr/demo';
import { Spin } from 'antd';

export const ProductDetailPage: React.FC = () => {
  const [done, setDone] = useState(false);

  setTimeout(() => {
    console.log('Done');
    setDone(true);
  }, 5000);

  return (
    <>
      <h1>Detail Works!</h1>

      <Spin tip="Loading" spinning={!done}>
        <DailyPlanetPage />
      </Spin>
    </>
  );
};
