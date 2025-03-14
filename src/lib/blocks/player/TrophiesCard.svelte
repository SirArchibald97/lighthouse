<script lang="ts">
	import type { Player } from '$lib/types';
	import { getCrownColour } from '$lib/utils';

	export let player: Player;
</script>

<div class="rounded-lg border border-neutral-800 bg-neutral-900 p-4 shadow-lg">
	<div class="flex flex-col gap-x-4">
        <div class="flex flex-row gap-x-1">
            <img src={`https://cdn.islandstats.xyz/icons/crowns/${player.crownLevel.levelData.evolution}.png`} alt={``} class="size-7" />
            <p class="text-xl font-bold">{player.crownLevel.levelData.level}</p>
        </div>
		<div class="overflow-hidden h-5 rounded-full bg-neutral-800">
            <div class={`h-full rounded-full ${getCrownColour(player.crownLevel.levelData.level)}`} style={`width: calc(100% * ${player.crownLevel.levelData.nextLevelProgress.obtained / player.crownLevel.levelData.nextLevelProgress.obtainable})`}></div>
        </div>
        <p class="text-xl font-bold">{player.crownLevel.levelData.level + 1}</p>
	</div>
</div>
