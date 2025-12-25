<script lang="ts">
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import type { Player } from '$lib/types';
	import { calculateTrophiesToNextEvolution, getCrownColour } from '$lib/utils';

	const { player }: { player?: Player } = $props();
</script>

<div class="flex max-w-full flex-col justify-between rounded-md bg-neutral-800/50">
	<div class="flex w-full flex-col items-center p-4">
		<ProgressBar
			max={100}
			min={0}
			value={(player!.crownLevel.fishingLevelData.nextLevelProgress.obtained /
				player!.crownLevel.fishingLevelData.nextLevelProgress.obtainable) *
				100}
			colour={getCrownColour(player!.crownLevel.fishingLevelData.level)}
		>
			{#snippet startElement()}
				<div class="flex gap-x-2">
					<img
						src="https://cdn.islandstats.xyz/fishing/level/{player!.crownLevel.fishingLevelData
							.evolution}.png"
						alt="Fishing Level Icon"
						class="size-7 self-center"
					/>
					<p class="self-center font-semibold tabular-nums">
						{player!.crownLevel.fishingLevelData.level}
					</p>
				</div>
			{/snippet}
			{#snippet endElement()}
				<p class="self-center font-semibold tabular-nums">
					{player!.crownLevel.fishingLevelData.level + 1}
				</p>
			{/snippet}
		</ProgressBar>

		<div
			class="mt-2 flex flex-col items-center justify-center gap-x-2 gap-y-1 text-base text-neutral-500 sm:flex-row"
		>
			<p class="self-center">
				<span class="text-neutral-300 tabular-nums">
					{Math.round(
						(player!.crownLevel.levelData.nextLevelProgress.obtained /
							player!.crownLevel.levelData.nextLevelProgress.obtainable) *
							100 *
							10
					) / 10}%
				</span>
				<span class="text-neutral-300 tabular-nums">
					({player!.crownLevel.levelData.nextLevelProgress.obtained.toLocaleString()}/{player!.crownLevel.levelData.nextLevelProgress.obtainable.toLocaleString()})
				</span>
			</p>
			<p class="hidden sm:flex">/</p>
			<p class="flex items-center gap-x-1.5">
				<span class="flex flex-row gap-x-1 text-neutral-300">
					<img
						src="https://cdn.islandstats.xyz/fishing/level/{player!.crownLevel.fishingLevelData
							.evolution + 1}.png"
						alt="Fishing Level {player!.crownLevel.fishingLevelData.evolution + 1} Icon"
						class="size-5 self-center"
					/>
					<span class="font-semibold tabular-nums"
						>{player!.crownLevel.fishingLevelData.nextEvolutionLevel}</span
					>
				</span>
				<span>in</span>
				<span class="flex flex-row gap-x-1 text-neutral-300">
					<img
						src={`https://cdn.islandstats.xyz/icons/trophies/blue.png`}
						alt="Trophy Icon"
						class="size-5 self-center"
					/>
					<span class="font-semibold tabular-nums"
						>{calculateTrophiesToNextEvolution(
							'fishing',
							player!.trophies.angler.total,
							player!.crownLevel.fishingLevelData.nextEvolutionLevel
						).toLocaleString()}</span
					>
				</span>
			</p>
		</div>
	</div>
</div>
