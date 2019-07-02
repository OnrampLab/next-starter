import { createStore, applyMiddleware, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import { IWrapperPage } from '@Interfaces';
import { WrapperActions } from '@Actions';

import Reducers from './Reducers';

const saveToLocal = (state: IWrapperPage.IStateProps) => {
  delete state.mobile;
  delete state.optionDrawer;
  delete state.mobileDrawer;
  localStorage.setItem('settings', JSON.stringify(state));
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

export const getCurrentState = _store.getState();

export default () => {
	// store initialize
	_store.subscribe(() => {
		// TODO: add filter
		saveToLocal(_store.getState());
	});

	return _store;
};
