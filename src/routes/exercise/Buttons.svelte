<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import { browser } from "$app/environment";

	export let goToNext: () => void;
	export let checkAnswer: () => boolean;

	let status: "idle" | "correct" | "wrong" = "idle";

	const doneHandler = () => {
		if (checkAnswer()) status = "correct";
		else status = "wrong";
	};

	const mountCallback = (e: KeyboardEvent) => {
		if (e.key !== "Enter") return;
		if (status === "idle") doneHandler();
		else goToNext();
	};
	onMount(() => browser && document.addEventListener("keypress", mountCallback));
	onDestroy(() => browser && document.removeEventListener("keypress", mountCallback));
</script>

{#if status === "idle"}
	<div class="buttons">
		<button class="skip" on:click={goToNext}>Skip</button>
		<button class="done" on:click={doneHandler}>Done</button>
	</div>
{:else if status === "correct"}
	<div>correct</div>
	<button on:click={goToNext}>next</button>
{:else}
	<div>wrong</div>
{/if}

<style lang="scss">
	@use "$lib/variables.scss" as *;
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
