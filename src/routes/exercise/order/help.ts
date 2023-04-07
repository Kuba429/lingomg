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
export const getExerciseData = (question: orderExercise) => {
	const misleadingWords = shuffleArray([
		"jest",
		"teraz",
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
	return { chosen: [] as string[], toChoose: shuffleArray(toChoose) };
};
