/** @format */

export default {
	locale: 'German',
	code: 'de',
	phrases: {
		settings: {
			heading: 'Einstellungen',
			localeSelect: {
				heading: 'Sprache',
				description: 'Wähle zwischen deutscher oder englischer Sprache',
			},
			hardMode: {
				heading: 'Schwerer Modus',
				description:
					'Alle geratenen Buchstaben müssen beim nächsten Raten benutzt werden',
			},
			theme: {
				heading: 'Theme',
				description: 'Wähle zwischen einem dunklen und hellen Theme',
			},
			links: {
				github: 'Schau dir den Quellcode auf Github an.',
				twitter: 'Finde mich auf Twitter.',
			},
			locale: 'Wähle deine Sprache:',
		},
		instructions: {
			heading: 'So wird gespielt',
			line1: 'Errate das <strong>WORDLE</strong> innerhalb 6 versuchen.',
			line2: 'Jedes Wordle muss ein gültiges Wort mit 5 Buchstaben sein. Drücke ENTER um die Lösung zu überprüfen.',
			line3: 'Nach jeder Runde ändern sich die Farben der Kacheln um dir Hinweise auf deinen Fortschritt zu geben.',
			examples: {
				heading: 'Beispiel',
				line1: 'Der Buchstabe {{letter}} ist am richtigen Platz.',
				line2: 'Der Buchstabe {{letter}} ist Teil des Wort, aber am falschen Platz.',
				line3: 'Der Buchstabe {{letter}} ist nicht Teil des Wortes.',
			},
		},
		stats: {
			heading: 'Statistik 🏆',
			played: 'Spiele',
			percentage: 'Gewinn %',
			current: 'Momentane Serie',
			max: 'Maximale Serie',
			guesses: 'Versuche',
			nodata: 'Keine daten',
			failed: 'Fehlgeschlagen: ',
			average: 'Durchschitt Ø: ',
		},
		refresh: {
			heading: 'Generiere ein neues Wordle',
			description: '24 Stunden zu warten ist langweilig!',
		},
	},
};
