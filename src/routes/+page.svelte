<script lang="ts">
	import Editor from "$lib/components/Editor.svelte";
	import type { ComponentConfig } from "$lib/types/config.js";

	import Button from "./example/Button.svelte";
	import Heading from "./example/Heading.svelte";

	const components: ComponentConfig[] = [
		{
			id: "button",
			name: "Button",
			render: Button,
			fields: {
				title: { label: "Title", type: "text" },
				padding: { label: "Padding", type: "number", step: 1 },
			},
			defaultProps: {
				asd: "asd", // TODO: should error since not in fields
			},
		},
		{ id: "heading", name: "Heading", render: Heading },
	];
</script>

<Editor {components} />
