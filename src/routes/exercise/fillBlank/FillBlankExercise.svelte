<script lang="ts">
	import Buttons from "../Buttons.svelte";
	import type { fillBlankExercise } from "./utils";
	export let currentExercise: fillBlankExercise;
	export let goToNext: () => void;
	let inputValue: string;
	// hardcoded for now
	const checkAnswer = () =>
		inputValue.trim().toLowerCase() === currentExercise.answer.trim().toLowerCase();
</script>

<h1>Fill in the blank</h1>
<h3>{currentExercise.question.split("#BLANK#").join("_".repeat(currentExercise.answer.length))}</h3>
<input type="text" bind:value={inputValue} />
<Buttons {goToNext} {checkAnswer} />
