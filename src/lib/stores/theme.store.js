/** @format */

import { writable } from 'svelte/store';
const storageIdentifier = 'wordle-user-colour-theme';
const storedTheme = localStorage.getItem(storageIdentifier);

const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
const userTheme = mediaQuery.matches ? 'dark' : 'light';

export const theme = writable(storedTheme || userTheme);

theme.subscribe((value) => {
	document.documentElement.classList.toggle('dark', value === 'dark');
	localStorage.setItem(storageIdentifier, value);
});

export const toggleColourTheme = () => {
	theme.update((state) => (state === 'dark' ? 'light' : 'dark'));
};
