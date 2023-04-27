import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
	//@ts-ignore dont know whats going on here; happens on a freshly initialized project so im going to leave it here for now
	plugins: [sveltekit()],
	test: {
		include: ["src/**/*.{test,spec}.{js,ts}"],
		environment: "jsdom",
		deps: { inline: ["@sveltejs/kit"] },
		setupFiles: "src/tests/setup.ts",
	},
});
