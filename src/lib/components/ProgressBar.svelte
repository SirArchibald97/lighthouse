<script lang="ts">
	import { Progress, useId } from 'bits-ui';
	import { onMount, type ComponentProps } from 'svelte';
	import { cubicInOut } from 'svelte/easing';
	import { Tween } from 'svelte/motion';

	let {
		max,
		value,
		min,
		start,
		end,
		colour
	}: ComponentProps<typeof Progress.Root> & {
		start: { label: string; icon: string | undefined };
		end: { label: string; icon: string | undefined };
		colour: string;
	} = $props();

	const labelId = useId();
	const tween = new Tween(0, { duration: 1000, easing: cubicInOut });

	// Animate progress bar after 500ms
	onMount(() => {
		const timer = setTimeout(() => tween.set(value || 0), 500);
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
	<div class="flex flex-row justify-between text-lg md:text-xl">
		{#if start.icon}
			<img src={start.icon} alt={start.label} class="size-6 self-center md:size-8" />
		{/if}
		<span class="ml-2 self-center font-bold">{start.label}</span>

		<div class="mx-4 w-full self-center overflow-hidden rounded-full bg-neutral-800">
			<div class="h-4 rounded-l-full {colour}" style="width: {Math.round(tween.current)}%"></div>
		</div>

		{#if end.icon}
			<img src={end.icon} alt={end.label} class="size-6 self-center md:size-8" />
		{/if}
		<span class="self-center font-bold">{end.label}</span>
	</div>
</Progress.Root>
