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

<div class={`buttons ${status}`}>
	{#if status === "idle"}
		<button class="skip" on:click={goToNext}>Skip</button>
		<button class="done" on:click={doneHandler}>Done</button>
	{:else if status === "correct"}
		<div>
			<h3>Correct</h3>
			<p>Well done!</p>
		</div>
		<button on:click={goToNext}>Next</button>
	{:else}
		<div>
			<h3>Wrong</h3>
			<p>Try again</p>
		</div>
		<button on:click={goToNext}>Next</button>
	{/if}
</div>

<style lang="scss">
	@use "$lib/variables.scss" as *;
	$green: #3bbf5e;
	$green-transparent: #3bbf5e22;
	$red: #f53b4d;
	$red-transparent: #f53b4d22;
	.buttons {
		margin-top: 1rem;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
		border-radius: 10px;
		transition: ease all 0.3s;
		border: 1px solid transparent;
	}
	.buttons.correct {
		background-color: $green-transparent;
		border-color: $green;
		justify-content: space-between;
		& button {
			align-self: flex-end;
			background-color: $green;
			color: white;
		}
	}
	.buttons.wrong {
		background-color: $red-transparent;
		border-color: $red;
		justify-content: space-between;
		& button {
			align-self: flex-end;
			background-color: $red;
			color: white;
		}
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
	h3 {
		margin-top: 0;
	}
	p {
		padding: 0;
		margin: 0;
	}
</style>
