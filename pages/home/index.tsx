import * as React from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import { bindActionCreators, Dispatch } from 'redux';
import { HomeActions } from '@Actions';
import { Dashboard } from '@Components';

import { IHomePage, IStore } from '@Interfaces';

class HomePage extends React.Component<IHomePage.IProps, IHomePage.IState> {
  constructor(props: IHomePage.IProps) {
    super(props);
  }

  componentDidMount() {
    const { getApod } = this.props;

    getApod({
      params: {
        hd: true,
      }
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

const mapStateToProps = (state: IStore) => ({
  home: state.home,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	getApod: bindActionCreators(HomeActions.getApod, dispatch),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(HomePage);
