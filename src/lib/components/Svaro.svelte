<script lang="ts">
	import { setConfig, setRenderFunctions } from "$lib/context/user-config.js";
	import type { ComponentConfig } from "$lib/types/config.js";
	import type { Snippet } from "svelte";

	interface Props {
		config: ComponentConfig[];
		children: Snippet;
	}

	const { config, children }: Props = $props();
	const renderFunctions = new Map(config.map((c) => [c.id, c.render]));

	setConfig(config);
	setRenderFunctions(renderFunctions);
</script>

{@render children()}
