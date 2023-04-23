import { shuffleArray } from "$lib/arrays";
import { describe, expect, it } from "vitest";

describe("shuffle array", () => {
	const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	const shuffledArray = shuffleArray(array);
	it("has the same length", () => {
		expect(array).toHaveLength(shuffledArray.length);
	});
	it("isn't the same order", () => {
		let isUnique = false;
		let i = 0;
		while (!isUnique && i++ < array.length) {
			if (array[i] !== shuffledArray[i]) isUnique = true;
		}
		expect(isUnique).toBe(true);
	});
	it("has the same content", () => {
		const difference = shuffledArray.filter((v) => !array.find((x) => x == v));
		expect(difference).toHaveLength(0);
	});
});
