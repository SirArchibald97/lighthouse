<script lang="ts">
	import { fishingCollections } from '$lib/collections';
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import { cn } from '$lib/shad-utils';
	import type { Player } from '$lib/types';
	import {
		calculatePercentage,
		earnedTrophiesForIsland,
		getCrownColour,
		getCrownColourHex,
		totalTrophiesForIsland
	} from '$lib/utils';

	const { player, class: className }: { player: Player; class?: string } = $props();

	const collectionsByClimate = [
		{
			name: 'Temperate',
			colour: 'bg-green-500/20',
			collections: fishingCollections.filter((c) => c.climate === 'TEMPERATE')
		},
		{
			name: 'Tropical',
			colour: 'bg-lime-500/20',
			collections: fishingCollections.filter((c) => c.climate === 'TROPICAL')
		},
		{
			name: 'Barren',
			colour: 'bg-orange-500/20',
			collections: fishingCollections.filter((c) => c.climate === 'BARREN')
		}
	];
</script>

<div class={cn(className, 'flex flex-col justify-between gap-4')}>
	{#each collectionsByClimate as climate}
		<div class="flex justify-around gap-4 rounded-lg {climate.colour} p-2">
			{#each climate.collections as collection}
				<div class="flex flex-col items-center gap-y-3">
					<span
						class="flex size-14 items-center justify-center rounded-full bg-neutral-100 md:size-18 {getCrownColour(
							player.crownLevel.fishingLevelData.level
						)}"
						style="background: conic-gradient({getCrownColourHex(
							player.crownLevel.fishingLevelData.level
						)} {Math.floor(
							(earnedTrophiesForIsland(player.collections!.fish, collection.name) /
								totalTrophiesForIsland(player.collections!.fish, collection.name)) *
								360
						)}deg, oklch(20.5% 0 0) 0deg)"
					>
						<span
							class="flex size-11 items-center justify-center rounded-full bg-neutral-800 md:size-14"
						>
							<Tooltip>
								{#snippet trigger()}
									<img
										src={collection.icon.startsWith('/')
											? collection.icon
											: `https://cdn.islandstats.xyz/fishing/islands/${collection.icon}.png`}
										alt={``}
										class="size-6"
									/>
								{/snippet}
								{#snippet content()}
									<div class="flex flex-col items-center gap-y-1">
										<p class="text-base font-semibold">{collection.name}</p>
										<p class="flex gap-x-1 text-base tabular-nums">
											<span class="flex gap-x-1">
												<img
													src="https://cdn.islandstats.xyz/icons/trophies/blue.png"
													alt="Angler Trophy Icon"
													class="size-4 self-center"
												/>
												<span
													>{earnedTrophiesForIsland(
														player.collections!.fish,
														collection.name
													).toLocaleString()}</span
												>
											</span>
											/ {totalTrophiesForIsland(
												player.collections!.fish,
												collection.name
											).toLocaleString()}
										</p>
									</div>
								{/snippet}
							</Tooltip>
						</span>
					</span>
				</div>
			{/each}
		</div>
	{/each}
</div>
