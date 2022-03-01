/** @format */

import { writable } from 'svelte/store';
import { persistable } from '../scripts/persistable.util';
import { reduceable } from '../scripts/reducable.util';

const modalStore = writable({ active: null, overlay: false });
const modalReducer = (state, { type, payload }) => {
	const { overlay } = payload || false;
	switch (type) {
		case 'close':
			return { active: null, overlay };
		case 'stats':
			return { active: 'Stats', overlay };
		case 'instructions':
			return { active: 'Instructions', overlay };
		case 'settings':
			return { active: 'Settings', overlay };
		default:
			return state;
	}
};

export const modal = reduceable(modalReducer, modalStore);
export const initalModal = persistable({ show: true }, 'wordle-initalize');
