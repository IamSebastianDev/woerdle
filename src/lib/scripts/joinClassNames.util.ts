/** @format */

/**
 * Utility method to convert a number of strings to a space sperated string.
 *
 * @param { string[] } strings - any number of strings that should be converted to a valid classname.
 * @returns { string } the combined string
 */

export const joinClassNames = (...strings: string[]): string =>
	strings.join(' ');
