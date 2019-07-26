import { connect } from 'react-redux';
import { Card } from 'antd';

const { Meta } = Card;

function Component(props) {
  const {
    home: {
      image = {},
    },
  } = props;

  return (
    <>
      {image && (
        <Card
          hoverable
          style={{ width: 480 }}
          cover={<img alt="example" src={image.url} />}
        >
          <Meta title={image.title} description={image.explanation} />
        </Card>
      )}
    </>
  );
}

const mapStateToProps = (state: IStore) => ({
  home: state.home,
});

export const Dashboard = connect(
	mapStateToProps,
)(Component);
