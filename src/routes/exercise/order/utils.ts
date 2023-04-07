import { quintOut } from "svelte/easing";
import { writable } from "svelte/store";
import { crossfade } from "svelte/transition";
export type orderExercise = {
	type: string;
	question: string;
	answer: string;
};
const shuffleArray = <T>(arr: T[]) => {
	return arr
		.map((item) => ({ index: Math.random() * 10, data: item }))
		.sort((a, b) => a.index - b.index)
		.map((item) => item.data);
};
export const useOrderExercise = (question: orderExercise) => {
	const misleadingWords = shuffleArray([
		"jest",
		"teraz",
		"On",
		"Ona",
		"tam",
		"robi",
		"tutaj",
		"nigdy",
		"zawsze",
		"gdy",
		"Witaj",
	]);
	const toChoose = question.answer.split(" ");
	let howManyLeft = 5;
	// add 5 misleading words that aren't part of the answer
	for (const word of misleadingWords) {
		if (howManyLeft <= 0) break;
		if (word in toChoose) continue;
		toChoose.push(word);
		howManyLeft--;
	}

	const store = writable({ toChoose: shuffleArray(toChoose), chosen: [] as string[] });
	const toggleWord = (word: string) => {
		store.update((s) => {
			let wordIndex = s.toChoose.findIndex((w) => w === word);
			// if the word is in 'toChoose' array, move it to the other one
			if (wordIndex !== -1) {
				const wordToMove = s.toChoose.splice(wordIndex, 1)[0];
				s.chosen.push(wordToMove);
				return s;
			}
			// if it's not, check the other one
			wordIndex = s.chosen.findIndex((w) => w === word);
			if (wordIndex === -1) return s;
			const wordToMove = s.chosen.splice(wordIndex, 1)[0];
			s.toChoose.push(wordToMove);
			return s;
		});
	};
	return { store, toggleWord };
};

export const itemAnimation = crossfade({
	duration: (d) => Math.sqrt(d * 100),
	fallback(node, _params) {
		const style = getComputedStyle(node);
		const transform = style.transform === "none" ? "" : style.transform;

		return {
			duration: 100,
			easing: quintOut,
			css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`,
		};
	},
});
