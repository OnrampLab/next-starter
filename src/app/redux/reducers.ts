import { combineReducers } from 'redux';

import { reducers as wrapperReducers } from 'core';
import { reducers as demoReducers } from 'demo';

export default combineReducers({
  ...wrapperReducers,
  ...demoReducers,
});
