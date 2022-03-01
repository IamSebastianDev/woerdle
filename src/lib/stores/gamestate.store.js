/** @format */

import { persistable } from '../scripts/persistable.util';
import { reduceable } from '../scripts/reducable.util';
import { toast } from './toast.store.js';
import { modal } from './modal.store.js';
import { stats } from './statistics.store.js';

import { getRandomWord } from '../scripts/getRandomWord.util';
import solutions from '../data/solutions.data.js';
import supports from '../data/supports.data.js';

const allowedChars = [...new Set(supports.join('').split(''))];
const initalizeGamestate = (solution, hardmode = false) => {
	return {
		boardState: ['', '', '', '', '', ''],
		evaluations: [null, null, null, null, null, null],
		evaluatedKeys: {},
		status: 'in__progress',
		rowIndex: 0,
		solution,
		hardmode,
	};
};

const addKeyHandler = (state, payload) => {
	const { boardState, rowIndex } = state;
	const newState = { ...state };

	if (!allowedChars.includes(payload)) {
		toast.dispatch({
			type: 'display',
			payload: 'Invalid character.',
		});
		return newState;
	}

	if (boardState[rowIndex].length < 5) {
		newState.boardState[rowIndex] += payload;
	}

	return newState;
};

const deleteKeyHandler = (state) => {
	const { rowIndex, boardState, status } = state;
	const newState = { ...state };

	if (status !== 'in__progress') return newState;

	newState.boardState[rowIndex] = boardState[rowIndex].slice(0, -1);
	return newState;
};

const checkGuesses = (state, word) => {
	const { boardState, rowIndex, evaluations, evaluatedKeys } = state;
	const letters = word.split('');
	const keys = Object.entries(evaluatedKeys);

	/**
	 * For each letter of the current word, compare it with the evaluations of the
	 * previous guess. If the evaluation is 'correct', check if the current and last
	 * character match, and if not, dispatch a toast message.
	 */

	const lastEvaluated = evaluations[rowIndex - 1];
	if (!lastEvaluated) return true;

	for (let i = 0; i < letters.length; i++) {
		if (lastEvaluated[i] === 'correct') {
			const correctChar = boardState[rowIndex - 1][i];
			if (letters[i] !== correctChar) {
				toast.dispatch({
					type: 'display',
					payload: `${
						i + 1
					}. letter must be ${correctChar.toUpperCase()}`,
				});
				return false;
			}
		}
	}

	/**
	 * If no correct guesses were wrongly placed, check for present values
	 * that are missing. This block will only be reached, if no error was
	 * found within the correct guesses. The method will return early, if
	 * no keys are marked as present.
	 */

	const present = keys
		.map(([char, state]) => state === 'present' && char)
		.filter((elem) => elem);

	if (present.length === 0) return true;

	for (let i = 0; i < present.length; i++) {
		const char = present[i];
		if (!letters.includes(char)) {
			toast.dispatch({
				type: 'display',
				payload: `Guess must contain ${char.toUpperCase()}`,
			});
			return false;
		}
	}

	return true;
};

const checkWordLetters = (state, word) => {
	const { rowIndex, solution, evaluations, evaluatedKeys } = state;

	const evalulation = [...word].map((char, index) => {
		if (solution[index] === char) {
			evaluatedKeys[char] = 'correct';
			return 'correct';
		}

		if (solution.includes(char)) {
			evaluatedKeys[char] = 'present';
			return 'present';
		}

		if (!solution.includes(char)) {
			evaluatedKeys[char] = 'absent';
			return 'absent';
		}
	});

	evaluations[rowIndex] = evalulation;

	return evaluations;
};

const evaluateGameState = (state) => {
	const { boardState, rowIndex, solution, status, evaluatedKeys, hardmode } =
		state;
	const newState = { ...state };

	// if the game status is 'ended', return with the existing state
	if (status !== 'in__progress') return newState;

	/**
	 * Get the currently set word and evaluate it's validity
	 *
	 * If the word length is < 5, the word is not complete, dispatch a
	 * Toast message and return the new state without altering it.
	 *
	 * If the word is neither in the solutions nor in the supports list,
	 * dispatch a toast and return the new state without altering it
	 */

	const word = boardState[rowIndex];

	if (word.length < 5) {
		toast.dispatch({
			type: 'display',
			payload: 'Not enough letters.',
		});
		return newState;
	}

	if (!solutions.includes(word) && !supports.includes(word)) {
		toast.dispatch({
			type: 'display',
			payload: 'Word not in list.',
		});
		return newState;
	}

	if (hardmode && !checkGuesses(state, word)) {
		return newState;
	}

	// If the word is a valid entry, parse the letters for their state

	const evaluations = checkWordLetters(state, word);

	// Evaluate the win / loss state of the current gameState

	if (word === solution && status === 'in__progress') {
		stats.dispatch({ type: 'win', payload: rowIndex + 1 });
		toast.dispatch({ type: 'display', payload: 'You won!' });

		// open the modal after 2 seconds
		window.setTimeout(
			() => modal.dispatch({ type: 'stats', payload: { overlay: true } }),
			2 * 1000
		);
		return { ...state, status: 'ended__win', evaluations };
	}

	if (rowIndex + 1 === 6) {
		stats.dispatch({ type: 'loss' });
		toast.dispatch({
			type: 'display',
			payload: `Oh boy :( The right solution was ${solution.toUpperCase()}.`,
		});
		// open the modal after 2 seconds
		window.setTimeout(
			() => modal.dispatch({ type: 'stats', payload: { overlay: true } }),
			2 * 1000
		);
		return { ...state, status: 'ended__loss', evaluations };
	}

	// if the game is neither lost nor won, return the current with the new evaluations
	// and the increased rowIndex

	return { ...state, rowIndex: rowIndex + 1, evaluations };
};

const gameStateReducer = (state, { type, payload }) => {
	toast.dispatch({ type: 'reset' });

	switch (type) {
		case 'reset':
			return initalizeGamestate(getRandomWord(solutions), state.hardmode);
		case 'addKey':
			return addKeyHandler(state, payload);
		case 'deleteKey':
			return deleteKeyHandler(state);
		case 'eval':
			return evaluateGameState(state);
		case 'mode':
			return { ...state, hardmode: payload };
		default:
			throw new Error(`'${type}' in gameStateReducer is not recognized.`);
	}
};

const stateStore = persistable(
	initalizeGamestate(getRandomWord(solutions)),
	'wordle-state'
);
export const gameState = reduceable(gameStateReducer, stateStore);
