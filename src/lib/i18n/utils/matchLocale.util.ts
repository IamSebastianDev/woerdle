/** @format */

/**
 *
 * The matchLocale function is used to find the best match or crosssection between
 * the set language in the browser, a possible user preference set / stored in local
 * storage, and as a fallback a language of the dictionary.
 *
 * The priority of the preferences follows the principle of specifity of user control.
 * A locale set/stored in localStorage will take precedence over the browser locale /
 * dict crossection which takes precedence over the fallback locale
 *
 * @param { string[] } dictLocales - an array of language strings that are available
 * in the dicts provieded to the engine
 *
 * @return { string } the best matched two letter locale code.
 *
 */

export const matchLocale = (dictLocales: string[]): string => {
	// Check if a there is a stored locale in the localstorage
	const storageIdentifier = 'wordle-locale';
	const storedLocale = window.localStorage.getItem(storageIdentifier);

	// get the crosssection of languages available between browser languages
	// and dictionary lanugages
	const locales = window.navigator.languages;
	const evaluatedLocale = locales.filter((loc) => dictLocales.includes(loc));

	return storedLocale || evaluatedLocale[0] || dictLocales[0];
};
