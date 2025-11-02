<script lang="ts">
	import X from '$lib/icons/X.svelte';

	let isHidden = false;
	function hideAnnouncement() {
		isHidden = true;
	}
</script>

<div
	class="z-10 m-4 flex justify-between gap-x-4 rounded-md border-2 border-orange-500 bg-orange-400/50 p-4 {isHidden
		? 'hidden'
		: ''}"
>
	<div class="flex items-center gap-x-3">
		<img
			src="https://cdn.islandstats.xyz/icons/warnings/orange.png"
			class="size-8 self-center"
			alt="Warning Icon"
		/>
		<div>
			<slot></slot>
		</div>
	</div>

	<button
		onclick={hideAnnouncement}
		class="flex size-12 items-center justify-center rounded-md p-1 hover:bg-orange-500/70"
	>
		<span class="size-8 self-center"><X /></span>
	</button>
</div>
