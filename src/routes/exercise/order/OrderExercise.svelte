<script lang="ts">
	import { flip } from "svelte/animate";
	import { itemAnimation, useOrderExercise, type orderExercise } from "./utils";
	export let currentExercise: orderExercise;

	const { store, toggleWord } = useOrderExercise(currentExercise);

	const [send, receive] = itemAnimation;
</script>

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

<style lang="scss">
	@use "$lib/variables.scss" as *;
	.container {
		padding: 10px;
		background-color: $neutral-50;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 1rem;
	}
	.container.chosen {
		margin-block: 1rem;
		height: 3rem;
	}
	.item {
		height: fit-content;
		padding: 5px 10px;
		border-radius: 8px;
		background-color: $neutral-200;
	}
</style>
