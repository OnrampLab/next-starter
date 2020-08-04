//#region Global Imports
import * as React from 'react';
import Head from 'next/head';
//#endregion Global Imports

//#region Interface Imports
import { UserListPage } from '@onr/user';
//#endregion Interface Imports

export class UserPage extends React.Component {
  public render(): JSX.Element {
    return (
      <>
        <Head>
          <link rel="stylesheet" href="/static/react-vis.css" />
        </Head>
        <UserListPage />
      </>
    );
  }
}

export default UserPage;
