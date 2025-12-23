<script lang="ts">
	import { Progress, useId } from 'bits-ui';
	import { onMount, type ComponentProps, type Snippet } from 'svelte';
	import { cubicInOut } from 'svelte/easing';
	import { Tween } from 'svelte/motion';

	let {
		max,
		value,
		min,
		startElement,
		endElement,
		colour
	}: ComponentProps<typeof Progress.Root> & {
		startElement?: Snippet;
		endElement?: Snippet;
		colour: string;
	} = $props();

	const labelId = useId();
	const tween = new Tween(0, { duration: 1000, easing: cubicInOut });

	// Animate progress bar after 250ms
	onMount(() => {
		const timer = setTimeout(() => tween.set(value || 0), 250);
		return () => {
			clearTimeout(timer);
		};
	});
</script>

<Progress.Root
	aria-labelledby={labelId}
	value={Math.round(tween.current)}
	{max}
	{min}
	class="w-full"
>
	<div class="flex flex-row justify-between gap-x-2 text-lg">
		{#if startElement}
			{@render startElement()}
		{/if}

		<div class="mx-4 w-full self-center overflow-hidden rounded-full bg-neutral-800">
			<div class="h-4 rounded-l-full {colour}" style="width: {Math.round(tween.current)}%"></div>
		</div>

		{#if endElement}
			{@render endElement()}
		{/if}
	</div>
</Progress.Root>
