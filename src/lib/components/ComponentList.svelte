<script lang="ts">
	import { getConfig } from "$lib/context/user-config.js";
	import type { SerializableComponent } from "$lib/types/config.js";
	import {
		dndzone,
		SHADOW_ITEM_MARKER_PROPERTY_NAME,
		TRIGGERS,
		type DndEvent,
	} from "svelte-dnd-action";
	import { flip } from "svelte/animate";
	import type { HTMLAttributes } from "svelte/elements";

	const flipDurationMs = 100;

	interface Props extends HTMLAttributes<HTMLDivElement> {}

	let { ...restProps }: Props = $props();

	const components = getConfig();

	let serializableComponents: SerializableComponent[] = $state(
		components.map(({ id }) => ({
			id,
			props: {},
		}))
	);

	// TODO: properly type DndEvent<> for SHADOW_ITEM_MARKER_PROPERTY_NAME
	function handleComponentSourceConsider(e: CustomEvent<DndEvent<any>>) {
		const { trigger, id } = e.detail.info;
		if (trigger === TRIGGERS.DRAG_STARTED) {
			const idx = serializableComponents.findIndex((c) => c.id === id);
			const newId = `${id.split("_copy_")[0]}_copy_${Math.round(Math.random() * 100000)}`;

			e.detail.items = e.detail.items.filter((item) => !item[SHADOW_ITEM_MARKER_PROPERTY_NAME]);
			e.detail.items.splice(idx, 0, { ...serializableComponents[idx], id: newId });
			serializableComponents = e.detail.items;
		}
	}

	function handleComponentSourceFinalize(e: CustomEvent<DndEvent<SerializableComponent>>) {
		serializableComponents = e.detail.items;
	}
</script>

<div
	use:dndzone={{ items: serializableComponents, flipDurationMs }}
	onconsider={handleComponentSourceConsider}
	onfinalize={handleComponentSourceFinalize}
	{...restProps}
>
	{#each serializableComponents as component (component.id)}
		<div class="draggable" animate:flip={{ duration: flipDurationMs }}>
			{components.find((c) => c.id === component.id.split("_copy_")[0])?.name}
		</div>
	{/each}
</div>

<style>
	.draggable {
		background-color: lightgray;
		border: solid 1px black;
		display: flex;
		justify-content: center;
		align-items: center;
		min-width: 128px;
		width: fit-content;
		padding: 8px;
		border-radius: 6px;
		font-weight: 600;
	}
</style>
