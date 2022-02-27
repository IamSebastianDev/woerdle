/** @format */

import { Writable, writable } from 'svelte/store';

interface storeInit {
	namespace: string;
	interface: string;
}

/**
 * A custom svelte store that will create a store that persists inside the localStorage, and will on pageLoad,
 * reinitalize with the stored value.
 *
 * @param { * } value - the value the store will be initalized with
 * @param { string } identifier - the identifier used with the choosen storage interface to store the store's value in
 * @param { storeInit? } options - a optional object to further configure the store
 * @param { string? } options.namespace - a optional namespace to append to the storage identifier
 * @param { string? } options.interface - a way to optionally specifiy the storage interface to use. localStorage or
 * sessionStorge. Defaults to localStorage
 *
 * @returns { Writable } a new writable store initalized with the passed or stored value
 */

export const persistable = (
	value: any,
	identifier: string,
	options: storeInit = {
		namespace: '',
		interface: 'localStorage',
	}
): Writable<any> => {
	const { namespace, interface: storage } = options;

	const storageIdentifier = (namespace ? namespace + '__' : '') + identifier;
	const storedValue =
		JSON.parse(window[storage].getItem(storageIdentifier)) || null;

	let store = writable(storedValue || value);
	store.subscribe((state) =>
		window[storage].setItem(storageIdentifier, JSON.stringify(state))
	);

	return store;
};
