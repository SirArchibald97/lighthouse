<script lang="ts">
	import ChevronRight from '$lib/icons/ChevronRight.svelte';
	import type { Player } from '$lib/types';
	import { Tooltip } from 'flowbite-svelte';

	const { player, collections }: { player: Player; collections: { name: string; climate: string; icon: string; level: number; type: 'fish' | 'crab' }[] } =
		$props();

	const climateStyles = {
		TEMPERATE: 'bg-green-500/50 border-green-500',
		TROPICAL: 'bg-lime-500/50 border-lime-500',
		BARREN: 'bg-orange-500/50 border-orange-500'
	} as { [climate: string]: string };

	const recommendedTypes = [
		{ label: 'Island', value: 'fish' },
		{ label: 'Crab Pots', value: 'crab' },
		{ label: 'Grotto', value: 'grotto' }
	] as { label: string; value: string }[];

	let recommendedType = $state(Object.values(recommendedTypes)[0]);
	function cycleRecommendedType() {
		recommendedType = recommendedTypes[(recommendedTypes.findIndex((t) => t.value === recommendedType.value) + 1) % recommendedTypes.length];
	}

	function getRecommendedIsland(player: Player, type: string) {
		const islands = collections.filter((c) => player.crownLevel.fishingLevelData.level >= c.level && c.type === type);
		const islandPoints = {} as { [island: string]: number };
		for (const island of islands) {
			islandPoints[island.name] = 0;
			for (const fish of player.collections?.fish.filter((f) => f.fish.collection === island.name) || []) {
				const points = { AVERAGE: 1, LARGE: 2, MASSIVE: 3, GARGANTUAN: 4, COLOSSAL: 4 } as { [weight: string]: number };
				for (const weight of fish.weights) {
					islandPoints[island.name] = islandPoints[island.name] + points[weight.weight];
				}
			}
		}

		let recommendedIsland = Object.entries(islandPoints)[0];
		for (const [name, points] of Object.entries(islandPoints)) {
			if (points < recommendedIsland[1]) {
				recommendedIsland = [name, points];
			}
		}
		return islands.find((i) => i.name === recommendedIsland[0]);
	}
</script>

<div class="flex flex-col rounded-b-md p-4">
	{#if player.collections!.fish}
		{@const recommendedIsland = getRecommendedIsland(player, recommendedType.value)}
		{#if recommendedIsland}
			<div class="flex justify-between">
				<div class="flex flex-col gap-y-1">
					<p class="text-xl font-semibold">Recommended {recommendedType.label}</p>
					<div class="flex gap-x-3">
						<img
							src="https://cdn.islandstats.xyz/fishing/islands/{recommendedIsland?.icon}.png"
							alt="Fishing Game Icon"
							class="size-14 self-center lg:size-16" />
						<div class="flex flex-col gap-y-1 self-center">
							<div class="flex gap-x-3">
								<p class="text-lg font-semibold">{recommendedIsland?.name}</p>
								<p class="self-center rounded-full border px-3 text-sm {climateStyles[recommendedIsland.climate]}">
									{recommendedIsland.climate[0] + recommendedIsland.climate.slice(1).toLowerCase()}
								</p>
							</div>
							<div class="grid grid-cols-2 gap-x-4 2xl:flex">
								{#each recommendedType.value === 'crab' ? ['AVERAGE', 'LARGE', 'COLOSSAL'] : ['AVERAGE', 'LARGE', 'MASSIVE', 'GARGANTUAN'] as weight}
									<p class="flex gap-x-2 tabular-nums">
										<img
											src={`https://cdn.islandstats.xyz/fishing/stars/${(weight === 'COLOSSAL' ? 'GARGANTUAN' : weight).toLowerCase()}.png`}
											alt={``}
											class="size-6 cursor-pointer self-center" />
										<Tooltip arrow={false} type="custom" placement="top" class="z-20 rounded-md border !border-neutral-700 !bg-neutral-900 px-2 py-0.5 text-sm"
											>{weight[0] + weight.slice(1).toLowerCase()}</Tooltip>
										<span>
											{player.collections!.fish.filter((f) => f.fish.collection === recommendedIsland?.name && f.weights.find((w) => w.weight === weight))
												.length}
											/
											{player.collections!.fish.filter((f) => f.fish.collection === recommendedIsland?.name).length}
										</span>
									</p>
								{/each}
							</div>
						</div>
					</div>
				</div>
				<button
					onclick={cycleRecommendedType}
					class="flex cursor-pointer gap-x-1 self-center rounded-md border border-neutral-800 p-1 duration-100 hover:bg-neutral-800">
					<span class="size-6 self-center"><ChevronRight /></span>
				</button>
			</div>
		{/if}
	{/if}
</div>
