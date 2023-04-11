<script lang="ts">
	import { flip } from "svelte/animate";
	import { itemAnimation, useOrderExercise, type orderExercise } from "./utils";
	export let currentExercise: orderExercise;
	export let goToNext: () => void;

	const { store, toggleWord } = useOrderExercise(currentExercise);
	const [send, receive] = itemAnimation;
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
			animate:flip
			in:receive={{ key: word }}
			out:send={{ key: word }}
		>
			{word}
		</div>
	{/each}
</div>
<div class="buttons">
	<button class="skip" on:click={goToNext}>Skip</button>
	<button class="done" on:click={goToNext}>Done</button>
</div>

<style lang="scss">
	@use "$lib/variables.scss" as *;
	.container {
		height: 3rem;
		padding: 10px;
		background-color: $neutral-800;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem;
	}
	.container.chosen {
		margin-block: 1rem;
	}
	.item {
		height: fit-content;
		padding: 5px 10px;
		border-radius: 8px;
		background-color: $neutral-700;
		cursor: pointer;
		border: 2px solid $neutral-800;
		&:hover {
			border-color: $neutral-500;
		}
	}
	.buttons {
		margin-top: 1rem;
		display: flex;
		justify-content: flex-end;
		gap: 1rem;
	}
	button {
		background-color: $neutral-200;
		color: $neutral-900;
		border: none;
		padding: 8px 10px;
		font-size: 0.8rem;
		border-radius: 5px;
		transition: ease 0.1s all;
		cursor: pointer;
		border: 1px solid $neutral-800;
		&:hover {
			background-color: $neutral-300;
			border-color: $neutral-100;
		}
	}
</style>
