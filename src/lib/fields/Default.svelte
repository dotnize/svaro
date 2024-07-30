<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements";

	interface Props extends HTMLInputAttributes {
		type: "number" | "text";
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
	}
	input {
		padding: 0.5rem;
		border: 1px solid #ccc;
		border-radius: 0.5rem;
	}
</style>
