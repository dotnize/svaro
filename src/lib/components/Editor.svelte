<script lang="ts">
	import type { ComponentConfig } from "$lib/types.js";
	import Canvas from "./Canvas.svelte";
	import ComponentList from "./ComponentList.svelte";

	interface Props {
		components: ComponentConfig[];
	}

	let { components }: Props = $props();

	// just the render functions
	const renderFunctions = new Map(components.map((c) => [c.id, c.render]));

	// components without the render functions
	const componentList = components.map(({ id, name, props }) => ({ id, name, props }));
</script>

Editor

<div class="grid grid-cols-5">
	<div class="col-span-1 border-r bg-slate-100">
		<ComponentList components={componentList} class="min-h-svh" />
	</div>

	<div class="col-span-4">
		<Canvas {renderFunctions} class="min-h-svh" />
	</div>
</div>
