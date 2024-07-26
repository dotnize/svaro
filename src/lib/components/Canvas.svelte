<script lang="ts">
	import type { ComponentData, RenderFunctions } from "$lib/types.js";
	import { dndzone, type DndEvent } from "svelte-dnd-action";
	import { flip } from "svelte/animate";
	import type { HTMLAttributes } from "svelte/elements";

	const flipDurationMs = 150;

	interface Props extends HTMLAttributes<HTMLDivElement> {
		renderFunctions: RenderFunctions;
	}

	let { renderFunctions, ...restProps }: Props = $props();

	let page = $state<ComponentData[]>([]);

	function handlePageConsider(e: CustomEvent<DndEvent>) {
		page = e.detail.items as any;
	}

	function handlePageFinalize(e: CustomEvent<DndEvent>) {
		page = e.detail.items as any;
	}

	$inspect(page);
</script>

<div
	use:dndzone={{ items: page }}
	onconsider={handlePageConsider}
	onfinalize={handlePageFinalize}
	{...restProps}
>
	{#each page as component (component.id)}
		<div animate:flip={{ duration: flipDurationMs }}>
			<div style="pointer-events: none;">
				<svelte:component
					this={renderFunctions.get(component.id.split("_copy_")[0])}
					{...component.props}
				/>
			</div>
		</div>
	{/each}
</div>
