import type { fillBlankExercise } from "./fillBlank/utils";
import type { orderExercise } from "./order/utils";

export type exercise = fillBlankExercise | orderExercise;
export type exercises = {
	order: orderExercise[];
	fillBlank: fillBlankExercise[];
};

export const fetchAllExercises = () => {
	return {
		order: [
			{ type: "order", answer: "Elo elo 320", question: "Hello hello 320" },
			{ type: "order", answer: "Piję wodę", question: "I'm drinking water" },
		],
		fillBlank: [
			{
				type: "fillBlank",
				question: "Mam na #BLANK# Kuba",
				hint: "name",
				answer: "imię",
			},
		],
	} satisfies exercises;
};
