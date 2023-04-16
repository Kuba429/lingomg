<slot />

<style lang="scss">
	@use "$lib/variables.scss" as *;
	:global(body) {
		font-family: lato;
		background-color: $neutral-900;
		&,
		& * {
			color: white;
		}
	}
</style>
