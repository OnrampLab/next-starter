import { combineReducers } from 'redux';

import { reducers as wrapperReducers } from '@onr/core';

export default combineReducers({
  ...wrapperReducers,
});
