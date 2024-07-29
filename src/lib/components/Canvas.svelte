<script lang="ts">
	import { createPageState } from "$lib/context/state.svelte.js";
	import { getRenderFunctions } from "$lib/context/user-config.js";
	import type { SerializableComponent } from "$lib/types/config.js";
	import { dndzone, type DndEvent } from "svelte-dnd-action";
	import { flip } from "svelte/animate";
	import type { HTMLAttributes } from "svelte/elements";

	const flipDurationMs = 100;

	interface Props extends HTMLAttributes<HTMLDivElement> {}

	let { ...restProps }: Props = $props();

	const renderFunctions = getRenderFunctions();

	const page = createPageState();

	function handlePageConsider(e: CustomEvent<DndEvent<SerializableComponent>>) {
		page.tree = e.detail.items;
	}

	function handlePageFinalize(e: CustomEvent<DndEvent<SerializableComponent>>) {
		page.tree = e.detail.items;
	}

	$inspect(page.tree);
	$inspect(page.selectedId);
</script>

<div
	use:dndzone={{ items: page.tree, flipDurationMs, morphDisabled: true }}
	onconsider={handlePageConsider}
	onfinalize={handlePageFinalize}
	{...restProps}
>
	{#each page.tree as component, idx (component.id)}
		<div
			animate:flip={{ duration: flipDurationMs }}
			class="draggable {page.selectedId === component.id ? 'selected' : ''}"
			onclick={() => page.setSelectedId(component.id)}
			onkeydown={(e) => {
				if (e.key === "Delete") {
					page.tree = page.tree.filter((c) => c.id !== component.id);
				}
			}}
			tabindex={idx}
			role="button"
		>
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
	.draggable {
		min-height: 1rem;
	}
	.draggable:hover {
		background-color: rgba(0, 0, 0, 0.12);
	}
	.selected {
		outline: 1px solid blue;
	}

	.no-click {
		pointer-events: none;
	}
</style>
