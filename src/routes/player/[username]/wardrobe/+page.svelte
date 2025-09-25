<script lang="ts">
	import { calculatePercentage, calculateStyleLevel, getCrownColour, getRarityColour, trophiesForStyleLevel } from '$lib/lighthouseUtils';
	import type { PageProps } from './$types';
	import { slide } from 'svelte/transition';
	import ChevronUpDown from '$lib/icons/ChevronUpDown.svelte';
	import { Tooltip } from 'flowbite-svelte';
	import WardrobeCollectionStats from '$lib/blocks/wardrobe/WardrobeCollectionStats.svelte';
	import Info from '$lib/icons/Info.svelte';
	let { data }: PageProps = $props();

	let cosmeticName = $state('');

	let filters = ['All', 'Owned', 'Missing'];
	let filter = $state(filters[0]);
	function switchFilter() {
		filter = filters[(filters.indexOf(filter) + 1) % filters.length];
	}

	const collections = [
		'Natural',
		'Oceanic',
		'Mechanical',
		'Magical',
		'Fishing',
		'Mythic',
		'Arena',
		'Cloudy',
		'Cuckoo',
		'Slimy',
		'Explosive',
		'Ninja',
		'Pose',
		'Hidden',
		'Arcane Gate',
		'Seasonal Variety',
		'Limited Seasonal',
		'Mystical Aquatic',
		'Neon Galaxy',
		'Candy Factory',
		'Ancient Jungle',
		'Cyber Surge',
		'Flex',
		'Special',
		'Limited Special',
		'Limited Event',
		'Particle'
	];
	let openCollection = $state('');
</script>

