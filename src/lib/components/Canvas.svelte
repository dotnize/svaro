<script lang="ts">
	import { dndzone, type DndEvent } from "svelte-dnd-action";
	import { flip } from "svelte/animate";
	import type { HTMLAttributes } from "svelte/elements";

	const flipDurationMs = 150;

	let props: HTMLAttributes<HTMLDivElement> = $props();

	let page = $state<any>([]);

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
	{...props}
>
	{#each page as component (component.id)}
		<div animate:flip={{ duration: flipDurationMs }}>
			<svelte:component this={component.render} {...component.props} class="pointer-events-none" />
		</div>
	{/each}
</div>
