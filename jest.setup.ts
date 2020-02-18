import Adapter from 'enzyme-adapter-react-16';

require('enzyme').configure({ adapter: new Adapter() })

//env variables
require('dotenv').config({ path: '.env.test' })
