import { describe, it, expect } from "vitest";
import { useOrderExercise, type orderExercise } from "../../routes/exercise/order/utils";
import { get } from "svelte/store";
import { render } from "@testing-library/svelte";
import OrderExercise from "../../routes/exercise/order/OrderExercise.svelte";
import userEvent from "@testing-library/user-event";
import { sleep } from "$lib/sleep";

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

describe("integration", () => {
	const props = {
		currentExercise: {
			type: "order",
			answer: "This is a text answer",
			question: "This is a text exercise",
		} satisfies orderExercise,
		goToNext: () => {},
	};
	it("displays words to move", () => {
		const { container } = render(OrderExercise, props);
		const itemsToChoose = container.querySelectorAll(".to-choose>.item");
		itemsToChoose.forEach((i) => expect(i).toBeInTheDocument());
	});
	it("moves item on click", async () => {
		const { container } = render(OrderExercise, props);
		// how many items at the beginning
		const toChoseLengthBefore = container.querySelectorAll(".to-choose>.item").length;
		const chosenLengthBefore = container.querySelectorAll(".chosen>.item").length;
		expect(toChoseLengthBefore).not.toBe(0);
		expect(chosenLengthBefore).toBe(0);

		// move an item
		const itemToChoose = container.querySelector(".to-choose>.item")!;
		await userEvent.click(itemToChoose);

		await sleep(1000);

		// one item should be moved
		const toChooseLengthAfter = container.querySelectorAll(".to-choose>.item").length;
		expect(toChooseLengthAfter).toBe(toChoseLengthBefore - 1);
		const chosenLengthAfter = container.querySelectorAll(".chosen>.item").length;
		expect(chosenLengthAfter).toBe(chosenLengthBefore + 1);
	});
});
