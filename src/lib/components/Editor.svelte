<script lang="ts">
	import type { Component } from "svelte";
	import Canvas from "./Canvas.svelte";
	import ComponentList from "./ComponentList.svelte";

	interface Props {
		components: { id: string; name: string; render: Component; props?: any }[];
	}

	let { components }: Props = $props();
</script>

Editor

<div class="grid grid-cols-5">
	<div class="col-span-1 border-r bg-slate-100">
		<ComponentList {components} class="min-h-svh" />
	</div>

	<div class="col-span-4">
		<Canvas class="min-h-svh" />
	</div>
</div>
