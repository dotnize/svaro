<script lang="ts">
	import type { Snippet } from "svelte";

	import { createPageState } from "$lib/context/state.svelte.js";
	import { setConfig, setRenderFunctions } from "$lib/context/user-config.js";
	import type { ComponentConfig } from "$lib/types/config.js";

	interface Props {
		config: ComponentConfig[];
		children: Snippet;
	}

	const { config, children }: Props = $props();
	const renderFunctions = new Map(config.map((c) => [c.id, c.render]));

	setConfig(config);
	setRenderFunctions(renderFunctions);
	createPageState();
</script>

{@render children()}
