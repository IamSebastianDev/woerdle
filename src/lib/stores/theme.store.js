/** @format */
import { persistable } from '../scripts/persistable.util';

const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
const userTheme = mediaQuery.matches ? 'dark' : 'light';

export const theme = persistable(userTheme, 'wordle-theme');

theme.subscribe((value) => {
	document.documentElement.classList.toggle('dark', value === 'dark');
});
