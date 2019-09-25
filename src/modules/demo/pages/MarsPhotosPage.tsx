import React, { useState } from 'react';
import { Divider, Spin, DatePicker } from 'antd';
import { Moment } from 'moment';
import { MarsPhotos, DemoService, IMarsPhoto } from '@onr/demo';

const getMarsPhotos = async (dateString: string) => {
  return await DemoService.getMarsPhotos({
    params: {
      earth_date: dateString,
      camera: 'NAVCAM',
    },
  });
};

export const MarsPhotosPage: React.FC = () => {
  const [marsPhotos, setMarsPhotos] = useState<IMarsPhoto[]>([]);
  const [loading, setLoading] = useState(false);

  const showMarsPhotos = async (_date: null | Moment, dateString: string) => {
    setLoading(true);

    const photos = await getMarsPhotos(dateString);
    setMarsPhotos(photos);

    setLoading(false);
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
