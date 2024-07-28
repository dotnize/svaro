<script lang="ts">
	import { Canvas, ComponentList, Svaro, type ComponentConfig } from "$lib/index.js";

	import Button from "./example/Button.svelte";
	import Heading from "./example/Heading.svelte";

	const config: ComponentConfig[] = [
		{
			id: "button",
			name: "Button",
			render: Button,
			fields: {
				title: { label: "Title", type: "text" },
				padding: { label: "Padding", type: "number", step: 1 },
			},
		},
		{ id: "heading", name: "Heading", render: Heading },
	];
</script>

<Svaro {config}>
	<div class="grid grid-cols-7">
		<ComponentList
			class="col-span-1 flex min-h-svh flex-col items-center gap-2 border-r bg-gray-100 p-8"
		/>
		<Canvas class="col-span-6 min-h-svh" />
	</div>
</Svaro>
