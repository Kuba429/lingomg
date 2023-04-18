<script lang="ts">
	import type { fillBlankExercise } from "./utils";
	export let currentExercise: fillBlankExercise;
	export let goToNext: () => void;
</script>

<h1>Fill in the blank</h1>
<h3>{currentExercise.question.split("#BLANK#").join("_".repeat(currentExercise.answer.length))}</h3>
<button on:click={goToNext}>next</button>
