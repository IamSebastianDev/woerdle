/** @format */

export const reduceable = (reducer, store, initalize) => {
	store.dispatch = ({ type, payload }) =>
		store.update((state) => reducer(state, { type, payload }));

	initalize && store.update(initalize);
	return store;
};
