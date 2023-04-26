import { render, screen } from "@testing-library/svelte";
import Buttons from "../../routes/exercise/Buttons.svelte";
import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";

describe("buttons component", () => {
	const props = { goToNext: () => {}, checkAnswer: () => true, currentExerciseAnswer: "answer" };
	it("mounts", () => {
		const { container } = render(Buttons, { props });
		const el = container.querySelector(".buttons");
		expect(el).toBeInTheDocument();
	});
	it("has 'wrong' class when answer in wrong", async () => {
		const { container } = render(Buttons, { ...props, checkAnswer: () => false });
		const el = container.querySelector(".buttons");
		const doneButton = screen.getByText("Done");

		expect(el).not.toHaveClass("wrong");
		await userEvent.click(doneButton);
		expect(el).toHaveClass("wrong");

		// back to idle when "Next" is clicked
		const nextButton = screen.getByText("Next");
		expect(nextButton).toBeInTheDocument();
	});
	it("has 'correct' class when answer in correct", async () => {
		const { container } = render(Buttons, { props });
		const el = container.querySelector(".buttons");
		const doneButton = screen.getByText("Done");

		expect(el).not.toHaveClass("correct");
		await userEvent.click(doneButton);
		expect(el).toHaveClass("correct");

		const nextButton = screen.getByText("Next");
		expect(nextButton).toBeInTheDocument();
	});
});
