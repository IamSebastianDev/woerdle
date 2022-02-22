/** @format */

import { writable } from 'svelte/store';
import { getDefaultStats } from '../data/defaults.js';

const savedStats = JSON.parse(window.localStorage.getItem('wordle-statistics'));
const stats = writable(savedStats || getDefaultStats());

stats.subscribe((state) =>
	localStorage.setItem('wordle-statistics', JSON.stringify(state))
);

const calcAverage = (guesses, gamesPlayed) => {
	const numberOfGuesses = Object.values(guesses).slice(0, 6);
	return numberOfGuesses.reduce((a, b, i) => a + b * i + 1, 0) / gamesPlayed;
};

const updateStats = ({ type, payload = '' }) => {
	switch (type) {
		case 'win':
			stats.update((state) => {
				const newState = { ...state };

				newState.guesses[payload] = state.guesses[payload] + 1;
				newState.gamesWon = state.gamesWon + 1;
				newState.gamesPlayed = state.gamesPlayed + 1;
				newState.currentStreak = state.currentStreak + 1;
				newState.averageGuesses = calcAverage(
					newState.guesses,
					newState.gamesPlayed
				);
				newState.maxStreak =
					newState.currentStreak > state.maxStreak
						? newState.currentStreak
						: newState.maxStreak;

				return newState;
			});
			break;
		case 'loss':
			stats.update((state) => {
				const newState = { ...state };

				newState.guesses.failed = state.guesses.failed + 1;
				newState.gamesPlayed = state.gamesPlayed + 1;
				newState.currentStreak = 0;

				return newState;
			});
			break;
		default:
			break;
	}
};

export { stats, updateStats };
