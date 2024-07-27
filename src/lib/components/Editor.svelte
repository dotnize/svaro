<script lang="ts">
	import type { ComponentConfig } from "$lib/types/config.js";
	import Canvas from "./Canvas.svelte";
	import ComponentList from "./ComponentList.svelte";

	interface Props {
		components: ComponentConfig[];
	}

	let { components }: Props = $props();

	// just the render functions
	const renderFunctions = new Map(components.map((c) => [c.id, c.render]));
</script>

Editor

<div class="grid grid-cols-5">
	<div class="col-span-1 border-r bg-slate-100">
		<ComponentList {components} class="min-h-svh" />
	</div>

	<div class="col-span-4">
		<Canvas {renderFunctions} class="min-h-svh" />
	</div>
</div>
