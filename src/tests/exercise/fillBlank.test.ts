import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import FillBlankExercise from "../../routes/exercise/fillBlank/FillBlankExercise.svelte";
import type { fillBlankExercise } from "../../routes/exercise/fillBlank/utils";

describe("component", () => {
	const props = {
		goToNext: () => {},
		currentExercise: {
			type: "fillBlank",
			question: "Fill the #BLANK# with a word",
			answer: "gap",
			hint: "gap hint",
		} satisfies fillBlankExercise,
	};
	it("mounts", () => {
		const { container } = render(FillBlankExercise, props);
		const el = container.querySelector(".sentence");
		expect(el).toBeInTheDocument();
	});
	it("turns BLANK into underscores", () => {
		render(FillBlankExercise, props);
		const blankSpotLength = props.currentExercise.answer.length;
		const blankSpot = "_".repeat(blankSpotLength);
		const element = screen.getByText(blankSpot, { exact: false });
		expect(element).toBeInTheDocument();
	});
});
