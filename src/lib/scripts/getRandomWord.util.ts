/** @format */

/**
 * Utiltiy method to extract a random string from a array of strings.
 * In this application used to extract a random word out of a predefined pool.
 *
 * @param { string[] } pool - the array of available words
 * @returns { string } the choosen random word
 */

export const getRandomWord = (pool: string[]): string =>
	pool[Math.floor(Math.random() * pool.length) * 1];
