<script lang="ts">
	import { fishingCollections } from '$lib/collections';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import { cn } from '$lib/shad-utils';
	import type { Player } from '$lib/types';
	import { calculatePercentage, earnedTrophiesForIsland, totalTrophiesForIsland } from '$lib/utils';

	const { player, class: className }: { player: Player; class?: string } = $props();

	const grottos = {
		'Sunken Swamp': 'temperate',
		'Mirrored Oasis': 'tropical',
		'Volcanic Springs': 'barren'
	} as { [island: string]: string };

	function getRecommendedIslands(player: Player) {
		const islands = fishingCollections.filter(
			(c) => player.crownLevel.fishingLevelData.level >= c.level && c.type !== 'crab'
		);
		const islandPoints = [] as { island: (typeof islands)[0]; points: number }[];
		for (const island of islands) {
			islandPoints.push({ island: island, points: 0 });

			let listValue = islandPoints.find((i) => i.island.name === island.name);
			if (!listValue) continue;

			for (const fish of player.collections?.fish.filter(
				(f) => f.fish.collection === island.name
			) || []) {
				const points = { AVERAGE: 1, LARGE: 2, MASSIVE: 3, GARGANTUAN: 4 } as {
					[weight: string]: number;
				};
				for (const weight of fish.weights) {
					listValue!.points += points[weight.weight];
				}
			}
		}

		return islandPoints.sort((a, b) => a.points - b.points);
	}

	const recommendIslands = $derived(getRecommendedIslands(player));
</script>

<div
	class={cn(
		className,
		'flex h-full flex-col justify-between gap-y-4 rounded-md bg-neutral-800/50 p-4'
	)}
>
	<div>
		<p class="text-xl font-semibold">Recommended Island</p>
		<div class="flex items-center gap-x-4">
			<img
				src="https://cdn.islandstats.xyz/fishing/islands/{Object.keys(grottos).includes(
					recommendIslands[0].island.name
				)
					? `grotto_${grottos[recommendIslands[0].island.name]}`
					: recommendIslands[0].island.name.toLowerCase().replaceAll(' ', '_')}.png"
				alt={recommendIslands[0].island.name}
				class="size-16"
			/>
			<div class="flex flex-col gap-y-2">
				<p class="text-lg font-semibold">{recommendIslands[0].island.name}</p>
				<p class="flex gap-x-4">
					<span class="flex gap-x-1 self-center">
						<img
							src="https://cdn.islandstats.xyz/icons/trophies/blue.png"
							alt="Angler Trophy Icon"
							class="size-6 self-center"
						/>
						<span class="text-base tabular-nums"
							>{calculatePercentage(
								earnedTrophiesForIsland(player.collections?.fish!, recommendIslands[0].island.name),
								totalTrophiesForIsland(player.collections?.fish!, recommendIslands[0].island.name)
							)}% of trophies earned</span
						>
					</span>
					<span class="flex gap-x-1 self-center">
						<img
							src="https://cdn.islandstats.xyz/fishing/stars/gargantuan.png"
							alt="Gargantuan Star Icon"
							class="size-5 self-center"
						/>
						<span class="text-base tabular-nums"
							>{player.collections?.fish
								.filter((f) => f.fish.collection === recommendIslands[0].island.name)
								.reduce((acc, f) => acc + (4 - f.weights.length), 0)} weights remaining</span
						>
					</span>
				</p>
			</div>
		</div>
	</div>
	<div class="flex flex-col gap-y-2">
		<p class="text-lg font-semibold">Next Best Islands</p>
		<div class="flex gap-x-8">
			{#each recommendIslands.slice(1, 4) as island}
				<div class="flex items-center gap-x-2">
					<img
						src="https://cdn.islandstats.xyz/fishing/islands/{Object.keys(grottos).includes(
							island.island.name
						)
							? `grotto_${grottos[island.island.name]}`
							: island.island.name.toLowerCase().replaceAll(' ', '_')}.png"
						alt={island.island.name}
						class="size-12"
					/>
					<div class="flex flex-col gap-y-1">
						<p class="text-base font-semibold">{island.island.name}</p>
						<p class="flex gap-x-2">
							<Tooltip>
								{#snippet trigger()}
									<span class="flex gap-x-1 self-center">
										<img
											src="https://cdn.islandstats.xyz/icons/trophies/blue.png"
											alt="Angler Trophy Icon"
											class="size-5 self-center"
										/>
										<span class="text-sm tabular-nums"
											>{calculatePercentage(
												earnedTrophiesForIsland(player.collections?.fish!, island.island.name),
												totalTrophiesForIsland(player.collections?.fish!, island.island.name)
											)}%</span
										>
									</span>
								{/snippet}
								{#snippet content()}
									<p>Trophies Earned</p>
								{/snippet}
							</Tooltip>
							<Tooltip>
								{#snippet trigger()}
									<span class="flex gap-x-1 self-center">
										<img
											src="https://cdn.islandstats.xyz/fishing/stars/gargantuan.png"
											alt="Gargantuan Star Icon"
											class="size-4 self-center"
										/>
										<span class="text-sm tabular-nums"
											>{player.collections?.fish
												.filter((f) => f.fish.collection === island.island.name)
												.reduce((acc, f) => acc + (4 - f.weights.length), 0)}</span
										>
									</span>
								{/snippet}
								{#snippet content()}
									<p>Weights Remaining</p>
								{/snippet}
							</Tooltip>
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
