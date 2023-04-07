<script lang="ts">
	import type { orderExercise } from "./order/utils";

	import OrderExercise from "./order/OrderExercise.svelte";

	const exerciseData: orderExercise[] = [
		{ type: "order", answer: "Elo elo 320", question: "Hello hello 320" },
	];
	let currentExerciseIndex = 0;
	let currentExercise = exerciseData[currentExerciseIndex];
	$: currentExercise = exerciseData[currentExerciseIndex];
</script>

<h1>Exercise</h1>
{#if currentExercise.type === "order"}
	<OrderExercise {currentExercise} />
{/if}
