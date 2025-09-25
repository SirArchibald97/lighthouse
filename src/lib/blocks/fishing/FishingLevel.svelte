<script lang="ts">
	import type { Player } from '$lib/types';
	import { calculateTrophiesToNextEvolution, getCrownColour } from '$lib/lighthouseUtils';

	const { player }: { player: Player } = $props();
</script>

<div class="flex w-full flex-col items-center rounded-t-md p-4">
	<div class="flex w-full flex-row justify-between">
		<img src={`https://cdn.islandstats.xyz/fishing/level/${player.crownLevel.fishingLevelData.evolution}.png`} alt={``} class="size-8" />
		<span class="self-center pl-2 text-xl font-bold">{player.crownLevel.fishingLevelData.level}</span>

		<div class="mx-4 w-full self-center overflow-hidden rounded-full bg-neutral-800">
			<div
				class={`h-4 rounded-l-full ${getCrownColour(player.crownLevel.fishingLevelData.level)}`}
				style={`width: ${(player.crownLevel.fishingLevelData.nextLevelProgress.obtained / player.crownLevel.fishingLevelData.nextLevelProgress.obtainable) * 100}%`}>
			</div>
		</div>

		<span class="self-center text-xl font-bold">{player.crownLevel.fishingLevelData.level + 1}</span>
	</div>
	<div class="mt-2 flex justify-between gap-x-2 gap-y-1 text-base text-neutral-500">
		<p class="self-center">
			<span class="text-neutral-300 tabular-nums">
				{Math.round(
					(player.crownLevel.fishingLevelData.nextLevelProgress.obtained / player.crownLevel.fishingLevelData.nextLevelProgress.obtainable) * 100 * 10
				) / 10}%
			</span>
			<span class="text-neutral-300 tabular-nums">
				({player.crownLevel.fishingLevelData.nextLevelProgress.obtained.toLocaleString()}/{player.crownLevel.fishingLevelData.nextLevelProgress.obtainable.toLocaleString()})
			</span>
		</p>
		<p>/</p>
		<p class="flex flex-row items-center gap-x-1.5">
			<span class="flex flex-row gap-x-1 text-neutral-300">
				<img
					src={`https://cdn.islandstats.xyz/fishing/level/${player.crownLevel.fishingLevelData.evolution + 1}.png`}
					alt={`Crown Level ${player.crownLevel.fishingLevelData.evolution} Icon`}
					class="size-5 self-center" />
				<span class="font-semibold tabular-nums">{player.crownLevel.fishingLevelData.nextEvolutionLevel}</span>
			</span>
			<span>in</span>
			<span class="flex flex-row gap-x-1 text-neutral-300">
				<img src={`https://cdn.islandstats.xyz/icons/trophies/blue.png`} alt="Trophy Icon" class="size-5 self-center" />
				<span class="font-semibold tabular-nums"
					>{calculateTrophiesToNextEvolution(
						'fishing',
						player.trophies.angler.total,
						player.crownLevel.fishingLevelData.nextEvolutionLevel
					).toLocaleString()}</span>
			</span>
		</p>
	</div>
</div>
