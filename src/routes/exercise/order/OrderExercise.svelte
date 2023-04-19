<script lang="ts">
	import { flip } from "svelte/animate";
	import Buttons from "../Buttons.svelte";
	import { itemAnimation, useOrderExercise, type orderExercise } from "./utils";
	export let currentExercise: orderExercise;
	export let goToNext: () => void;

	const { store, toggleWord } = useOrderExercise(currentExercise);
	const [send, receive] = itemAnimation;

	const checkAnswer = () => $store.chosen.join(" ") === currentExercise.answer;
</script>

<h1>Form the sentence:</h1>
<h3>{currentExercise.question}</h3>
<div class="container chosen">
	{#each $store.chosen as word (word)}
		<!-- TODO -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			on:click={() => toggleWord(word)}
			class="item"
			animate:flip
			in:receive={{ key: word }}
			out:send={{ key: word }}
		>
			{word}
		</div>
	{/each}
</div>
<div class="container remaining">
	{#each $store.toChoose as word (word)}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			on:click={() => toggleWord(word)}
			class="item"
			animate:flip={{ duration: 350 }}
			in:receive={{ key: word }}
			out:send={{ key: word }}
		>
			{word}
		</div>
	{/each}
</div>
<Buttons {checkAnswer} {goToNext} />

<style lang="scss">
	@use "$lib/variables.scss" as *;
	h1 {
		color: $neutral-400;
	}
	.container {
		border-radius: 10px;
		margin: auto;
		//width: 50%;
		min-height: 3rem;
		height: fit-content;
		padding: 10px;
		background-color: $neutral-800;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		column-gap: 1rem;
		row-gap: 0.5rem;
	}
	.container.chosen {
		margin-block: 1rem;
		gap: 0.2rem;
		position: relative;
		padding-top: 10px;
		justify-content: flex-start;
	}
	.item {
		height: fit-content;
		padding: 5px 10px;
		border-radius: 8px;
		background-color: $neutral-700;
		cursor: pointer;
		border: 2px solid $neutral-800;
		z-index: 2;
		&:hover {
			border-color: $neutral-500;
		}
	}
</style>
