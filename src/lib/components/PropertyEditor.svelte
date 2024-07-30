<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	import { getPageState } from "$lib/context/state.svelte.js";
	import { getConfig } from "$lib/context/user-config.js";

	import Default from "$lib/fields/Default.svelte";

	interface Props extends HTMLAttributes<HTMLDivElement> {}

	let { ...restProps }: Props = $props();

	const page = getPageState();
	const config = getConfig();

	// get config of selected component
	const fields = $derived.by(() => {
		const selectedId = page.selectedId;
		if (!selectedId) return {};

		const component = config.find((c) => c.id === selectedId.split("_copy_")[0]);
		if (!component) return {};

		return component.fields;
	});

	function handleChange(
		key: string,
		e: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) {
		page.updateSelectedComponentProp(key, e.currentTarget.value);
	}
</script>

<div {...restProps}>
	{#if !page.selectedId}
		No component selected.
	{:else if !fields}
		{page.getSelectedComponent()?.id}
	{:else}
		{page.getSelectedComponent()?.id}
		{#each Object.entries(fields) as [key, field]}
			{#if field.type === "text" || field.type === "number"}
				<Default
					type={field.type}
					label={field.label}
					oninput={(e) => handleChange(key, e)}
					min={field.type === "number" ? field.min : undefined}
					max={field.type === "number" ? field.max : undefined}
					step={field.type === "number" ? field.step : undefined}
					value={page.getSelectedComponentProp(key) || ""}
				/>
			{:else}
				{field.type}
			{/if}
		{/each}
	{/if}
</div>
