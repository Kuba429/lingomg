<script lang="ts">
	import Buttons from "../Buttons.svelte";
	import type { fillBlankExercise } from "./utils";
	export let currentExercise: fillBlankExercise;
	export let goToNext: () => void;
	let inputValue: string;
	const checkAnswer = () =>
		(inputValue ?? "").trim().toLowerCase() === currentExercise.answer.trim().toLowerCase();
</script>

<h1>Fill in the blank</h1>
<h3>{currentExercise.question.split("#BLANK#").join("_".repeat(currentExercise.answer.length))}</h3>
<input type="text" bind:value={inputValue} />
<Buttons {goToNext} {checkAnswer} />

<style lang="scss">
	@use "$lib/variables.scss" as *;
	input {
		box-sizing: border-box;
		width: 100%;
		padding: 10px;
		background-color: $neutral-800;
		font-size: 1rem;
		color: white;
		border: 2px solid $neutral-800;
		border-radius: 5px;
		transition: ease all 0.1s;
		&:hover {
			border-color: $neutral-600;
		}
		&:focus {
			border-color: $neutral-500;
			outline: none;
		}
	}
</style>
