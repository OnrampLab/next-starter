import { combineReducers } from 'redux';

import { WrapperReducer } from './wrapper';
import { HomeReducer } from './home';

export default combineReducers({
	wrapper: WrapperReducer,
	home: HomeReducer,
});
