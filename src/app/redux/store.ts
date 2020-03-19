import { createStore, applyMiddleware, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import { wrapperActions, IStore } from '@onr/core';

import reducers from './reducers';

const saveToLocal = (state: IStore) => {
  localStorage.setItem(
    'settings',
    JSON.stringify({
      ...state,
      ...{
        wrapper: {
          ...state.wrapper,
          ...{
            mobile: undefined,
            optionDrawer: undefined,
            mobileDrawer: undefined,
          },
        },
      },
    }),
  );
};

const _store: Store = createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(thunkMiddleware)),
);

export const afterComponentDidMount = () => {
  // TODO: window initialize
  const mql = window.matchMedia(`(min-width: 992px)`);

  const mediaQueryChanged = () => {
    _store.dispatch(wrapperActions.setMobile(!mql.matches));
    return () => mql.removeListener(mediaQueryChanged);
  };

  mql.addListener(mediaQueryChanged);
  _store.dispatch(
    wrapperActions.setup({
      mobile: !mql.matches,
    }),
  );
};

export const getCurrentStore = _store.getState();

export const store = () => {
  // store initialize
  _store.subscribe(() => {
    // TODO: add filter
    saveToLocal(_store.getState());
  });

  return _store;
};
