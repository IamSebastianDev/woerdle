/** @format */

import { Writable, writable } from 'svelte/store';

type storeInit = {
	namespace: string;
	interface: string;
};

/**
 * A custom svelte store that will create a store that persists inside the localStorage, and will on pageLoad,
 * reinitalize with the stored value.
 *
 * @param { * } value - the value the store will be initalized with
 * @param { string } identifier - the identifier used with the choosen storage interface to store the store's value in
 * @param { object? } options - a optional object to further configure the store
 *
 * @returns { import('svelte/store').Writable } a new writable store initalized with the passed or stored value
 */

export const persistable = (
	value: any,
	identifier: string,
	options?: storeInit
): Writable<any> => {
	const defaults = { interface: 'localStorage', namespace: undefined };
	const { namespace, interface: storage } = options || defaults;

	const storageIdentifier = (namespace ? namespace + '__' : '') + identifier;
	const storedValue =
		JSON.parse(window[storage].getItem(storageIdentifier)) || null;

	let store = writable(storedValue || value);
	store.subscribe((state) =>
		window[storage].setItem(storageIdentifier, JSON.stringify(state))
	);

	return store;
};
