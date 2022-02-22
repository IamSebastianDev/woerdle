/** @format */

import { writable } from 'svelte/store';

const timeToDisappear = 10 * 1000;

export const message = writable('');
export const visible = writable(false);

export const dispatchToast = (string) => {
	message.set(string);
	visible.set(true);

	window.setTimeout(() => {
		resetToast();
	}, timeToDisappear);
};
export const resetToast = () => {
	message.set('');
	visible.set(false);
};
