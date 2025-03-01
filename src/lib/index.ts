interface Base {
	id: string;
	question?: string;
	answerIndex: 1 | 2;
}

export interface Choice {
	audioUrl: string;
	choices: string[2];
}

export interface HearTest {
	text: string;
	audioUrls: string[2];
}

export type ChoicePair = Base & { choice: Choice };
export type HearTestPair = Base & { hearTest: HearTest };

export type Pair = ChoicePair | HearTestPair;

export interface PairsData {
	defaultQuestion?: string;
	nextText?: string;
	entries: Pair[];
}

export function shufflePairsArray(array: Pair[]): Pair[] {
	const newArray = structuredClone(array);

	for (let i = newArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		newArray[i], (newArray[j] = newArray[j]), newArray[i];
	}

	return newArray;
}
