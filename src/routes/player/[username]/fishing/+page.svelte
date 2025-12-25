<script lang="ts">
	import ChevronUpDown from '$lib/icons/ChevronUpDown.svelte';
	import { calculatePercentage, formatCaughtDate, getRarityColour } from '$lib/utils';
	import { slide } from 'svelte/transition';
	import FishingIslandStats from '$lib/blocks/fishing/FishingIslandStats.svelte';
	import type { PageProps } from './$types';
	import FishingOverview from '$lib/blocks/fishing/FishingOverview.svelte';
	import FishingLevel from '$lib/blocks/fishing/FishingLevel.svelte';
	import RecommendedIsland from '$lib/blocks/fishing/RecommendedIsland.svelte';
	import { fishingCollections } from '$lib/collections';
	import Tooltip from '$lib/components/Tooltip.svelte';

	let { data }: PageProps = $props();

	const climateStyles = {
		TEMPERATE: 'bg-green-500/50 border-green-500',
		TROPICAL: 'bg-lime-500/50 border-lime-500',
		BARREN: 'bg-orange-500/50 border-orange-500'
	} as { [climate: string]: string };

	let expandedSection = $state('');
</script>

{#await data.streamed.player then player}
	<div class="flex flex-col rounded-b-md border-x border-b border-neutral-800">
		{#if player?.collections}
			<div class="flex flex-col gap-4 p-4">
				<FishingLevel {player} />
				<div class="flex w-full gap-4">
					<FishingOverview {player} />
					<RecommendedIsland {player} />
				</div>
			</div>
		{:else}
			<FishingLevel {player} />
		{/if}

		{#if player?.collections}
			<!-- fishing collections -->
			<div class="flex flex-col gap-y-2 px-4 pb-4">
				{#each fishingCollections
					.filter((c) => c.level <= player.crownLevel.fishingLevelData.level)
					.concat(fishingCollections
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
								<div class="hidden gap-x-4 self-center md:flex">
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
																<div class="flex gap-x-2 self-center">
																	{#each collection.type === 'crab' ? ['average', 'large', 'colossal'] : ['average', 'large', 'massive', 'gargantuan'] as weight}
																		<Tooltip>
																			{#snippet trigger()}
																				<img
																					src={`https://cdn.islandstats.xyz/fishing/stars/${fish.weights.find((w) => w.weight === weight.toUpperCase()) ? (weight === 'colossal' ? 'gargantuan' : weight) : `${weight === 'colossal' ? 'gargantuan' : weight}_empty`}.png`}
																					alt={``}
																					class="size-6 cursor-pointer"
																				/>
																			{/snippet}
																			{#snippet content()}
																				<p class="flex flex-col items-center gap-y-1">
																					<span class="font-semibold"
																						>{weight[0].toUpperCase() + weight.slice(1)}</span
																					>
																					<span
																						>{fish.weights.find(
																							(w) => w.weight === weight.toUpperCase()
																						)
																							? `Caught: ${formatCaughtDate(fish.weights.find((w) => w.weight === weight.toUpperCase())?.firstCaught!)}`
																							: 'Not Caught'}</span
																					>
																				</p>
																			{/snippet}
																		</Tooltip>
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
										<div class="self-start">
											{#if category.hasResearch}
												<Tooltip>
													{#snippet trigger()}
														<img
															src="https://cdn.islandstats.xyz/icons/warnings/yellow.png"
															alt="Yellow Warning Icon"
															class="size-8 cursor-pointer p-1"
														/>
													{/snippet}
													{#snippet content()}
														These values are counted twice whenever Glitched Rod triggers and so are
														not 100% accurate!
													{/snippet}
												</Tooltip>
											{/if}
										</div>
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
