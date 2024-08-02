<script lang="ts">
	interface Props {
		announcement: string;
		title: string;
		description: string;
		button1: string;
		button2: string;
		bgColor: string;
	}
	let props: Props = $props();
</script>

<div class="container py-24 lg:py-32" style="background-color: {props.bgColor};">
	<div class="flex justify-center">
		<a
			class="inline-flex items-center gap-x-2 rounded-full border p-1 ps-3 text-sm transition"
			href="#"
		>
			{props.announcement}
			<span
				class="bg-muted-foreground/15 inline-flex items-center justify-center gap-x-2 rounded-full px-2.5 py-1.5 text-sm font-semibold"
			>
				<svg
					class="h-4 w-4 flex-shrink-0"
					xmlns="http://www.w3.org/2000/svg"
					width={24}
					height={24}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width={2}
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="m9 18 6-6-6-6" />
				</svg>
			</span>
		</a>
	</div>
	<div class="mx-auto mt-5 max-w-2xl text-center">
		<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
			{props.title}
		</h1>
	</div>
	<div class="mx-auto mt-5 max-w-3xl text-center">
		<p class="text-muted-foreground text-xl">{props.description}</p>
	</div>
	<div class="mt-8 flex justify-center gap-3">
		<button class="rounded-xl bg-yellow-100 px-8 py-2">{props.button1}</button>
		<button class="rounded-xl border-2 px-8 py-2">
			{props.button2}
		</button>
	</div>
</div>
