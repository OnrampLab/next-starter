import { combineReducers } from 'redux';

import { reducers as wrapperReducers } from '@onr/core';
import { reducers as accountReducers } from '@onr/account';
import { reducers as authReducers } from '@onr/auth';

export default combineReducers({
  ...wrapperReducers,
  ...accountReducers,
  ...authReducers,
});
