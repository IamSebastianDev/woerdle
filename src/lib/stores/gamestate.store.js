/** @format */

import { writable } from 'svelte/store';
import { dispatchToast, resetToast } from './toast.store.js';
import { openModal } from './modal.store.js';
import { updateStats } from './statistics.store.js';

import { getDefaultData } from '../data/defaults.js';
import wordlist from '../data/wordlist.data.js';
const allowedChars = [...new Set(wordlist.join('').split(''))];
console.log({ allowedChars });
const word = () => wordlist[Math.floor(Math.random() * wordlist.length) * 1];
const savedState = JSON.parse(window.localStorage.getItem('wordle-gamestate'));

const gameState = writable(
	savedState || { ...getDefaultData(), solution: word() }
);
gameState.subscribe((state) =>
	localStorage.setItem('wordle-gamestate', JSON.stringify(state))
);

const evalBoardState = ({
	boardState,
	rowIndex,
	solution,
	evaluations,
	evaluatedKeys,
}) => {
	const word = boardState[rowIndex];

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

const updateGameState = ({ type, payload = '' }) => {
	resetToast();

	switch (type) {
		case 'key':
			if (!allowedChars.includes(payload)) {
				return;
			}

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
				const { boardState, rowIndex, solution, status } = state;

				if (status === 'ended') return state;

				const word = boardState[rowIndex];

				if (word.length < 5) {
					dispatchToast('Not enough letters');
					return state;
				}

				if (!wordlist.includes(word)) {
					dispatchToast('Word not in list.');
					return state;
				}

				console.log({ word });
				console.log({ hints: state.evaluatedKeys });

				const evaluations = evalBoardState(state);

				// Dispatch win

				if (word === solution && status !== 'ended') {
					updateStats({ type: 'win', payload: rowIndex + 1 });
					dispatchToast('You won!');
					window.setTimeout(() => {
						openModal(2, true);
					}, 2 * 1000);
					return { ...state, status: 'ended', evaluations };
				}

				// Dispatch loss

				if (rowIndex + 1 === 6) {
					updateStats({ type: 'loss' });
					dispatchToast(
						`Oh boy :( The right solution was "${solution}".`
					);
					window.setTimeout(() => {
						openModal(2, true);
					}, 2 * 1000);
					return { ...state, status: 'ended', evaluations };
				}

				return { ...state, rowIndex: rowIndex + 1, evaluations };
			});
			break;
		default:
			break;
	}
};

const resetGameState = () => {
	gameState.set({ ...getDefaultData(), solution: word() });
};

export { gameState, updateGameState, resetGameState };
