import React, { useState } from 'react';
import { Divider, Spin, DatePicker, message } from 'antd';
import { Moment } from 'moment';
import { MarsPhotos, DemoService, IMarsPhoto } from '@onr/demo';

const getMarsPhotos = async (dateString: string) => {
  return await DemoService.getMarsPhotos({
    params: {
      earth_date: dateString,
      camera: 'NAVCAM',
    },
  }).catch(err => {
    throw err;
  });
};

export const MarsPhotosPage: React.FC = () => {
  const [marsPhotos, setMarsPhotos] = useState<IMarsPhoto[]>([]);
  const [loading, setLoading] = useState(false);

  const showMarsPhotos = async (_date: null | Moment, dateString: string) => {
    setLoading(true);
    try {
      const photos = await getMarsPhotos(dateString);
      setMarsPhotos(photos);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      Pick a date: <DatePicker onChange={showMarsPhotos} />
      <Divider />
      {marsPhotos.length > 0 && <MarsPhotos photos={marsPhotos} />}
      {loading && (
        <div className="flex">
          <Spin className="flex-auto" />
        </div>
      )}
    </>
  );
};
