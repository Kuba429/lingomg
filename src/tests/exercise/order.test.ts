import { describe, it, expect } from "vitest";
import { useOrderExercise, type orderExercise } from "../../routes/exercise/order/utils";
import { get } from "svelte/store";

describe("order exercise hook", () => {
	const exercise: orderExercise = {
		type: "order",
		answer: "Elo elo 320",
		question: "Hello hello 320",
	};
	const { store, toggleWord } = useOrderExercise(exercise);
	const storeValue = get(store);
	it("returns shuffled array", () => {
		expect(storeValue.toChoose).not.toHaveLength(0);
	});
	it("moves item from toChoose to chosen on toggle", () => {
		const toChooseBefore = storeValue.toChoose.length;
		const chosenBefore = storeValue.chosen.length;
		toggleWord(storeValue.toChoose[0]);
		expect(storeValue.toChoose).toHaveLength(toChooseBefore - 1);
		expect(storeValue.chosen).toHaveLength(chosenBefore + 1);
	});
});
