import { createContext, useContext, useEffect, useReducer } from 'react';

import Router from 'next/router';

const Context = createContext();
const { Provider } = Context;
let mql;

Router.events.on(
  'routeChangeComplete',
  () => (document.querySelector('.workspace > .ant-layout').scrollTop = 0)
);

const saveToLocal = state => {
  delete state.mobile;
  delete state.optionDrawer;
  delete state.mobileDrawer;
  localStorage.setItem('settings', JSON.stringify(state));
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'fullscreen': {
      const element = document.querySelector('#__next');
      const isFullscreen =
        document.webkitIsFullScreen || document.mozFullScreen || false;

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
    default:
      return state;
  }
};

const AppProvider = props => {
  const [state, dispatch] = useReducer(reducer, {
    name: 'One',
    mobile: false,
    boxed: false,
    darkSidebar: false,
    sidebarPopup: false,
    sidebarIcons: false,
    collapsed: false,
    weakColor: false,
    optionDrawer: false,
    mobileDrawer: false,
    fullscreen: false
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

  return <Provider value={[state, dispatch]}>{props.children}</Provider>;
};

export default AppProvider;
export const useAppState = () => useContext(Context);
