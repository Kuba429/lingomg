<slot />

<style lang="scss">
	@use "$lib/variables.scss" as *;
	:global(body) {
		background-color: $neutral-900;
		&,
		& * {
			color: white;
		}
	}
</style>
