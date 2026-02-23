<script lang="ts">
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
	import { LoaderCircle } from '@lucide/svelte';

	const tips = [
		'SirArchibald97 is really cool!',
		'Also try mccihub.net!',
		'Download Trident on Modrinth!',
		'Counting chickens...',
		'Restocking rusted cans...',
		'Searching for elusive gargs...',
		'Reloading rocket launchers...',
		'Spamming the Noxcrew button...',
		'Refilling reward crates...',
		'Mining more gems...'
	];
	const randomTip = tips[Math.floor(Math.random() * tips.length)];
</script>

<div class="relative flex w-full flex-1 flex-col gap-4">
	<Skeleton class="h-36 w-full rounded-xl" />
	<div class="flex gap-4">
		<Skeleton class="h-96 w-1/3 rounded-xl" />
		<Skeleton class="h-96 w-2/3 rounded-xl" />
	</div>
	<Skeleton class="h-36 w-full rounded-xl" />

	<div
		class="absolute top-1/2 left-1/2 flex -translate-x-1/2 transform items-center gap-x-2 rounded-full bg-neutral-800/50 px-4 py-2 text-sm text-neutral-400 backdrop-blur-sm"
	>
		<LoaderCircle class="size-5 animate-spin" />
		<span>{randomTip}</span>
	</div>
</div>
