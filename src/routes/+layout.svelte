<script>
	import "../app.css";
	const { children } = $props();
</script>

<svelte:head>
	<title>Svaro Playground</title>
</svelte:head>

{@render children()}
