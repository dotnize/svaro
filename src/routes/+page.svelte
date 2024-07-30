<script lang="ts">
	import PropertyEditor from "$lib/components/PropertyEditor.svelte";
	import { Canvas, ComponentList, Svaro, type ComponentConfig } from "$lib/index.js";

	import Button from "./example/Button.svelte";
	import Heading from "./example/Heading.svelte";

	const config: ComponentConfig[] = [
		{
			id: "button",
			name: "Button",
			render: Button,
			fields: {
				text: { label: "Text", type: "text", defaultValue: "Hello world" },
				padding: { label: "Padding (px)", type: "number", step: 2, defaultValue: 4 },
			},
		},
		{
			id: "heading",
			name: "Heading",
			render: Heading,
			fields: { text: { label: "Text", type: "text" } },
		},
	];
</script>

<Svaro {config}>
	<div class="flex">
		<ComponentList class="flex min-h-svh flex-col items-center gap-2 border-r bg-gray-100 p-8" />
		<Canvas class="mx-0.5 flex-1" />
		<PropertyEditor class="flex min-w-72 flex-col gap-2 border-l bg-gray-100 p-6" />
	</div>
</Svaro>
