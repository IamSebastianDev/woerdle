/** @format */

import type { Translator } from '../types';
import { getCount } from './getCount.util';
import { matchTokenToPhrase } from './matchTokenToPhrase.utils';
import { processPhrase } from './processPhrase.util';

/**
 * The translator function creates a new translate function bound to the current dictionary.
 * This enables the reactive updating of the token/phrase matching.
 */

export const translator: Translator =
	(dict) =>
	(token, data): string => {
		// get the phrases from the dictionary
		const { phrases } = dict;

		// process the count property of the data
		// const count = getCount(data.count);

		/**
		 * Match the given to a valid phrase inside the dictionary.
		 * If the found phrase is of type string, it can be returned after
		 * processing it.
		 */

		const phrase = matchTokenToPhrase(token, phrases);
		if (!phrase) return 'undefined';
		if (typeof phrase === 'string') return processPhrase(phrase, data);

		/**
		 * If the found phrase is an object, a singular / plural / nullish check is necessary
		 * to determine the correct form. For this, get the count / default provided in the data object.
		 * Then match the count to the index of the phrase to receive the correct form. Return
		 * it after processing it for data.
		 */

		const count = getCount(data.count);
		const entries = Object.keys(phrase).filter(
			(key) => parseInt(key) <= count
		);
		const closest = entries.pop();
		if (closest) return processPhrase(phrase[closest], data);

		// if their is not correct match, return a 'undefined' string

		return 'undefined';
	};
