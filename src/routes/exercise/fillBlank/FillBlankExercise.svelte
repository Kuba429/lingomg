<script lang="ts">
	import Buttons from "../Buttons.svelte";
	import type { fillBlankExercise } from "./utils";
	export let currentExercise: fillBlankExercise;
	export let goToNext: () => void;
	// hardcoded for now
	const checkAnswer = () => true;
</script>

<h1>Fill in the blank</h1>
<h3>{currentExercise.question.split("#BLANK#").join("_".repeat(currentExercise.answer.length))}</h3>
<Buttons {goToNext} {checkAnswer} />
