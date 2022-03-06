/** @format */

import { type Readable, writable, type Writable, derived } from 'svelte/store';
import type { Dict, I18n } from './types';
import { matchLocale } from './utils/matchLocale.util';
import { translator } from './utils/translator.util';

const engine = (dicts: Dict[]): I18n => {
	/**
	 * Create an array of two letter language code strings out of the provided dictionary array
	 */

	const __localeCodes = dicts.map(({ code }) => code);
	const __matchedLocale = matchLocale(__localeCodes);

	const currentLocale: Writable<string> = writable(__matchedLocale);
	currentLocale.subscribe((state) =>
		window.localStorage.setItem('wordle-locale', state)
	);
	const currentDict = derived(currentLocale, (currentLocale) =>
		dicts.find(({ code }) => code === currentLocale)
	);

	// create the reactive translate method
	if (!currentDict) throw new Error('i18n: No dictionary was found');
	/// @ts-ignore
	const t = derived(currentDict, (currentDict) => translator(currentDict));

	return { t, currentLocale };
};

import en from './dicts/en.dict';
import de from './dicts/de.dict';
export const i18n = engine([en, de]);
