//#region Global Imports
import * as React from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
//#endregion Global Imports

//#region Interface Imports
import { IHomePage, IStore } from '@Interfaces';
//#endregion Interface Imports

export class HomePage extends React.Component<IHomePage.IProps, IHomePage.IState> {
  constructor(props: IHomePage.IProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <>
        <Head>
          <link rel="stylesheet" href="/static/react-vis.css" />
        </Head>
      </>
    );
  }
}

const mapStateToProps = (state: IStore) => state.home;

export default connect(mapStateToProps)(HomePage);
