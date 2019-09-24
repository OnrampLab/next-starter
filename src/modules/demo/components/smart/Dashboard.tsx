import * as React from 'react';
import { connect } from 'react-redux';
import { Card } from 'antd';
import { IStore } from '@onr/core';

interface Props {
  demoStore: any;
}

const { Meta } = Card;

const MyImage: React.FC = ({ image }) => {
  return <img alt="example" src={image.url} />;
};

const Component: React.FC<Props> = (props: Props) => {
  const {
    demoStore: { image = {} },
  } = props;

  return (
    <>
      {image && (
        <Card hoverable className="max-w-lg" cover={<MyImage image={image} />}>
          <Meta title={image.title} description={image.explanation} />
        </Card>
      )}
    </>
  );
};

const mapStateToProps = (state: IStore) => ({
  demoStore: state.demoStore,
});

export const Dashboard = connect(mapStateToProps)(Component);
