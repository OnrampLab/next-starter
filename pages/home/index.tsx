import * as React from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import { bindActionCreators, Dispatch } from 'redux';
import { demoActions, Dashboard } from '@onr/demo';

import { IStore } from '@onr/core';

class HomePage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    const { getPlanetImage } = this.props;

    getPlanetImage({
      params: {
        hd: true,
      },
    });
  }

  public render(): JSX.Element {
    return (
      <>
        <Head>
          <link rel="stylesheet" href="/static/react-vis.css" />
        </Head>
        <Dashboard />
      </>
    );
  }
}

const mapStateToProps = (state: IStore) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getPlanetImage: bindActionCreators(demoActions.getPlanetImage, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
