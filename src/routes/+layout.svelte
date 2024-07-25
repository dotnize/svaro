<script>
	import "../app.css";
	const { children } = $props();
</script>

<svelte:head>
	<title>Sveltor - Visual editor for Svelte 5</title>
</svelte:head>

{@render children()}