{#await data.streamed.player then player}
	<div class="flex flex-col rounded-b-md border-x border-b border-neutral-800">
		<div class="m-4 flex max-w-full flex-col justify-between rounded-md bg-neutral-800/50">
			<div class="flex w-full flex-col items-center p-4">
				<div class="flex w-full flex-row justify-between">
					<img src="https://cdn.islandstats.xyz/icons/style_level/{Math.floor(player!.crownLevel.styleLevelData.level / 10)}.png" alt={``} class="size-8" />
					<span class="self-center pl-2 text-xl font-bold">{player!.crownLevel.styleLevelData.level}</span>

					<div class="mx-4 w-full self-center overflow-hidden rounded-full bg-neutral-800">
						<div
							class={`h-4 rounded-l-full ${getCrownColour(player!.crownLevel.styleLevelData.level)}`}
							style={`width: ${(player!.crownLevel.styleLevelData.nextLevelProgress.obtained / player!.crownLevel.styleLevelData.nextLevelProgress.obtainable) * 100}%`}>
						</div>
					</div>

					<span class="self-center text-xl font-bold">{player!.crownLevel.styleLevelData.level + 1}</span>
				</div>
				<div class="mt-2 flex flex-col items-center justify-between gap-x-2 gap-y-1 text-base text-neutral-500 md:flex-row">
					<p class="self-center">
						<span class="text-neutral-300 tabular-nums">
							{Math.round(
								(player!.crownLevel.styleLevelData.nextLevelProgress.obtained / player!.crownLevel.styleLevelData.nextLevelProgress.obtainable) * 100 * 10
							) / 10}%
						</span>
						<span class="text-neutral-300 tabular-nums">
							({player!.crownLevel.styleLevelData.nextLevelProgress.obtained.toLocaleString()}/{player!.crownLevel.styleLevelData.nextLevelProgress.obtainable.toLocaleString()})
						</span>
					</p>
					<p class="hidden md:flex">/</p>
					<p class="flex flex-row items-center gap-x-1.5">
						<span class="flex flex-row gap-x-1 text-neutral-300">
							<img
								src={`https://cdn.islandstats.xyz/icons/style_level/${Math.floor(player!.crownLevel.styleLevelData.level / 10) + 1}.png`}
								alt={`Style Level ${Math.floor(player!.crownLevel.styleLevelData.level / 10) + 1} Icon`}
								class="size-5 self-center" />
							<span class="font-semibold tabular-nums">{Math.ceil(player!.crownLevel.styleLevelData.level / 10) * 10}</span>
						</span>
						<span>in</span>
						<span class="flex flex-row gap-x-1 text-neutral-300">
							<img src={`https://cdn.islandstats.xyz/icons/trophies/purple.png`} alt="Trophy Icon" class="size-5 self-center" />
							<span class="font-semibold tabular-nums"
								>{(trophiesForStyleLevel(Math.ceil(player!.crownLevel.styleLevelData.level / 10) * 10) - player!.trophies.style.total).toLocaleString()}</span>
						</span>
					</p>
				</div>
			</div>
		</div>

		{#if player?.collections?.cosmetics}
			<div class="flex flex-col gap-y-2 px-4 pb-4">
				<div class="flex flex-col gap-2 md:flex-row">
					<!-- search filter -->
					<div class="flex w-full cursor-pointer justify-center gap-x-2 rounded-md border border-neutral-800 duration-100 hover:bg-neutral-800/60 md:w-1/6">
						<input
							name="cosmetic"
							type="text"
							class="w-full rounded-md bg-neutral-950 outline-none placeholder:text-neutral-400 sm:text-sm"
							placeholder="Search a cosmetic..."
							role="combobox"
							aria-expanded="false"
							aria-controls="options"
							bind:value={cosmeticName}
							autocomplete="off" />
					</div>

					<button class="w-full cursor-pointer rounded-md border border-neutral-800 py-1 duration-100 hover:bg-neutral-800/60 md:w-1/8" onclick={switchFilter}
						>Show {filter}</button>
				</div>

				{#if cosmeticName.length > 0}
					<div class="grid-col-1 mt-2 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
						{#each player.collections.cosmetics
							.filter((c) => {
								if (cosmeticName.length > 0) {
									return c.cosmetic.name.toLowerCase().includes(cosmeticName);
								} else {
									return true;
								}
							})
							.filter((c) => {
								if (filter === 'All') {
									return true;
								} else if (filter === 'Owned') {
									return c.owned;
								} else {
									return !c.owned;
								}
							}) as { cosmetic, owned, chromaPacks, donationsMade }}
							<div
								class="relative flex flex-col gap-y-2 rounded-md text-base lg:text-lg {donationsMade === 10
									? 'bg-purple-700/30'
									: owned
										? 'border-green-800/80 bg-green-800/30'
										: 'bg-neutral-800/50'}">
								<div class="flex flex-row gap-x-2 p-2">
									<div class="flex min-w-full justify-between gap-x-4">
										<div class="flex gap-x-2 text-sm lg:text-base">
											<img
												class="size-12 self-center lg:size-16"
												src="https://cdn.islandstats.xyz/cosmetics/{cosmetic.category.toLowerCase()}/{cosmetic.collection
													.toLowerCase()
													.replaceAll(' ', '_')}/{cosmetic.name.replaceAll(' ', '_')}.webp"
												alt={cosmetic.name} />
											<Tooltip arrow={false} type="custom" placement="top" class="rounded-md border !border-neutral-700 !bg-neutral-900 px-2 py-0.5 text-sm">
												{cosmetic.obtainmentHint}
											</Tooltip>

											<div class="flex flex-col gap-y-1">
												<p class="font-semibold {cosmetic.name.length > 30 ? 'max-w-4/5 truncate text-ellipsis' : ''} {getRarityColour(cosmetic.rarity)}">
													{cosmetic.name}
												</p>
												{#if cosmetic.name.length > 30}
													<Tooltip
														arrow={false}
														type="custom"
														placement="top"
														class="rounded-md border !border-neutral-700 !bg-neutral-900 px-2 py-0.5 text-sm">
														{cosmetic.name}
													</Tooltip>
												{/if}

												<div class="flex gap-x-1">
													<img
														src="https://cdn.islandstats.xyz/icons/rarity/{cosmetic.rarity.toLowerCase()}.png"
														alt="{cosmetic.rarity} Icon"
														class="h-3 self-center md:h-4" />
													{#if cosmetic.type !== 'STANDARD'}
														<img
															src="https://cdn.islandstats.xyz/icons/rarity/{cosmetic.type.toLowerCase()}.png"
															alt="{cosmetic.type} Icon"
															class="h-3 self-center md:h-4" />
													{/if}
												</div>

												<!-- donations -->
												{#if cosmetic.royalReputation}
													<div class="flex flex-col gap-x-3 md:flex-row">
														<div class="flex gap-x-1">
															<img src="https://cdn.islandstats.xyz/icons/misc/scavenging.png" alt="Scavenged" class="size-3 self-center md:size-5" />
															<span id="donations" class="tabular-nums">{donationsMade || 0} / {cosmetic.royalReputation?.donationLimit || 10}</span>
														</div>
														<div class="flex gap-x-1">
															<img
																src="https://cdn.islandstats.xyz/icons/currency/royal_reputation.png"
																alt="Royal Reputation Icon"
																class="size-3 self-center md:size-5" />
															<span class="tabular-nums"
																>{cosmetic.royalReputation?.reputationAmount * donationsMade} / {cosmetic.royalReputation?.reputationAmount *
																	cosmetic.royalReputation?.donationLimit}</span>
														</div>
													</div>
												{:else}
													<div class="flex gap-x-1">
														<img src="https://cdn.islandstats.xyz/icons/misc/scavenging.png" alt="Scavenged" class="size-3 self-center grayscale md:size-5" />
														<span class="tabular-nums">Cannot be donated</span>
													</div>
												{/if}

												<!-- global owned -->
												<div class="flex gap-x-1">
													<img src="https://cdn.islandstats.xyz/icons/social/friend.png" alt="Global Owned" class="size-3 self-center md:size-5" />
													<span class="tabular-nums">{cosmetic.globalNumberOwned} owned</span>
												</div>
											</div>
										</div>
										<div class="flex shrink-0 flex-col gap-x-1 gap-y-1 self-start">
											<div
												class="flex gap-x-1 {donationsMade === 10 ? 'bg-purple-800' : owned ? 'bg-green-800' : 'bg-neutral-700/50'} rounded-full px-2 py-0.5">
												<img
													src="https://cdn.islandstats.xyz/icons/trophies/{cosmetic.isBonusTrophies ? 'silver' : 'purple'}.png"
													alt="Trophies Icon"
													class="size-6 self-center" />
												<p class="flex self-center text-sm lg:text-base">{cosmetic.trophies}</p>
											</div>

											{#if cosmetic.colorable}
												<!-- chroma packs -->
												<div class="mt-1 grid grid-cols-2 gap-1 self-center">
													{#each ['thermal', 'verdant', 'oceanic', 'regal'] as pack}
														<img
															src="https://cdn.islandstats.xyz/icons/chroma_pack/{pack}.png"
															alt="{pack} Chroma Pack"
															class="size-5 cursor-pointer {chromaPacks?.includes(pack) ? '' : 'grayscale'}" />
														<Tooltip
															arrow={false}
															type="custom"
															placement="top"
															class="border text-sm {chromaPacks?.includes(pack)
																? 'border-green-800 text-green-600'
																: '!border-neutral-700'} rounded-md !bg-neutral-900 px-2 py-0.5">
															{pack[0].toUpperCase() + pack.slice(1) + ' Chroma'}
														</Tooltip>
													{/each}
												</div>
											{/if}
										</div>
									</div>
								</div>

								<div
									class="absolute -top-2 -left-2 cursor-pointer p-1 {donationsMade === 10
										? 'bg-purple-800'
										: owned
											? 'bg-green-800'
											: 'bg-neutral-700/50'} rounded-md">
									<img
										src="https://cdn.islandstats.xyz/icons/wardrobe/{cosmetic.collection.toLowerCase().replaceAll(' ', '_')}.png"
										alt=""
										class="size-4 self-center md:size-6" />
								</div>
								<Tooltip arrow={false} type="custom" placement="top" class="rounded-md border !border-neutral-700 !bg-neutral-900 px-2 py-0.5 text-sm">
									{cosmetic.collection}
								</Tooltip>
							</div>
						{/each}
					</div>
				{:else}
					<div class="flex flex-col gap-y-2">
						{#each collections as collection}
							{@const isCollectionComplete =
								calculatePercentage(
									player.collections.cosmetics.filter((c) => c.cosmetic.collection === collection && c.owned).reduce((acc, c) => acc + c.cosmetic.trophies, 0),
									player.collections.cosmetics.filter((c) => c.cosmetic.collection === collection).reduce((acc, c) => acc + c.cosmetic.trophies, 0)
								) === 100}
							{@const isCollectionMaxed =
								calculatePercentage(
									player.collections.cosmetics
										.filter((c) => c.cosmetic.collection === collection && c.owned && c.cosmetic.royalReputation)
										.reduce((acc, c) => acc + c.cosmetic.royalReputation.reputationAmount * c.donationsMade, 0),
									player.collections.cosmetics
										.filter((c) => c.cosmetic.collection === collection && c.cosmetic.royalReputation)
										.reduce((acc, c) => acc + c.cosmetic.royalReputation.reputationAmount * c.cosmetic.royalReputation.donationLimit, 0)
								) === 100}
							<div
								class="bg-neutral-800/50 {isCollectionMaxed
									? 'border border-purple-800/50'
									: isCollectionComplete
										? 'border border-green-800/30'
										: ''} rounded-md">
								<button
									class="flex w-full cursor-pointer justify-between py-3 {isCollectionMaxed
										? 'bg-purple-800/50 hover:bg-purple-800/40'
										: isCollectionComplete
											? 'bg-green-800/50 hover:bg-green-800/40'
											: 'hover:bg-neutral-800'} duration-100 {openCollection === collection ? 'rounded-t-md' : 'rounded-md'}"
									onclick={() => {
										if (openCollection === collection) {
											openCollection = '';
										} else {
											openCollection = collection;
										}
									}}>
									<div class="flex gap-x-2 px-3">
										<img
											src="https://cdn.islandstats.xyz/icons/wardrobe/{collection.toLowerCase().replaceAll(' ', '_')}.png"
											alt="{collection} Icon"
											class="size-6 self-center md:size-8" />
										<p class="self-center text-base font-semibold lg:text-xl">{collection}</p>
									</div>
									<div class="flex gap-x-4 px-3">
										<div class="flex gap-x-1 self-center tabular-nums">
											<img
												src="https://cdn.islandstats.xyz/icons/trophies/{player.collections.cosmetics.filter((c) => c.cosmetic.collection === collection)[0]
													.cosmetic.isBonusTrophies
													? 'silver'
													: 'purple'}.png"
												alt="Cosmetic Trophy Icon"
												class="hidden size-6 self-center md:flex" />
											<p class="hidden gap-x-1 text-sm md:flex md:text-base">
												<span
													>{player.collections.cosmetics
														.filter((c) => c.cosmetic.collection === collection && c.owned)
														.reduce((acc, c) => acc + c.cosmetic.trophies, 0)
														.toLocaleString()}</span>
												<span> / </span>
												<span
													>{player.collections.cosmetics
														.filter((c) => c.cosmetic.collection === collection)
														.reduce((acc, c) => acc + c.cosmetic.trophies, 0)
														.toLocaleString()}</span>
												<span class="text-neutral-500"
													>({calculatePercentage(
														player.collections.cosmetics
															.filter((c) => c.cosmetic.collection === collection && c.owned)
															.reduce((acc, c) => acc + c.cosmetic.trophies, 0),
														player.collections.cosmetics.filter((c) => c.cosmetic.collection === collection).reduce((acc, c) => acc + c.cosmetic.trophies, 0)
													)}%)</span>
											</p>
										</div>
										<span class="mr-2 size-6 self-center text-neutral-500 lg:size-8"><ChevronUpDown /></span>
									</div>
								</button>
								{#if collection === openCollection}
									{@const filteredCosmetic = player.collections.cosmetics
										.filter(
											(c) =>
												// filter by collection
												c.cosmetic.collection === collection
										)
										.sort((a, b) => {
											// sort by rarity
											const rarityOrder = ['COMMON', 'UNCOMMON', 'RARE', 'EPIC', 'LEGENDARY', 'MYTHIC'];
											return rarityOrder.indexOf(a.cosmetic.rarity) - rarityOrder.indexOf(b.cosmetic.rarity);
										})
										.filter((c) => {
											// filter by owned
											if (filter === 'All') {
												return true;
											} else if (filter === 'Owned') {
												return c.owned;
											} else {
												return !c.owned;
											}
										})}
									<div
										transition:slide={{ duration: 200 }}
										class="flex flex-col gap-y-4 rounded-b-md border-t text-base lg:text-lg {isCollectionMaxed
											? 'border-purple-800/30'
											: isCollectionComplete
												? 'border-green-800/30'
												: 'border-neutral-800'} p-4">
										<WardrobeCollectionStats {player} {collection} />
										<div class="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
											{#each filteredCosmetic as { cosmetic, owned, chromaPacks, donationsMade }}
												<div
													class="flex flex-col gap-y-2 rounded-md text-base lg:text-lg {donationsMade === 10
														? 'bg-purple-700/30'
														: owned
															? 'border-green-800/80 bg-green-800/30'
															: 'bg-neutral-800/50'}">
													<div class="flex flex-row gap-x-2 p-2">
														<div class="flex min-w-full justify-between gap-x-4">
															<div class="flex gap-x-2 text-sm lg:text-base">
																<img
																	class="size-12 self-center lg:size-16"
																	src="https://cdn.islandstats.xyz/cosmetics/{cosmetic.category.toLowerCase()}/{cosmetic.collection
																		.toLowerCase()
																		.replaceAll(' ', '_')}/{cosmetic.name.replaceAll(' ', '_')}.webp"
																	alt={cosmetic.name} />

																<div class="flex flex-col gap-y-1">
																	<div class="flex gap-x-2">
																		<p
																			class="font-semibold {cosmetic.name.length > 30 ? 'max-w-4/5 truncate text-ellipsis' : ''} {getRarityColour(
																				cosmetic.rarity
																			)}">
																			{cosmetic.name}
																		</p>
																		{#if cosmetic.name.length > 30}
																			<Tooltip
																				arrow={false}
																				type="custom"
																				placement="top"
																				class="rounded-md border !border-neutral-700 !bg-neutral-900 px-2 py-0.5 text-sm">
																				{cosmetic.name}
																			</Tooltip>
																		{/if}

																		<span class="size-5 cursor-pointer self-center text-neutral-300"><Info /></span>
																		<Tooltip
																			arrow={false}
																			type="custom"
																			placement="top"
																			class="rounded-md border !border-neutral-700 !bg-neutral-900 px-2 py-0.5 text-sm">
																			{cosmetic.obtainmentHint}
																		</Tooltip>
																	</div>

																	<div class="mb-0.5 flex gap-x-1">
																		<img
																			src="https://cdn.islandstats.xyz/icons/rarity/{cosmetic.rarity.toLowerCase()}.png"
																			alt="{cosmetic.rarity} Icon"
																			class="h-3 self-center md:h-4" />
																		{#if cosmetic.type !== 'STANDARD'}
																			<img
																				src="https://cdn.islandstats.xyz/icons/rarity/{cosmetic.type.toLowerCase()}.png"
																				alt="{cosmetic.type} Icon"
																				class="h-3 self-center md:h-4" />
																		{/if}
																	</div>

																	<!-- donations -->
																	{#if cosmetic.royalReputation}
																		<div class="flex flex-col gap-x-3 md:flex-row">
																			<div class="flex gap-x-1">
																				<img src="https://cdn.islandstats.xyz/icons/misc/scavenging.png" alt="Scavenged" class="size-3 self-center md:size-5" />
																				<span id="donations" class="tabular-nums">{donationsMade || 0} / {cosmetic.royalReputation?.donationLimit || 10}</span>
																			</div>
																			<div class="flex gap-x-1">
																				<img
																					src="https://cdn.islandstats.xyz/icons/currency/royal_reputation.png"
																					alt="Royal Reputation Icon"
																					class="size-3 self-center md:size-5" />
																				<span class="tabular-nums"
																					>{cosmetic.royalReputation?.reputationAmount * donationsMade} / {cosmetic.royalReputation?.reputationAmount *
																						cosmetic.royalReputation?.donationLimit}</span>
																			</div>
																		</div>
																	{:else}
																		<div class="flex gap-x-1">
																			<img
																				src="https://cdn.islandstats.xyz/icons/misc/scavenging.png"
																				alt="Scavenged"
																				class="size-3 self-center grayscale md:size-5" />
																			<span class="tabular-nums">Cannot be donated</span>
																		</div>
																	{/if}

																	<!-- global owned -->
																	<div class="flex gap-x-1">
																		<img src="https://cdn.islandstats.xyz/icons/social/friend.png" alt="Global Owned" class="size-3 self-center md:size-5" />
																		<span class="tabular-nums">{cosmetic.globalNumberOwned} owned</span>
																	</div>
																</div>
															</div>
															<div class="flex shrink-0 flex-col gap-x-1 gap-y-1 self-start">
																<div
																	class="flex gap-x-1 {donationsMade === 10
																		? 'bg-purple-800'
																		: owned
																			? 'bg-green-800'
																			: 'bg-neutral-700/50'} rounded-full px-2 py-0.5">
																	<img
																		src="https://cdn.islandstats.xyz/icons/trophies/{cosmetic.isBonusTrophies ? 'silver' : 'purple'}.png"
																		alt="Trophies Icon"
																		class="size-6 self-center" />
																	<p class="flex self-center text-sm lg:text-base">{cosmetic.trophies}</p>
																</div>

																{#if cosmetic.colorable}
																	<!-- chroma packs -->
																	<div class="mt-1 grid grid-cols-2 gap-1 self-center">
																		{#each ['thermal', 'verdant', 'oceanic', 'regal'] as pack}
																			<img
																				src="https://cdn.islandstats.xyz/icons/chroma_pack/{pack}.png"
																				alt="{pack} Chroma Pack"
																				class="size-5 cursor-pointer {chromaPacks?.includes(pack) ? '' : 'grayscale'}" />
																			<Tooltip
																				arrow={false}
																				type="custom"
																				placement="top"
																				class="border text-sm {chromaPacks?.includes(pack)
																					? 'border-green-800 text-green-600'
																					: '!border-neutral-700'} rounded-md !bg-neutral-900 px-2 py-0.5">
																				{pack[0].toUpperCase() + pack.slice(1) + ' Chroma'}
																			</Tooltip>
																		{/each}
																	</div>
																{/if}
															</div>
														</div>
													</div>
												</div>
											{/each}
										</div>
									</div>
								{/if}
							</div>
						{/each}
					</div>
				{/if}
			</div>
		{:else}
			<div class="mx-4 mb-4 flex flex-row items-center justify-center rounded-lg bg-neutral-950/40 py-16 text-neutral-400">
				<div class="flex flex-col gap-y-1">
					<img src="https://cdn.islandstats.xyz/icons/warnings/orange.png" alt="Orange warning icon" class="size-8 self-center" />
					<p class="text-lg">Collections are disabled!</p>
				</div>
			</div>
		{/if}
	</div>
{/await}
