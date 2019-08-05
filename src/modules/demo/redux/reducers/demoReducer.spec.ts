import { IAction, IHomePage } from '@Interfaces';
import { actionConsts } from 'demo';
import { demoReducer } from './demoReducer';

describe('home reducer', () => {
	it('should return the initial state', () => {
		expect(demoReducer(undefined, {} as IAction<IHomePage.IDispatchProps>)).toEqual({
      demos: [],
		});
	});

	it('should handle SetReducer', () => {
		expect(
			demoReducer([], {
				type: actionConsts.demo.setPlanetImage,
				payload: {
					version: 2,
				},
			}),
		).toEqual({
			version: 2,
		});
	});
});
