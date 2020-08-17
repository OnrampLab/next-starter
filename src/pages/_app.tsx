import { makeServer } from '@onr/shared/mirage/mirage';

if (process.env.NODE_ENV === 'development' && process.env.ENABLE_MIRAGE === 'true') {
  makeServer({ environment: 'development' });
}

import { MyApp } from '@app';

export default MyApp;
