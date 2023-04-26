import { z } from "zod";

export const fillBlankExerciseSchema = z.object({
	type: z.literal("fillBlank"),
	question: z.string(),
	answer: z.string(),
	hint: z.string(),
});
export type fillBlankExercise = z.infer<typeof fillBlankExerciseSchema>;
