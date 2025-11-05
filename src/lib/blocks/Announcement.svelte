<script lang="ts">
	import X from '$lib/icons/X.svelte';

	let { colour, children } = $props();

	const styles = {
		green: {
			border: 'border-green-500',
			background: 'bg-green-400/50',
			button: 'hover:bg-green-500/70'
		},
		orange: {
			border: 'border-orange-500',
			background: 'bg-orange-400/50',
			button: 'hover:bg-orange-500/70'
		}
	} as { [style: string]: { border: string; background: string; button: string } };

	let isHidden = $state(false);
	function hideAnnouncement() {
		isHidden = true;
	}
</script>

<div
	class="z-10 m-4 flex items-center justify-between gap-x-4 border-l-4
		{styles[colour].border} {styles[colour].background} p-4 {isHidden ? 'hidden' : ''}"
>
	<p class="text-md">{@render children()}</p>

	<button
		onclick={hideAnnouncement}
		class="flex size-12 items-center justify-center rounded-md p-1 {styles[colour].button}"
	>
		<span class="size-8 self-center"><X /></span>
	</button>
</div>
