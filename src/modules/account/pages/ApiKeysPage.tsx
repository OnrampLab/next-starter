//#region Global Imports
import * as React from 'react';
import Head from 'next/head';
//#endregion Global Imports

//#region Interface Imports
import { ApiKeyList } from '@onr/account';
//#endregion Interface Imports

export class ApiKeysPage extends React.Component {
  public render(): JSX.Element {
    return (
      <>
        <Head>
          <link rel="stylesheet" href="/static/react-vis.css" />
        </Head>
        <ApiKeyList />
      </>
    );
  }
}

export default ApiKeysPage;
