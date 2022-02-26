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

	window.setTimeout(resetToast, timeToDisappear);
};

export const toast = reduceable(toastReducer, toastStore);

function resetToast() {
	toast.dispatch({ type: 'reset' });
}
