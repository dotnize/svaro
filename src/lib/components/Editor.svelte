<script lang="ts">
	import type { Component } from "svelte";
	import {
		dndzone,
		TRIGGERS,
		type DndEvent,
		SHADOW_ITEM_MARKER_PROPERTY_NAME,
	} from "svelte-dnd-action";
	import { flip } from "svelte/animate";
	const flipDurationMs = 150;

	interface Props {
		components: { id: string; name: string; render: Component; props?: any }[];
	}

	interface Page {
		components: { id: string; name: string; props: any }[];
	}

	let { components }: Props = $props();

	let page = $state<typeof components>([]);

	function handleComponentSourceConsider(e: CustomEvent<DndEvent>) {
		const { trigger, id } = e.detail.info;
		if (trigger === TRIGGERS.DRAG_STARTED) {
			const idx = components.findIndex((c) => c.id === id);
			const newId = `${id.split("_copy_")[0]}_copy_${Math.round(Math.random() * 100000)}`;

			e.detail.items = e.detail.items.filter((item) => !item[SHADOW_ITEM_MARKER_PROPERTY_NAME]);
			e.detail.items.splice(idx, 0, { ...components[idx], id: newId });
			components = e.detail.items as any;
		}
	}

	function handleComponentSourceFinalize(e: CustomEvent<DndEvent>) {
		components = e.detail.items as any;
	}

	function handlePageConsider(e: CustomEvent<DndEvent>) {
		page = e.detail.items as any;
	}

	function handlePageFinalize(e: CustomEvent<DndEvent>) {
		page = e.detail.items as any;
	}

	$inspect(page);
</script>

Editor

<div class="grid grid-cols-5">
	<div class="col-span-1 border-r bg-slate-100">
		<div
			class="min-h-svh"
			use:dndzone={{ items: components, flipDurationMs }}
			onconsider={handleComponentSourceConsider}
			onfinalize={handleComponentSourceFinalize}
		>
			{#each components as component (component.id)}
				<div class="w-fit border-2 p-1" animate:flip={{ duration: flipDurationMs }}>
					{component.name}
				</div>
			{/each}
		</div>
	</div>

	<div class="col-span-4">
		<div
			class="min-h-svh"
			use:dndzone={{ items: page }}
			onconsider={handlePageConsider}
			onfinalize={handlePageFinalize}
		>
			{#each page as component (component.id)}
				<div animate:flip={{ duration: flipDurationMs }}>
					<svelte:component
						this={component.render}
						{...component.props}
						class="pointer-events-none"
					/>
				</div>
			{/each}
		</div>
	</div>
</div>
