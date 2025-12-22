<script lang="ts">
	import ChevronUpDown from '$lib/icons/ChevronUpDown.svelte';
	import {
		calculatePercentage,
		calculateTrophiesToNextEvolution,
		earnedTrophiesForIsland,
		formatCaughtDate,
		getCrownColour,
		getRarityColour,
		totalTrophiesForIsland
	} from '$lib/utils';
	import { slide } from 'svelte/transition';
	import FishingIslandStats from '$lib/blocks/fishing/FishingIslandStats.svelte';
	import type { PageProps } from './$types';
	import type { Player } from '$lib/types';
	import { Progress, Tooltip } from 'bits-ui';
	import ProgressBar from '$lib/components/ProgressBar.svelte';

	let { data }: PageProps = $props();

	const collections = [
		{ name: 'Verdant Woods', climate: 'TEMPERATE', icon: 'verdant_woods', level: 0, type: 'fish' },
		{ name: 'Floral Forest', climate: 'TEMPERATE', icon: 'floral_forest', level: 10, type: 'fish' },
		{ name: 'Dark Grove', climate: 'TEMPERATE', icon: 'dark_grove', level: 20, type: 'fish' },
		{ name: 'Temperate Crab Pots', climate: 'TEMPERATE', icon: 'crab_pot', level: 0, type: 'crab' },
		{
			name: 'Sunken Swamp',
			climate: 'TEMPERATE',
			icon: 'grotto_temperate',
			level: 0,
			type: 'grotto'
		},
		{
			name: 'Tropical Overgrowth',
			climate: 'TROPICAL',
			icon: 'tropical_overgrowth',
			level: 30,
			type: 'fish'
		},
		{ name: 'Coral Shores', climate: 'TROPICAL', icon: 'coral_shores', level: 40, type: 'fish' },
		{ name: 'Twisted Swamp', climate: 'TROPICAL', icon: 'twisted_swamp', level: 45, type: 'fish' },
		{ name: 'Tropical Crab Pots', climate: 'TROPICAL', icon: 'crab_pot', level: 30, type: 'crab' },
		{
			name: 'Mirrored Oasis',
			climate: 'TROPICAL',
			icon: 'grotto_tropical',
			level: 30,
			type: 'grotto'
		},
		{ name: 'Ancient Sands', climate: 'BARREN', icon: 'ancient_sands', level: 50, type: 'fish' },
		{ name: 'Blazing Canyon', climate: 'BARREN', icon: 'blazing_canyon', level: 55, type: 'fish' },
		{ name: 'Ashen Wastes', climate: 'BARREN', icon: 'ashen_wastes', level: 60, type: 'fish' },
		{ name: 'Barren Crab Pots', climate: 'BARREN', icon: 'crab_pot', level: 50, type: 'crab' },
		{
			name: 'Volcanic Springs',
			climate: 'BARREN',
			icon: 'grotto_barren',
			level: 50,
			type: 'grotto'
		}
	] as { name: string; climate: string; icon: string; level: number; type: 'fish' | 'crab' }[];

	const climateStyles = {
		TEMPERATE: 'bg-green-500/50 border-green-500',
		TROPICAL: 'bg-lime-500/50 border-lime-500',
		BARREN: 'bg-orange-500/50 border-orange-500'
	} as { [climate: string]: string };

	let expandedSection = $state('');

	const recommendedTypes = {
		fish: 'Fish',
		crab: 'Crab Pots',
		grotto: 'Grotto'
	} as { [type: string]: string };
	let recommendedType = $state('fish');
	function cycleRecommendedType() {
		const types = ['fish', 'crab', 'grotto'];
		recommendedType =
			types[
				types.indexOf(recommendedType) + 1 >= types.length ? 0 : types.indexOf(recommendedType) + 1
			];
	}
	function getRecommendedIsland(player: Player, type: string) {
		const islands = collections.filter(
			(c) => player.crownLevel.fishingLevelData.level >= c.level && c.type === type
		);
		const islandPoints = {} as { [island: string]: number };
		for (const island of islands) {
			islandPoints[island.name] = 0;
			for (const fish of player.collections?.fish.filter(
				(f) => f.fish.collection === island.name
			) || []) {
				const points = { AVERAGE: 1, LARGE: 2, MASSIVE: 3, GARGANTUAN: 4, COLOSSAL: 4 } as {
					[weight: string]: number;
				};
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

{#await data.streamed.player then player}
	<div class="flex flex-col rounded-b-md border-x border-b border-neutral-800">
		{#if player?.collections}
			<div class="flex w-full flex-col justify-between gap-4 p-4 lg:flex-row">
				<!-- fishing level -->
				<div
					class="flex w-full flex-col justify-between divide-y divide-neutral-800 rounded-md border border-neutral-800 lg:w-2/5"
				>
					<div class="flex w-full flex-col items-center p-4">
						<div class="flex w-full flex-row justify-between">
							<ProgressBar
								max={100}
								min={0}
								value={(player.crownLevel.fishingLevelData.nextLevelProgress.obtained /
									player.crownLevel.fishingLevelData.nextLevelProgress.obtainable) *
									100}
								start={{
									label: player.crownLevel.fishingLevelData.level.toString(),
									icon: `https://cdn.islandstats.xyz/fishing/level/${player.crownLevel.fishingLevelData.evolution}.png`
								}}
								end={{ label: (player.crownLevel.fishingLevelData.level + 1).toString(), icon: '' }}
								colour={getCrownColour(player.crownLevel.fishingLevelData.level)}
							/>
						</div>
						<div class="mt-2 flex justify-between gap-x-2 gap-y-1 text-base text-neutral-500">
							<p class="self-center">
								<span class="text-neutral-300 tabular-nums">
									{Math.round(
										(player.crownLevel.fishingLevelData.nextLevelProgress.obtained /
											player.crownLevel.fishingLevelData.nextLevelProgress.obtainable) *
											100 *
											10
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
										class="size-5 self-center"
									/>
									<span class="font-semibold tabular-nums"
										>{player.crownLevel.fishingLevelData.nextEvolutionLevel}</span
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
											player.trophies.angler.total,
											player.crownLevel.fishingLevelData.nextEvolutionLevel
										).toLocaleString()}</span
									>
								</span>
							</p>
						</div>
					</div>
					<div class="flex flex-col p-4">
						{#if player.collections.fish}
							{@const recommendedIsland = getRecommendedIsland(player, recommendedType)}
							{#if recommendedIsland}
								<div class="flex justify-between">
									<div class="flex flex-col gap-y-1">
										<p class="text-xl font-semibold">Recommended Island</p>
										<div class="flex gap-x-3">
											<img
												src="https://cdn.islandstats.xyz/fishing/islands/{recommendedIsland?.icon}.png"
												alt="Fishing Game Icon"
												class="size-14 self-center lg:size-16"
											/>
											<div class="flex flex-col gap-y-1 self-center">
												<div class="flex gap-x-3">
													<p class="text-lg font-semibold">{recommendedIsland?.name}</p>
													<p
														class="self-center rounded-full border px-3 text-sm {climateStyles[
															recommendedIsland.climate
														]}"
													>
														{recommendedIsland.climate[0] +
															recommendedIsland.climate.slice(1).toLowerCase()}
													</p>
												</div>
												<div class="grid grid-cols-2 gap-x-4 2xl:flex">
													{#each recommendedType === 'crab' ? ['AVERAGE', 'LARGE', 'COLOSSAL'] : ['AVERAGE', 'LARGE', 'MASSIVE', 'GARGANTUAN'] as weight}
														<p class="flex gap-x-2 tabular-nums">
															<img
																src={`https://cdn.islandstats.xyz/fishing/stars/${(weight === 'COLOSSAL' ? 'GARGANTUAN' : weight).toLowerCase()}.png`}
																alt={``}
																class="size-6 cursor-pointer self-center"
															/>
															>
															<span>
																{player.collections.fish.filter(
																	(f) =>
																		f.fish.collection === recommendedIsland?.name &&
																		f.weights.find((w) => w.weight === weight)
																).length}
																/
																{player.collections.fish.filter(
																	(f) => f.fish.collection === recommendedIsland?.name
																).length}
															</span>
														</p>
													{/each}
												</div>
											</div>
										</div>
									</div>
									<button
										onclick={cycleRecommendedType}
										class="flex cursor-pointer gap-x-1 self-start rounded-md border border-neutral-800 px-2 py-1 duration-100 hover:bg-neutral-800/50"
									>
										{recommendedTypes[recommendedType]}
									</button>
								</div>
							{/if}
						{/if}
					</div>
				</div>

				<!-- fishing islands overview -->
				<div
					class="flex w-full flex-col items-center justify-center gap-y-4 rounded-md border border-neutral-800 p-4 lg:w-3/5"
				>
					<div class="grid w-full grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-5">
						{#each collections as collection}
							{#if player.crownLevel.fishingLevelData.level >= collection.level}
								<div class="flex gap-x-2">
									<Tooltip.Provider>
										<Tooltip.Root delayDuration={50}>
											<Tooltip.Trigger>
												<div class="relative cursor-pointer">
													<span
														class="flex size-8 items-center justify-center rounded-md bg-neutral-800 lg:size-12"
													>
														<img
															src="https://cdn.islandstats.xyz/fishing/islands/{collection.icon}.png"
															alt="Fishing Game Icon"
															class="z-10 size-6 shadow-2xl lg:size-8"
														/>
													</span>
													<span
														class="absolute top-0 right-0 bottom-0 left-0 size-auto {getCrownColour(
															player.crownLevel.fishingLevelData.level
														)} {earnedTrophiesForIsland(player.collections.fish, collection.name) /
															totalTrophiesForIsland(player.collections.fish, collection.name) <
														1
															? 'rounded-l-md'
															: 'rounded-md'}"
														style={`width: ${(earnedTrophiesForIsland(player.collections.fish, collection.name) / totalTrophiesForIsland(player.collections.fish, collection.name)) * 100}%`}
													></span>
												</div>
											</Tooltip.Trigger>
											<Tooltip.Content
												side="top"
												align="center"
												sideOffset={8}
												class="animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-20 origin-(--bits-tooltip-content-transform-origin)"
											>
												<p class="rounded-md bg-neutral-800 px-3 py-1">
													{collection.name}
												</p>
											</Tooltip.Content>
										</Tooltip.Root>
									</Tooltip.Provider>

									<div class="flex gap-x-1 self-center">
										<img
											src="https://cdn.islandstats.xyz/icons/trophies/blue.png"
											alt="Skill Trophy Icon"
											class="size-6 self-center"
										/>
										<p class="self-center text-base tabular-nums">
											{calculatePercentage(
												earnedTrophiesForIsland(player.collections!.fish, collection.name),
												totalTrophiesForIsland(player.collections!.fish, collection.name)
											)}%
										</p>
									</div>
								</div>
							{:else}
								<div class="flex gap-x-2">
									<span class="relative cursor-pointer">
										<span
											class="flex size-8 items-center justify-center rounded-md bg-neutral-800 lg:size-12"
										>
											<img
												src="https://cdn.islandstats.xyz/fishing/islands/{collection.icon}.png"
												alt="Fishing Game Icon"
												class="z-10 size-6 shadow-2xl lg:size-8"
											/>
										</span>
									</span>
									<div class="flex gap-x-1 self-center">
										<img src="/locked.png" alt="Skill Trophy Icon" class="size-6 self-center" />
										<p class="self-center text-base">Locked</p>
									</div>
								</div>
							{/if}
						{/each}
					</div>
				</div>
			</div>
		{:else}
			<div class="m-4 flex max-w-full flex-col justify-between rounded-md bg-neutral-800/50">
				<div class="flex w-full flex-col items-center p-4">
					<div class="flex w-full flex-row justify-between">
						<img
							src={`https://cdn.islandstats.xyz/fishing/level/${player!.crownLevel.fishingLevelData.evolution}.png`}
							alt={``}
							class="size-8"
						/>
						<span class="self-center pl-2 text-xl font-bold"
							>{player!.crownLevel.fishingLevelData.level}</span
						>

						<div class="mx-4 w-full self-center overflow-hidden rounded-full bg-neutral-800">
							<div
								class={`h-4 rounded-l-full ${getCrownColour(player!.crownLevel.fishingLevelData.level)}`}
								style={`width: ${(player!.crownLevel.fishingLevelData.nextLevelProgress.obtained / player!.crownLevel.fishingLevelData.nextLevelProgress.obtainable) * 100}%`}
							></div>
						</div>

						<span class="self-center text-xl font-bold"
							>{player!.crownLevel.fishingLevelData.level + 1}</span
						>
					</div>
					<div class="mt-2 flex justify-between gap-x-2 gap-y-1 text-base text-neutral-500">
						<p class="self-center">
							<span class="text-neutral-300 tabular-nums">
								{Math.round(
									(player!.crownLevel.fishingLevelData.nextLevelProgress.obtained /
										player!.crownLevel.fishingLevelData.nextLevelProgress.obtainable) *
										100 *
										10
								) / 10}%
							</span>
							<span class="text-neutral-300 tabular-nums">
								({player!.crownLevel.fishingLevelData.nextLevelProgress.obtained.toLocaleString()}/{player!.crownLevel.fishingLevelData.nextLevelProgress.obtainable.toLocaleString()})
							</span>
						</p>
						<p>/</p>
						<p class="flex flex-row items-center gap-x-1.5">
							<span class="flex flex-row gap-x-1 text-neutral-300">
								<img
									src={`https://cdn.islandstats.xyz/fishing/level/${player!.crownLevel.fishingLevelData.evolution + 1}.png`}
									alt={`Crown Level ${player!.crownLevel.fishingLevelData.evolution} Icon`}
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
		{/if}

		{#if player?.collections}
			<!-- fishing collections -->
			<div class="flex flex-col gap-y-2 px-4 pb-4">
				{#each collections
					.filter((c) => c.level <= player.crownLevel.fishingLevelData.level)
					.concat(collections
							.filter((c) => c.level > player.crownLevel.fishingLevelData.level)
							.sort((a, b) => a.level - b.level)) as collection}
					<div class="rounded-md bg-neutral-800/50">
						{#if player.crownLevel.fishingLevelData.level >= collection.level}
							<button
								onclick={() => {
									if (expandedSection === collection.name) expandedSection = '';
									else expandedSection = collection.name;
								}}
								class="flex w-full cursor-pointer flex-row justify-between duration-100 hover:bg-neutral-800 {expandedSection ===
								collection.name
									? 'rounded-t-md'
									: 'rounded-md'}"
							>
								<div class="flex flex-row gap-x-2 p-3">
									<img
										src={collection.icon.startsWith('!')
											? collection.icon
											: `https://cdn.islandstats.xyz/fishing/islands/${collection.icon}.png`}
										alt={`${collection.icon} Collection`}
										class="size-8"
									/>
									<p class="self-center text-lg font-semibold lg:text-xl">{collection.name}</p>
								</div>
								<div class="hidden gap-x-4 md:flex">
									<span
										class="self-center rounded-full border px-3 py-0.5 {climateStyles[
											collection.climate
										]}">{collection.climate[0] + collection.climate.toLowerCase().slice(1)}</span
									>
									<span class="mr-2 size-6 self-center text-neutral-500 lg:size-8"
										><ChevronUpDown /></span
									>
								</div>
							</button>
						{:else}
							<div class="flex w-full flex-row justify-between bg-neutral-900/60">
								<div class="flex flex-row gap-x-2 p-3">
									<img
										src={collection.icon.startsWith('/')
											? collection.icon
											: `https://cdn.islandstats.xyz/fishing/islands/${collection.icon}.png`}
										alt={``}
										class="size-8"
									/>
									<p class="self-center text-lg font-semibold lg:text-xl">{collection.name}</p>
								</div>
								<div class="mr-4 flex gap-x-2 self-center text-neutral-400">
									<p class="hidden self-center md:flex">Unlocked at</p>
									<div class="flex gap-x-1">
										<img
											src={`https://cdn.islandstats.xyz/fishing/level/${Math.floor(collection.level / 10)}.png`}
											alt={``}
											class="size-6 lg:size-8"
										/>
										<span class="self-center tabular-nums">{collection.level}</span>
									</div>
								</div>
							</div>
						{/if}
						{#if expandedSection === collection.name}
							<div
								transition:slide={{ duration: 400 }}
								class="border-t border-neutral-800 p-4 text-base md:text-lg"
							>
								<div class="w-full">
									<FishingIslandStats {player} {collection} />

									<div class="flex flex-col gap-y-2 pt-4">
										{#each ['COMMON', 'UNCOMMON', 'RARE', 'EPIC', 'LEGENDARY', 'MYTHIC'] as rarity}
											<div class="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
												<!-- FISH -->
												{#each collection.type !== 'crab' ? player.collections.fish.filter((fish) => fish.fish.collection === collection.name && fish.fish.rarity === rarity) : player.collections.fish.filter((fish) => fish.fish.climate.toUpperCase() === collection.climate && fish.fish.name.includes(' Crab') && fish.fish.rarity === rarity) as fish}
													<div class="flex flex-row gap-x-2 rounded-md bg-neutral-900 p-2">
														<img
															class="size-12 self-center"
															src="https://cdn.islandstats.xyz/fishing/fish/{collection.type ===
															'crab'
																? 'crab_collection'
																: fish.fish.collection
																		.toLowerCase()
																		.replaceAll(' ', '_')}/{fish.fish.name
																.toLowerCase()
																.replaceAll(' ', '_')}.png"
															alt={fish.fish.name}
														/>
														<div class="flex w-full flex-col">
															<div class="flex gap-x-4">
																<p
																	class={`text-base font-semibold lg:text-lg ${getRarityColour(fish.fish.rarity)}`}
																>
																	{fish.fish.name}
																</p>
																<div class="flex gap-x-1 self-center">
																	{#each collection.type === 'crab' ? ['average', 'large', 'colossal'] : ['average', 'large', 'massive', 'gargantuan'] as weight}
																		<img
																			src={`https://cdn.islandstats.xyz/fishing/stars/${fish.weights.find((w) => w.weight === weight.toUpperCase()) ? (weight === 'colossal' ? 'gargantuan' : weight) : `${weight === 'colossal' ? 'gargantuan' : weight}_empty`}.png`}
																			alt={``}
																			class="size-6 cursor-pointer"
																		/>
																	{/each}
																</div>
															</div>
															<p class="flex gap-x-2 text-sm text-neutral-400 md:text-base">
																<span
																	>Type: <span class="text-neutral-100"
																		>{fish.fish.elusive ? 'Elusive' : 'Normal'}</span
																	></span
																>
																<span>•</span>
																<span
																	>Catch Time: <span class="text-neutral-100"
																		>{fish.fish.catchTime.toLowerCase()[0].toUpperCase() +
																			fish.fish.catchTime
																				.toLowerCase()
																				.slice(1, fish.fish.catchTime.length)}</span
																	></span
																>
															</p>
														</div>
													</div>
												{/each}
											</div>
										{/each}
									</div>
								</div>
							</div>
						{/if}
					</div>
				{/each}

				<div class="mt-2 flex flex-col rounded-md bg-neutral-800/50">
					<button
						onclick={() => {
							if (expandedSection === 'stats') expandedSection = '';
							else expandedSection = 'stats';
						}}
						class="flex w-full cursor-pointer flex-row justify-between duration-10 hover:bg-neutral-800/50 {expandedSection ===
						'stats'
							? 'rounded-t-md'
							: 'rounded-md'}"
					>
						<div class="flex flex-row gap-x-2 p-3">
							<img
								src="https://cdn.islandstats.xyz/games/fishing/icon.png"
								alt="Fishing Game Icon"
								class="size-8"
							/>
							<p class="self-center text-lg font-semibold lg:text-xl">Other Fishing Stats</p>
						</div>
						<span class="mr-2 size-6 self-center text-neutral-500 lg:size-8"><ChevronUpDown /></span
						>
					</button>
					{#if expandedSection === 'stats'}
						<div
							transition:slide={{ duration: 400 }}
							class="flex justify-between border-t border-neutral-800 p-4 text-base md:text-lg"
						>
							<div
								class="grid w-full grid-cols-1 justify-between gap-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
							>
								{#each [{ total: player.statistics?.fishing.fish_caught.total, hasResearch: true, stats: [{ label: 'Fish Caught', value: player.statistics?.fishing.fish_caught.total, total: true }, { label: 'Average', value: player.statistics?.fishing.fish_caught.average, icon: 'https://cdn.islandstats.xyz/fishing/stars/average.png' }, { label: 'Large', value: player.statistics?.fishing.fish_caught.large, icon: 'https://cdn.islandstats.xyz/fishing/stars/large.png' }, { label: 'Massive', value: player.statistics?.fishing.fish_caught.massive, icon: 'https://cdn.islandstats.xyz/fishing/stars/massive.png' }, { label: 'Gargantuan', value: player.statistics?.fishing.fish_caught.gargantuan, icon: 'https://cdn.islandstats.xyz/fishing/stars/gargantuan.png' }] }, { total: player.statistics?.fishing.fish_caught.total, hasResearch: true, stats: [{ label: 'Fish Caught', value: player.statistics?.fishing.fish_caught.total, total: true }, { label: 'Common', value: player.statistics?.fishing.fish_caught.common, icon: '' }, { label: 'Uncommon', value: player.statistics?.fishing.fish_caught.uncommon, icon: '' }, { label: 'Rare', value: player.statistics?.fishing.fish_caught.rare, icon: '' }, { label: 'Epic', value: player.statistics?.fishing.fish_caught.epic, icon: '' }, { label: 'Legendary', value: player.statistics?.fishing.fish_caught.legendary, icon: '' }, { label: 'Mythic', value: player.statistics?.fishing.fish_caught.mythic, icon: '' }] }, { total: player.statistics?.fishing.trash_caught.total, stats: [{ label: 'Trash Caught', value: player.statistics?.fishing.trash_caught.total, total: true }, { label: 'Rusted Can', value: player.statistics?.fishing.trash_caught.common, icon: '/icons/trash_common.png' }, { label: 'Tangled Kelp', value: player.statistics?.fishing.trash_caught.uncommon, icon: '/icons/trash_uncommon.png' }, { label: 'Lost Shoe', value: player.statistics?.fishing.trash_caught.rare, icon: '/icons/trash_rare.png' }, { label: 'Royal Residue', value: player.statistics?.fishing.trash_caught.epic, icon: '/icons/trash_epic.png' }, { label: 'Forgotten Crown', value: player.statistics?.fishing.trash_caught.legendary, icon: '/icons/trash_legendary.png' }] }, { total: player.statistics?.fishing.treasure_caught.total, hasResearch: true, stats: [{ label: 'Treasure Caught', value: player.statistics?.fishing.treasure_caught.total, total: true }, { label: 'Common', value: player.statistics?.fishing.treasure_caught.common, icon: '/icons/common_treasure.png' }, { label: 'Uncommon', value: player.statistics?.fishing.treasure_caught.uncommon, icon: '/icons/uncommon_treasure.png' }, { label: 'Rare', value: player.statistics?.fishing.treasure_caught.rare, icon: '/icons/rare_treasure.png' }, { label: 'Epic', value: player.statistics?.fishing.treasure_caught.epic, icon: '/icons/epic_treasure.png' }, { label: 'Legendary', value: player.statistics?.fishing.treasure_caught.legendary, icon: '/icons/legendary_treasure.png' }, { label: 'Mythic', value: player.statistics?.fishing.treasure_caught.mythic, icon: '/icons/mythic_treasure.png' }] }, { total: player.statistics?.fishing.pearls_caught.total, hasResearch: true, stats: [{ label: 'Pearls Caught', value: player.statistics?.fishing.pearls_caught.total, total: true }, { label: 'Rough', value: player.statistics?.fishing.pearls_caught.rough, icon: 'https://cdn.discordapp.com/emojis/1315385898468376596.webp' }, { label: 'Polished', value: player.statistics?.fishing.pearls_caught.polished, icon: 'https://cdn.discordapp.com/emojis/1315385899839783112.webp' }, { label: 'Pristine', value: player.statistics?.fishing.pearls_caught.pristine, icon: 'https://cdn.discordapp.com/emojis/1315386591182848082.webp?animated=true' }] }, { total: player.statistics?.fishing.spirits_caught.total, hasResearch: true, stats: [{ label: 'Spirits Caught', value: player.statistics?.fishing.spirits_caught.total, total: true }, { label: 'Spirit', value: player.statistics?.fishing.spirits_caught.spirit, icon: 'https://cdn.discordapp.com/emojis/1317151653165797488.webp' }, { label: 'Refined', value: player.statistics?.fishing.spirits_caught.refined, icon: 'https://cdn.discordapp.com/emojis/1317151651697655808.webp' }, { label: 'Pure', value: player.statistics?.fishing.spirits_caught.pure, icon: 'https://cdn.discordapp.com/emojis/1315372015305232414.webp?animated=true' }] }, { total: Object.values(player.statistics?.fishing.wayfinder!).reduce((a, b) => (b += a), 0), stats: [{ label: 'Total Wayfinder Data', value: Object.values(player.statistics?.fishing.wayfinder!).reduce((a, b) => (b += a), 0), total: true }, { label: 'Temperate', value: player.statistics?.fishing.wayfinder.temperate, icon: 'https://cdn.islandstats.xyz/fishing/islands/grotto_temperate.png' }, { label: 'Tropical', value: player.statistics?.fishing.wayfinder.tropical, icon: 'https://cdn.islandstats.xyz/fishing/islands/grotto_tropical.png' }, { label: 'Barren', value: player.statistics?.fishing.wayfinder.barren, icon: 'https://cdn.islandstats.xyz/fishing/islands/grotto_barren.png' }] }] as { total: number; hasResearch: boolean | undefined; stats: { label: string; value: number; icon: string; total: boolean | undefined }[] }[] as category}
									<div class="flex w-full justify-between rounded-md bg-neutral-900 px-3 py-2">
										<div class="flex flex-col">
											{#each category.stats as stat}
												<div class="flex gap-x-2">
													{#if stat.icon}<img
															src={stat.icon}
															alt={``}
															class="size-5 self-center"
														/>{/if}
													<p>
														{stat.label}:
														<span class="font-semibold tabular-nums"
															>{stat.value?.toLocaleString()}</span
														>
														{#if !stat.total}<span class="text-neutral-500 tabular-nums"
																>({calculatePercentage(stat.value, category.total)}%)</span
															>{/if}
													</p>
												</div>
											{/each}
										</div>
										{#if category.hasResearch}
											<img
												src="https://cdn.islandstats.xyz/icons/warnings/yellow.png"
												alt="Yellow Warning Icon"
												class="size-8 cursor-pointer p-1"
											/>
										{/if}
									</div>
								{/each}
							</div>
						</div>
					{/if}
				</div>
			</div>
		{:else}
			<div
				class="mx-4 mb-4 flex flex-row items-center justify-center rounded-lg bg-neutral-950/40 py-16 text-neutral-400"
			>
				<div class="flex flex-col gap-y-1">
					<img
						src="https://cdn.islandstats.xyz/icons/warnings/orange.png"
						alt="Orange warning icon"
						class="size-8 self-center"
					/>
					<p class="text-lg">Collections are disabled!</p>
				</div>
			</div>
		{/if}
	</div>
{/await}
