<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements";

	interface Props extends HTMLInputAttributes {
		type: "number" | "text" | "color";
		label: string;
	}

	let { label, ...restProps }: Props = $props();
</script>

<label class="">
	{label}
	<input {...restProps} />
</label>

<style>
	label {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		font-size: 0.875rem;
	}
	/* only if not color type */
	input:not([type="color"]) {
		padding: 0.5rem;
		border: 1px solid #ccc;
		border-radius: 0.5rem;
	}
</style>
