<script lang="ts">
	import type { orderExercise } from "./order/utils";
	import { fly } from "svelte/transition";

	import OrderExercise from "./order/OrderExercise.svelte";

	const exerciseData: orderExercise[] = [
		{ type: "order", answer: "Elo elo 320", question: "Hello hello 320" },
		{ type: "order", answer: "Piję wodę", question: "I'm drinking water" },
	];
	let currentExerciseIndex = 0;
	let currentExercise = exerciseData[currentExerciseIndex];
	const goToNext = () => {
		if (currentExerciseIndex + 1 >= exerciseData.length) currentExerciseIndex = 0;
		else currentExerciseIndex++;
	};
	$: currentExercise = exerciseData[currentExerciseIndex];
</script>

<h1>Exercise</h1>
<div class="key-container">
	{#key currentExercise}
		<div in:fly={{ x: 1000 }} out:fly={{ x: -200 }}>
			{#if currentExercise.type === "order"}
				<OrderExercise {currentExercise} {goToNext} />
			{:else}
				<div>abc</div>
			{/if}
		</div>
	{/key}
</div>

<style lang="scss">
	.key-container {
		display: grid;
		& div {
			grid-column-start: 1;
			grid-column-end: 2;
			grid-row-start: 1;
			grid-row-end: 2;
		}
	}
</style>
