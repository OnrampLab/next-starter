import React, { createContext, useContext, useEffect, useReducer } from 'react';
import Router from 'next/router';
import { usePubSub } from '../hooks';

interface IAppState {
  name: string;
  mobile: boolean;
  boxed: boolean;
  darkSidebar: boolean;
  sidebarPopup: boolean;
  sidebarIcons: boolean;
  collapsed: boolean;
  weakColor: boolean;
  optionDrawer: boolean;
  mobileDrawer: boolean;
  fullscreen: boolean;
  accountId: number;
}

type IContext = [IAppState, React.Dispatch<any>];

const Context = createContext<IContext>();
const { Provider } = Context;
let mql: MediaQueryList;

Router.events.on(
  'routeChangeComplete',
  () => (document.querySelector('.workspace > .ant-layout')!.scrollTop = 0),
);

const saveToLocal = (state: IAppState) => {
  delete state.mobile;
  delete state.optionDrawer;
  delete state.mobileDrawer;
  localStorage.setItem('settings', JSON.stringify(state));
};

const reducer = (state: IAppState, action) => {
  switch (action.type) {
    case 'fullscreen': {
      const element = document.querySelector('#__next');
      const isFullscreen = document.webkitIsFullScreen || document.mozFullScreen || false;

      element.requestFullScreen =
        element.requestFullScreen ||
        element.webkitRequestFullScreen ||
        element.mozRequestFullScreen ||
        function() {
          return false;
        };

      document.cancelFullScreen =
        document.cancelFullScreen ||
        document.webkitCancelFullScreen ||
        document.mozCancelFullScreen ||
        function() {
          return false;
        };

      isFullscreen ? document.cancelFullScreen() : element.requestFullScreen();

      return { ...state, fullscreen: !isFullscreen };
    }
    case 'boxed': {
      const newState = { ...state, boxed: !state.boxed };
      saveToLocal(newState);
      return newState;
    }
    case 'sidebarTheme': {
      const newState = { ...state, darkSidebar: !state.darkSidebar };
      saveToLocal(newState);
      return newState;
    }
    case 'sidebarPopup': {
      const newState = { ...state, sidebarPopup: !state.sidebarPopup };
      saveToLocal(newState);
      return newState;
    }
    case 'sidebarIcons': {
      if (state.collapsed) return { ...state };
      const newState = { ...state, sidebarIcons: !state.sidebarIcons };
      saveToLocal(newState);
      return newState;
    }
    case 'collapse': {
      const collapse = state.collapsed;
      let sidebarIcons = state.sidebarIcons;
      if (!collapse) sidebarIcons = true;
      const newState = { ...state, collapsed: !state.collapsed, sidebarIcons };
      saveToLocal(newState);
      return newState;
    }
    case 'weak': {
      const weak = state.weakColor;
      let darkSidebar = state.darkSidebar;
      if (!weak && darkSidebar) darkSidebar = false;
      const newState = { ...state, weakColor: !state.weakColor, darkSidebar };
      saveToLocal(newState);
      return newState;
    }
    case 'mobile':
      return { ...state, mobile: !mql.matches };
    case 'options':
      return { ...state, optionDrawer: !state.optionDrawer };
    case 'mobileDrawer':
      return { ...state, mobileDrawer: !state.mobileDrawer };
    case 'setup': {
      const settings = JSON.parse(localStorage.getItem('settings'));
      return { ...state, mobile: !mql.matches, ...settings };
    }
    case 'accountId':
      const newState = { ...state, accountId: action.accountId };
      saveToLocal(newState);
      return newState;
    default:
      return state;
  }
};

export const AppProvider = props => {
  const { PubSubContext, publish, subscribe, unsubscribe } = usePubSub();
  const [state, dispatch] = useReducer(reducer, {
    name: 'Samurai',
    mobile: false,
    boxed: false,
    darkSidebar: false,
    sidebarPopup: false,
    sidebarIcons: true,
    collapsed: false,
    weakColor: false,
    optionDrawer: false,
    mobileDrawer: false,
    fullscreen: false,

    // NOTE: need to refactor later
    accountId: null,
  });

  useEffect(() => {
    mql = window.matchMedia(`(min-width: 992px)`);
    mql.addListener(mediaQueryChanged);
    dispatch({ type: 'setup' });
    return () => mql.removeListener(mediaQueryChanged);
  }, []);

  const mediaQueryChanged = () => {
    dispatch({ type: 'mobile' });
  };

  return (
    <PubSubContext.Provider value={{ publish, subscribe, unsubscribe }}>
      <Provider value={[state, dispatch]}>{props.children}</Provider>
    </PubSubContext.Provider>
  );
};

export const useAppState = () => useContext<IContext>(Context);
