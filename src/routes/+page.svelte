<script lang="ts">
	import PropertyEditor from "$lib/components/PropertyEditor.svelte";
	import { Canvas, ComponentList, Svaro, type ComponentConfig } from "$lib/index.js";

	import Button from "./example/Button.svelte";
	import Heading from "./example/Heading.svelte";
	import Hero from "./example/Hero.svelte";
	import Navbar from "./example/Navbar.svelte";

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
		{
			id: "hero",
			name: "Hero",
			render: Hero,
			fields: {
				announcement: { label: "Announcement", type: "text", defaultValue: "New" },
				title: { label: "Title", type: "text", defaultValue: "Hello world" },
				description: {
					label: "Description",
					type: "text",
					defaultValue: "This is a hero component",
				},
				button1: { label: "Button 1", type: "text", defaultValue: "Button 1" },
				button2: { label: "Button 2", type: "text", defaultValue: "Button 2" },
				bgColor: { label: "Background color", type: "color", defaultValue: "#f0f0f0" },
			},
		},
		{
			id: "navbar",
			name: "Navbar",
			render: Navbar,
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
