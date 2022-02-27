/** @format */

import { writable } from 'svelte/store';
import { reduceable } from '../scripts/reducable.util';

const timeToDisappear = 10 * 1000;

const toastStore = writable({ message: null, visible: false });
const toastReducer = (state, { type, payload }) => {
	switch (type) {
		case 'display':
			return {
				message: payload,
				visible: true,
			};
		case 'reset':
			return {
				message: null,
				visible: false,
			};
	}
};

export const toast = reduceable(toastReducer, toastStore);

// everytime the state is updated to set it visible,
// set a timer to reset the state to invisible

toast.subscribe((state) => {
	if (state.visible) {
		window.setTimeout(
			() => toast.dispatch({ type: 'reset' }),
			timeToDisappear
		);
	}
});
