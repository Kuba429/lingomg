export const shuffleArray = <T>(arr: T[]) => {
	return arr
		.map((item) => ({ index: Math.random() * 10, data: item }))
		.sort((a, b) => a.index - b.index)
		.map((item) => item.data);
};
