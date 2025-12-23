<script lang="ts">
	import { LoaderCircle } from '@lucide/svelte';

	const tips = [
		'SirArchibald97 is really cool!',
		'Also try mccihub.net!',
		'Download Trident on Modrinth!',
		'Counting chickens...',
		'Restocking rusted cans...',
		'Searching for elusive gargs...',
		'Reloading rocket launchers...',
		'Spamming the Noxcrew button...'
	];
	const randomTip = tips[Math.floor(Math.random() * tips.length)];
</script>

<div class="flex flex-col items-center justify-center text-neutral-50">
	<div
		class="grid min-h-35 w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible"
	>
		<LoaderCircle class="animate-spin text-gray-300" />
		<p>{randomTip}</p>
	</div>
</div>
