import { createStore, applyMiddleware, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import { IStore } from '@Interfaces';
import { WrapperActions } from '@Actions';

import Reducers from './Reducers';

const saveToLocal = (state: IStore) => {
  localStorage.setItem('settings', JSON.stringify({ ...state, ...{
		wrapper: {
			...state.wrapper, ...{
				mobile: undefined,
				optionDrawer: undefined,
				mobileDrawer: undefined,
			}
		}
	} }));
};

const _store: Store = createStore(Reducers, {}, composeWithDevTools(applyMiddleware(thunkMiddleware)));

export const afterComponentDidMount = () => {
	// TODO: window initialize
	const mediaQueryChanged = () => {
		_store.dispatch(WrapperActions.setMobile(!mql.matches));
		return () => mql.removeListener(mediaQueryChanged);
	};

	const mql = window.matchMedia(`(min-width: 992px)`);
	mql.addListener(mediaQueryChanged);
	_store.dispatch(WrapperActions.setup({
		mobile: !mql.matches,
	}));
}

export const getCurrentStore = _store.getState();

export default () => {
	// store initialize
	_store.subscribe(() => {
		// TODO: add filter
		saveToLocal(_store.getState());
	});

	return _store;
};
