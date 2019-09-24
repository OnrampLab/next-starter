import { combineReducers } from 'redux';

import { reducers as wrapperReducers } from '@onr/core';
import { reducers as demoReducers } from '@onr/demo';

export default combineReducers({
  ...wrapperReducers,
  ...demoReducers,
});
