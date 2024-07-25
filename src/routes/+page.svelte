<script lang="ts">
	import Editor from "$lib/components/Editor.svelte";

	import Button from "./example/Button.svelte";
	import Heading from "./example/Heading.svelte";

	const components = [
		{ id: "button", name: "Button", render: Button },
		{ id: "heading", name: "Heading", render: Heading },
	];
</script>

<Editor {components} />
