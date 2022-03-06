/** @format */

interface Entry {
	count?: number;
	[key: string]: string | Entry;
}

interface Processor {
	(phrase: string, data: Entry): string;
}

export interface Dict {
	locale: string;
	code: string;
	phrases: Entry;
}

export interface I18n {
	t: Readable<any>;
	currentLocale: Writable<string>;
}

export interface Translator {
	(dict: Dict): Translate;
}

export interface Translate {
	(token: string, data: Entry): string;
}

interface Forms {
	[key: string]: string;
}

export interface Matcher {
	(token: string, phrases: object | Forms): string | Forms;
}
