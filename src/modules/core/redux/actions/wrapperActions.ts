import { ActionConsts } from './ActionConsts';

import { IWrapperPage } from '@onr/core';

export const wrapperActions: IWrapperPage.IDispatchProps = {
  setOptionDrawer: (payload?: boolean) => ({
    type: ActionConsts.Wrapper.SetOptionDrawer,
    payload,
  }),

  setMobile: (payload?: boolean) => ({
    type: ActionConsts.Wrapper.SetMobile,
    payload,
  }),

  setMobileDrawer: (payload?: boolean) => ({
    type: ActionConsts.Wrapper.SetMobileDrawer,
    payload,
  }),

  setBoxed: (payload?: boolean) => ({
    type: ActionConsts.Wrapper.SetBoxed,
    payload,
  }),

  setSidebarTheme: (payload?: boolean) => ({
    type: ActionConsts.Wrapper.SetSidebarTheme,
    payload,
  }),

  setSidebarPopup: (payload?: boolean) => ({
    type: ActionConsts.Wrapper.SetSidebarPopup,
    payload,
  }),

  setSidebarIcons: (payload?: boolean) => ({
    type: ActionConsts.Wrapper.SetSidebarIcons,
    payload,
  }),

  setCollapse: (payload?: boolean) => ({
    type: ActionConsts.Wrapper.SetCollapse,
    payload,
  }),

  setWeak: (payload?: boolean) => ({
    type: ActionConsts.Wrapper.SetWeak,
    payload,
  }),

  setup: (payload?: any) => ({
    type: ActionConsts.Wrapper.Setup,
    payload,
  }),
};
