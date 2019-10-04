import React, { useState, useEffect } from 'react';
import { DailyPlanetPage } from '@onr/demo';
import { message, Spin } from 'antd';

export const ProductDetailPage: React.FC = () => {
  const [done, setDone] = useState(false);

  console.log('Render!!');

  useEffect(() => {
    setTimeout(() => {
      console.log('Done!!');

      message.success('Done');
      setDone(true);
    }, 1000);
  }, []);

  return (
    <>
      <h1>Detail Works!</h1>

      <Spin tip="Loading" spinning={!done}>
        <DailyPlanetPage />
      </Spin>
    </>
  );
};
