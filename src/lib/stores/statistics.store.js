/** @format */

import { persistable } from '../scripts/persistable.util';
import { reduceable } from '../scripts/reducable.util';

const initializeStats = () => {
	return {
		currentStreak: 0,
		gamesPlayed: 0,
		gamesWon: 0,
		guesses: {
			1: 0,
			2: 0,
			3: 0,
			4: 0,
			5: 0,
			6: 0,
			failed: 0,
		},
		maxStreak: 0,
		history: [],
	};
};

const statisticsReducer = (state, { type, payload = '' }) => {
	const newState = { ...state };
	switch (type) {
		case 'win':
			newState.guesses[payload.guesses] =
				state.guesses[payload.guesses] + 1;
			newState.gamesWon = state.gamesWon + 1;
			newState.gamesPlayed = state.gamesPlayed + 1;
			newState.currentStreak = state.currentStreak + 1;
			newState.maxStreak =
				newState.currentStreak > state.maxStreak
					? newState.currentStreak
					: newState.maxStreak;
			newState.history = [{ ...payload }, ...state.history].splice(0, 10);

			return newState;
		case 'loss':
			newState.guesses.failed = state.guesses.failed + 1;
			newState.gamesPlayed = state.gamesPlayed + 1;
			newState.currentStreak = 0;
			newState.history = [
				{ guesses: null, solution: payload.solution },
				...state.history,
			].splice(0, 10);

			return newState;
		default:
			break;
	}

	return newState;
};

const persistantStats = persistable(initializeStats(), 'wordle-stats');
export const stats = reduceable(statisticsReducer, persistantStats);
