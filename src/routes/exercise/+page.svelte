<script lang="ts">
	import OrderExercise from "./order/OrderExercise.svelte";
	import FillBlankExercise from "./fillBlank/FillBlankExercise.svelte";
	import { fly } from "svelte/transition";
	import type { PageData } from "./$types";
	import type { exercise } from "./exercises";

	export let data: PageData;
	const exerciseData: exercise[] = data.exerciseData;
	let currentExerciseIndex = 0;
	let currentExercise = exerciseData[currentExerciseIndex];
	const goToNext = () => {
		if (currentExerciseIndex + 1 >= exerciseData.length) currentExerciseIndex = 0;
		else currentExerciseIndex++;
	};
	$: currentExercise = exerciseData[currentExerciseIndex];
</script>

<div class="key-container">
	{#key currentExercise}
		<div in:fly={{ x: 1000 }} out:fly={{ x: -200 }}>
			{#if currentExercise.type === "order"}
				<OrderExercise {currentExercise} {goToNext} />
			{:else if currentExercise.type === "fillBlank"}
				<FillBlankExercise {currentExercise} {goToNext} />
			{:else}
				<div>abc</div>
			{/if}
		</div>
	{/key}
</div>

<style lang="scss">
	.key-container {
		display: grid;
		width: 60%;
		margin: auto;
		& div {
			grid-column-start: 1;
			grid-column-end: 2;
			grid-row-start: 1;
			grid-row-end: 2;
		}
	}
</style>
