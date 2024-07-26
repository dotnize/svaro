<script lang="ts">
	import type { ComponentData } from "$lib/types.js";
	import {
		dndzone,
		SHADOW_ITEM_MARKER_PROPERTY_NAME,
		TRIGGERS,
		type DndEvent,
	} from "svelte-dnd-action";
	import { flip } from "svelte/animate";
	import type { HTMLAttributes } from "svelte/elements";

	const flipDurationMs = 150;

	interface Props extends HTMLAttributes<HTMLDivElement> {
		components: ComponentData[];
	}

	let { components, ...restProps }: Props = $props();

	// TODO: properly type DndEvent<> for SHADOW_ITEM_MARKER_PROPERTY_NAME
	function handleComponentSourceConsider(e: CustomEvent<DndEvent<any>>) {
		const { trigger, id } = e.detail.info;
		if (trigger === TRIGGERS.DRAG_STARTED) {
			const idx = components.findIndex((c) => c.id === id);
			const newId = `${id.split("_copy_")[0]}_copy_${Math.round(Math.random() * 100000)}`;

			e.detail.items = e.detail.items.filter((item) => !item[SHADOW_ITEM_MARKER_PROPERTY_NAME]);
			e.detail.items.splice(idx, 0, { ...components[idx], id: newId });
			components = e.detail.items;
		}
	}

	function handleComponentSourceFinalize(e: CustomEvent<DndEvent<ComponentData>>) {
		components = e.detail.items;
	}
</script>

<div
	use:dndzone={{ items: components, flipDurationMs }}
	onconsider={handleComponentSourceConsider}
	onfinalize={handleComponentSourceFinalize}
	{...restProps}
>
	{#each components as component (component.id)}
		<div class="w-fit border-2 border-black p-1" animate:flip={{ duration: flipDurationMs }}>
			{component.name}
		</div>
	{/each}
</div>
