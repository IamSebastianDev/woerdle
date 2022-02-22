/** @format */

import { writable } from 'svelte/store';

// modal index:
//      settings: 		0,
//      instructions: 	1,
//      stats: 			2

export const activeModal = writable(null);
export const overlay = writable(false);

export const openModal = (index, useOverlay = false) => {
	activeModal.set(index);
	overlay.set(useOverlay);
};

export const closeModal = () => {
	activeModal.set(null);
	overlay.set(false);
};
