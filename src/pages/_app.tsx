import { makeServer } from '../server/mirage';

if (process.env.NODE_ENV === 'development' && process.env.API_URL === '/mirage') {
  makeServer({ environment: 'development' });
}

import { MyApp } from '@app';

export default MyApp;
