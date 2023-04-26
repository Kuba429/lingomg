import { randomInt } from "$lib/random";
import { describe, expect, it } from "vitest";

describe("randomInt", () => {
	it("doesn't return the same number every time", () => {
		const set = new Set<number>();
		for (let i = 0; i < 20; i++) {
			set.add(randomInt(10, 100));
		}
		expect([...set.values()].length).toBeGreaterThan(1);
	});
	it("returns numbers withing given range", () => {
		for (let i = 0; i < 5; i++) {
			const min = 10;
			const max = 15;
			const randomNumber = randomInt(min, max);
			expect(randomNumber).toBeGreaterThanOrEqual(min);
			expect(randomNumber).toBeLessThanOrEqual(max);
		}
		for (let i = 0; i < 5; i++) {
			const min = 100;
			const max = 101;
			const randomNumber = randomInt(min, max);
			expect(randomNumber).toBeGreaterThanOrEqual(min);
			expect(randomNumber).toBeLessThanOrEqual(max);
		}
	});
});
