import React, { useState } from 'react';
import { Card, Button, Divider } from 'antd';
import { IPlanetImage } from '@onr/demo';

interface IPlanetProps {
  image: IPlanetImage;
}

interface ICoverImageProps extends IPlanetProps {}

const { Meta } = Card;

const CoverImage: React.FC<ICoverImageProps> = ({ image }: ICoverImageProps) => {
  return <img alt="example" src={image.url} />;
};

export const Planet: React.FC<IPlanetProps> = ({ image }: IPlanetProps) => {
  const [detailVisible, setDetailVisible] = useState(false);

  return (
    <>
      <Button data-testid="planet-btn" onClick={() => setDetailVisible(!detailVisible)}>
        Toggle Daily Planet Detail
      </Button>
      <Divider />
      {detailVisible && (
        <Card
          hoverable
          className="max-w-lg"
          data-testid="planet-card"
          cover={<CoverImage image={image} />}
        >
          <Meta title={image.title} description={image.explanation} />
        </Card>
      )}
    </>
  );
};