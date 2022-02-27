/** @format */

import type { Writable } from 'svelte/store';

interface Reduceable extends Writable<any> {
	dispatch: Function;
}

interface Dispatch {
	type: string;
	payload?: any;
}

/**
 * Appends a dispatch method to a svelte writable store.
 *
 * @param { Function } reducer - the reducer function to pass to the store
 * @param { Writable } store - the writable store to append the dispatch function to
 * @param { Function? } initalize - a optional initalize function to pass to the store after creating it
 *
 * @returns { Reduceable } the newly created reducable
 */

export const reduceable = (
	reducer: Function,
	store: Writable<any>,
	initalize?: Function
): Reduceable => {
	const dispatch = ({ type, payload }: Dispatch): void =>
		store.update((state) => reducer(state, { type, payload }));
	const reduceable = { ...store, dispatch };

	initalize && reduceable.update((state) => initalize(state));
	return reduceable;
};
