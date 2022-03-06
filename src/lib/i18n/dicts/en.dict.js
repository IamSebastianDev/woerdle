/** @format */

export default {
	locale: 'English',
	code: 'en',
	phrases: {
		settings: {
			heading: 'Settings',
			hardMode: {
				heading: 'Hard Mode',
				description:
					'Any revealed hints must be used in subsequent guesses',
			},
			theme: {
				heading: 'Dark Theme',
				description: 'Toggle between dark & light theme',
			},
			links: {
				github: 'Find this Project on Github',
				twitter: 'Find me on Twitter',
			},
			locale: 'Choose your language:',
		},
		instructions: {
			heading: 'How to play',
			line1: 'Guess the <strong>WORDLE</strong> in six tries.',
			line2: 'Each guess must be a valid five-letter word. Hit the enter button to submit.',
			line3: 'After each guess, the color of the tiles will change to show how close your guess was to the word.',
			examples: {
				heading: 'Examples',
				line1: 'The letter {{letter}} is in the word and in the correct spot.',
				line2: 'The letter {{letter}} is in the word but in the wrong spot.',
				line3: 'The letter {{letter}} is not in the word in any spot.',
			},
		},
		stats: {
			heading: 'Statistics 🏆',
			played: 'Played',
			percentage: 'Win %',
			current: 'Current Streak',
			max: 'Max Streak',
			guesses: 'Guess distribution',
			nodata: 'No data',
			failed: 'Failed: ',
			average: 'Average Ø: ',
		},
		refresh: {
			heading: 'Get a new Wordle',
			description: 'Waiting 24 hours is boring',
		},
	},
};
