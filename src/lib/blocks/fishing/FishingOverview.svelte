<script lang="ts">
	import { fishingCollections } from '$lib/collections';
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import type { Player } from '$lib/types';
	import {
		calculatePercentage,
		earnedTrophiesForIsland,
		getCrownColour,
		totalTrophiesForIsland
	} from '$lib/utils';

	const { player }: { player: Player } = $props();

	const collectionsByClimate = [
		{
			name: 'Temperate',
			colour: 'bg-green-500/50',
			collections: fishingCollections.filter((c) => c.climate === 'TEMPERATE')
		},
		{
			name: 'Tropical',
			colour: 'bg-lime-500/50',
			collections: fishingCollections.filter((c) => c.climate === 'TROPICAL')
		},
		{
			name: 'Barren',
			colour: 'bg-orange-500/50',
			collections: fishingCollections.filter((c) => c.climate === 'BARREN')
		}
	];
</script>

<div class="flex w-full flex-col gap-4 lg:flex-row">
	{#each collectionsByClimate as climate}
		<div class="flex w-full flex-col gap-2 rounded-md bg-neutral-800/50 p-3 lg:w-1/3">
			<p class="text-lg font-semibold">{climate.name}</p>
			<div class="flex flex-col gap-4">
				{#each climate.collections as collection}
					<div class="flex flex-col gap-3">
						<div class="flex justify-between">
							<div class="flex gap-x-2">
								<img
									src="https://cdn.islandstats.xyz/fishing/islands/{collection.icon}.png"
									alt={collection.name}
									class="size-6 self-center"
								/>
								<p class="text-md self-center">{collection.name}</p>
							</div>
							<div class="flex gap-x-1">
								<img
									src="https://cdn.islandstats.xyz/icons/trophies/blue.png"
									alt="Angler Trophy Icon"
									class="size-6 self-center"
								/>
								<p class="text-md self-center tabular-nums">
									{calculatePercentage(
										earnedTrophiesForIsland(player.collections?.fish!, collection.name),
										totalTrophiesForIsland(player.collections?.fish!, collection.name)
									)}%
								</p>
							</div>
						</div>
						<Tooltip>
							{#snippet trigger()}
								<ProgressBar
									value={(earnedTrophiesForIsland(player.collections?.fish!, collection.name) /
										totalTrophiesForIsland(player.collections?.fish!, collection.name)) *
										100}
									min={0}
									max={100}
									colour={climate.colour}
								/>
							{/snippet}
							{#snippet content()}
								{earnedTrophiesForIsland(
									player.collections?.fish!,
									collection.name
								).toLocaleString()} / {totalTrophiesForIsland(
									player.collections?.fish!,
									collection.name
								).toLocaleString()}
							{/snippet}
						</Tooltip>
					</div>
				{/each}
			</div>
		</div>
	{/each}
</div>
