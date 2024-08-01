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
	const { fields, name } = $derived.by(() => {
		const selectedId = page.selectedId;
		if (!selectedId) return {};

		const component = config.find((c) => c.id === selectedId.split("_copy_")[0]);
		if (!component) return {};

		return { fields: component.fields, name: component.name };
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
	{:else}
		<span class="component-name">{name}</span>
		{#each Object.entries(fields || {}) as [key, field]}
			{#if field.type === "text" || field.type === "number" || field.type === "color"}
				<Default
					type={field.type}
					label={field.label}
					oninput={field.type === "color" ? undefined : (e) => handleChange(key, e)}
					onchange={field.type === "color" ? (e) => handleChange(key, e) : undefined}
					min={field.type === "number" ? field.min : undefined}
					max={field.type === "number" ? field.max : undefined}
					step={field.type === "number" ? field.step : undefined}
					value={page.getSelectedComponentProp(key) || ""}
				/>
			{:else}
				{field.type}
			{/if}
		{/each}
		<button class="remove" type="button" onclick={() => page.removeSelectedComponent()}
			>Delete</button
		>
	{/if}
</div>

<style>
	.component-name {
		font-size: 1.25rem;
		font-weight: bold;
	}
	.remove {
		border-radius: 0.5rem;
		padding: 0.5rem 1.5rem;
		border: 1px solid red;
		color: red;
		font-size: 0.875rem;
		margin-top: 2rem;
	}
</style>
