import Adapter from 'enzyme-adapter-react-16';

require('enzyme').configure({ adapter: new Adapter() });

//env variables
require('dotenv').config({ path: '.env.test' });

import { setConfig } from 'next/config';
setConfig({
  publicRuntimeConfig: {
    processEnv: process.env,
  },
});
