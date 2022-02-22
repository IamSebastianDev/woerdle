/** @format */

import { writable } from 'svelte/store';

export const showNav = writable(false);

export const toggleNav = () => {
	showNav.update((state) => !state);
};
