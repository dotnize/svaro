<script lang="ts">
	import { getRenderFunctions } from "$lib/context/config.js";
	import type { SerializableComponent } from "$lib/types/config.js";
	import { dndzone, type DndEvent } from "svelte-dnd-action";
	import { flip } from "svelte/animate";
	import type { HTMLAttributes } from "svelte/elements";

	const flipDurationMs = 150;

	interface Props extends HTMLAttributes<HTMLDivElement> {}

	let { ...restProps }: Props = $props();

	const renderFunctions = getRenderFunctions();

	let canvasData = $state<SerializableComponent[]>([]);

	function handlePageConsider(e: CustomEvent<DndEvent<SerializableComponent>>) {
		canvasData = e.detail.items;
	}

	function handlePageFinalize(e: CustomEvent<DndEvent<SerializableComponent>>) {
		canvasData = e.detail.items;
	}

	$inspect(canvasData);
</script>

<div
	use:dndzone={{ items: canvasData }}
	onconsider={handlePageConsider}
	onfinalize={handlePageFinalize}
	{...restProps}
>
	{#each canvasData as component (component.id)}
		<div animate:flip={{ duration: flipDurationMs }} class="draggable">
			<div class="no-click">
				<svelte:component
					this={renderFunctions.get(component.id.split("_copy_")[0])}
					{...component.props}
				/>
			</div>
		</div>
	{/each}
</div>

<style>
	.draggable:hover {
		background-color: rgba(0, 0, 0, 0.12);
	}

	.no-click {
		pointer-events: none;
	}
</style>
