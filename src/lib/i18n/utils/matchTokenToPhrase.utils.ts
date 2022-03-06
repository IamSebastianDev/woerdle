/** @format */

import type { Matcher } from '../types';

/**
 * Function to match a given token to a phrase inside the phrases dictionary.
 *
 * @param { string } token - the string that identifies the phrase to look for
 * @param { object } phrases - the phrases dictionary used for matching the token
 * @returns { string | object } either a found phrase or an object containing multiple phrases
 */

export const matchTokenToPhrase: Matcher = (token, phrases) => {
	try {
		/// @ts-ignore
		return token.split('.').reduce((entry, token) => entry[token], phrases);
	} catch (e) {
		console.error(
			`Token: ${token} could not be matched to a phrase in the current dictionary. Make sure it's not missing or misspelt.`
		);
		return token;
	}
};
