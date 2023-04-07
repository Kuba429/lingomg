<script lang="ts">
	import { writable } from "svelte/store";
	import { getExerciseData, type orderExercise } from "./help";
	export let currentExercise: orderExercise;

	const question = writable(getExerciseData(currentExercise));
</script>

<h3>{currentExercise.question}</h3>
<div class="container chosen">
	{#each $question.chosen as word}
		<div>{word}</div>
	{/each}
</div>
<div class="container remaining">
	{#each $question.toChoose as word}
		<div>{word}</div>
	{/each}
</div>

<style lang="scss">
	@use "../../../variables.scss" as *;
	.container {
		padding: 10px;
		background-color: $orange-400;
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}
	.container.chosen {
		margin-block: 1rem;
		height: 3rem;
	}
</style>
