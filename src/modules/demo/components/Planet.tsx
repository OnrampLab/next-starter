import * as React from 'react';
import { Card } from 'antd';
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
  return (
    <>
      {image && (
        <Card hoverable className="max-w-lg" cover={<CoverImage image={image} />}>
          <Meta title={image.title} description={image.explanation} />
        </Card>
      )}
    </>
  );
};
