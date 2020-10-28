import Adapter from 'enzyme-adapter-react-16';
import Axios from 'axios';
Axios.defaults.adapter = require('axios/lib/adapters/http');

require('enzyme').configure({ adapter: new Adapter() });

//env variables
require('dotenv').config({ path: '.env.test' });
