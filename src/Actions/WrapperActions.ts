import { ActionConsts } from '@Definitions';

import { IWrapperPage } from '@Interfaces';

export const WrapperActions: IWrapperPage.IDispatchProps = {
	SetOptionDrawer: (payload?: any) => ({
		type: ActionConsts.Wrapper.SetOptionDrawer,
		payload,
	}),

	SetMobile: (payload?: any) => ({
		type: ActionConsts.Wrapper.SetMobile,
		payload,
	}),

	SetMobileDrawer: (payload?: any) => ({
		type: ActionConsts.Wrapper.SetMobileDrawer,
		payload,
	}),

	SetBoxed: (payload?: any) => ({
		type: ActionConsts.Wrapper.SetBoxed,
		payload,
	}),

	SetSidebarTheme: (payload?: any) => ({
		type: ActionConsts.Wrapper.SetSidebarTheme,
		payload,
	}),

	SetSidebarPopup: (payload?: any) => ({
		type: ActionConsts.Wrapper.SetSidebarPopup,
		payload,
	}),

	SetSidebarIcons: (payload?: any) => ({
		type: ActionConsts.Wrapper.SetSidebarIcons,
		payload,
	}),

	SetCollapse: (payload?: any) => ({
		type: ActionConsts.Wrapper.SetCollapse,
		payload,
	}),

	SetWeak: (payload?: any) => ({
		type: ActionConsts.Wrapper.SetWeak,
		payload,
	}),
};
