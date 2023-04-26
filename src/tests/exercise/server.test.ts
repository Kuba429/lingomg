import { describe, it } from "vitest";
import { fetchAllExercises, type exercise } from "../../routes/exercise/+page.server";
import { orderExerciseSchema } from "../../routes/exercise/order/utils";
import { fillBlankExerciseSchema } from "../../routes/exercise/fillBlank/utils";

describe("questions", () => {
	it("exercises have proper types", async () => {
		const exerciseData = fetchAllExercises();
		Object.values(exerciseData)
			.flat()
			.forEach((q: exercise) => {
				switch (q.type) {
					case "order":
						orderExerciseSchema.parse(q);
						break;
					case "fillBlank":
						fillBlankExerciseSchema.parse(q);
						break;
					default:
						throw "type not defined";
				}
			});
	});
});
