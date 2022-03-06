/** @format */

import type { Entry, Processor } from '../types';

export const processPhrase: Processor = (phrase, data) => {
	return phrase.replaceAll(/{{(.*?)}}/gim, (r) =>
		/// @ts-ignore
		r.split('.').reduce((key, value) => key[value], data)
	);
};
