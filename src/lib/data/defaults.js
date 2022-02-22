/** @format */

export const getDefaultData = () => {
	return {
		boardState: ['', '', '', '', '', ''],
		evaluations: [null, null, null, null, null, null],
		evaluatedKeys: {},
		status: 'inprogress',
		rowIndex: 0,
	};
};

export const getDefaultStats = () => {
	return {
		averageGuesses: 0,
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
	};
};
