import { Props } from 'react';
import { Store } from 'redux';

declare namespace IWrapperPage {
  export type IProps = IOwnProps & IStateProps & IDispatchProps & Store;

  export interface IOwnProps extends Props<{}> {}

  export interface IState {}

  export interface IStateProps {
    version: number;
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
    accountId?: number;
  }

  export interface IDispatchProps {
    setOptionDrawer(payload?: boolean): AnyAction;
    setMobile(payload?: boolean): AnyAction;
    setMobileDrawer(payload?: boolean): AnyAction;
    setBoxed(payload?: boolean): AnyAction;
    setSidebarTheme(payload?: boolean): AnyAction;
    setSidebarPopup(payload?: boolean): AnyAction;
    setSidebarIcons(payload?: boolean): AnyAction;
    setCollapse(payload?: boolean): AnyAction;
    setWeak(payload?: boolean): AnyAction;
    setup(payload?: options): AnyAction;
    setAccountId(payload?: number): AnyAction;
  }

  namespace Actions {
    export interface IMapPayload {}

    export interface IMapResponse {}
  }
}
