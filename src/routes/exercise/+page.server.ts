import { shuffleArray } from "$lib/arrays";
import { randomInt } from "$lib/random";
import type { PageServerLoad } from "./$types";
import { fetchAllExercises, type exercise } from "./exercises";

export const load = (async () => {
	const groups = Object.values(fetchAllExercises());
	const exercisesToSend: exercise[] = [];
	let howManyLeft = 5;
	while (howManyLeft > 0 && groups.length > 0) {
		// flattening the array would be much easier but i believe doing it this way is better and faster (especially when more exercises are added)
		const groupIndex = randomInt(0, groups.length - 1);
		const group = groups[groupIndex];
		if (group.length < 1) {
			groups.splice(groupIndex, 1);
			continue;
		}
		const randomExIndex = randomInt(0, group.length - 1);
		exercisesToSend.push(group.splice(randomExIndex, 1)[0]);
		howManyLeft--;
	}
	return {
		exerciseData: shuffleArray(exercisesToSend),
	};
}) satisfies PageServerLoad;
