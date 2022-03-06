/** @format */

import type { Entry, Processor } from '../types';

export const processPhrase: Processor = (phrase, data) => {
	return phrase.replaceAll(/{{.*?}}/gim, (r) =>
		r
			.substring(2, r.length - 2)
			.split('.')
			/// @ts-ignore
			.reduce((key, value) => key[value], data)
	);
};
