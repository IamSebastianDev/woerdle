/** @format */

import { writable } from 'svelte/store';

import wordlist from '../data/wordlist.data.js';
const word = wordlist[Math.floor(Math.random() * wordlist.length) * 1];

export const gameState = writable({
	boardState: ['', '', '', '', '', ''],
	evaluations: [null, null, null, null, null, null],
	status: 'inprogress',
	rowIndex: 0,
	solution: word,
});

export const evaluatedKeys = writable({});
const evalBoardState = ({ boardState, rowIndex, solution, evaluations }) => {
	const word = boardState[rowIndex];

	const evalulation = [...word].map((char, index) => {
		if (solution[index] === char) {
			evaluatedKeys.update((state) => {
				const newState = { ...state };
				newState[char] = 'correct';
				return newState;
			});
			return 'correct';
		}

		if (solution.includes(char)) {
			evaluatedKeys.update((state) => {
				const newState = { ...state };
				newState[char] = 'present';
				return newState;
			});
			return 'present';
		}

		if (!solution.includes(char)) {
			evaluatedKeys.update((state) => {
				const newState = { ...state };
				newState[char] = 'absent';
				return newState;
			});
			return 'absent';
		}
	});

	evaluations[rowIndex] = evalulation;

	return evaluations;
};

export const updateGameState = ({ type, payload = '' }) => {
	switch (type) {
		case 'key':
			gameState.update((state) => {
				const { boardState, rowIndex } = state;

				if (boardState[rowIndex].length < 5) {
					boardState[rowIndex] += payload;
				}

				return { ...state, boardState };
			});
			break;
		case 'delete':
			gameState.update((state) => {
				const { boardState, rowIndex } = state;

				boardState[rowIndex] = boardState[rowIndex].slice(0, -1);
				return { ...state, boardState };
			});
			break;
		case 'eval':
			gameState.update((state) => {
				const { boardState, rowIndex } = state;
				const word = boardState[rowIndex];

				if (word.length < 5) return state;

				const evaluations = evalBoardState(state);

				return { ...state, rowIndex: rowIndex + 1, evaluations };
			});
			break;
		default:
			break;
	}
};
