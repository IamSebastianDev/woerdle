/** @format */

import { writable } from 'svelte/store';

// modal index:
//      settings: 0,
//      instructions: 1,

export const activeModal = writable(null);

export const openModal = (index) => {
	activeModal.set(index);
};

export const closeModal = () => {
	activeModal.set(null);
};
