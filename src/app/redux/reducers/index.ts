import { combineReducers } from 'redux';

import { WrapperReducer } from './wrapper';
import { reducers as demoReducers } from 'demo';

export default combineReducers({
  wrapper: WrapperReducer,
  ...demoReducers,
});
