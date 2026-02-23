<script lang="ts">
	import {
		calculatePercentage,
		calculateTrophiesToNextEvolution,
		getCrownColour
	} from '$lib/utils';
	import type { PageProps } from './$types';
	import { slide } from 'svelte/transition';
	import ChevronUpDown from '$lib/icons/ChevronUpDown.svelte';
	import WardrobeCollectionStats from '$lib/blocks/wardrobe/WardrobeCollectionStats.svelte';
	import Cosmetic from '$lib/blocks/wardrobe/Cosmetic.svelte';
	import ProgressBar from '$lib/components/ProgressBar.svelte';

	let { data }: PageProps = $props();

	let cosmeticName = $state('');

	const filterStates = ['All', 'Locked', 'Unlocked'];
	let filter = $state<string>(filterStates[0]);
	function changeFilter() {
		const currentFilterIndex = filterStates.indexOf(filter);
		if (currentFilterIndex + 1 > filterStates.length - 1) {
			filter = filterStates[0];
		} else {
			filter = filterStates[currentFilterIndex + 1];
		}
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
		'Mystical Aquatic',
		'Neon Galaxy',
		'Candy Factory',
		'Ancient Jungle',
		'Cyber Surge',
		'Flex',
		'Special',
		'Particle',
		'Limited Seasonal',
		'Limited Weapon',
		'Limited Special',
		'Limited Event',
		'Premium Event',
		'Premium Weapon',
		'Legacy'
	];
	let openCollection = $state<string>('');
</script>

{#await data.streamed.player then player}
	<div class="flex flex-col rounded-b-md border-x border-b border-neutral-800">
		<div class="m-4 flex max-w-full flex-col justify-between rounded-md bg-neutral-800/50">
			<div class="flex w-full flex-col items-center p-4">
				<ProgressBar
					value={Math.round(
						(player!.crownLevel.styleLevelData.nextLevelProgress.obtained /
							player!.crownLevel.styleLevelData.nextLevelProgress.obtainable) *
							100 *
							10
					) / 10}
					max={100}
					min={0}
					colour={getCrownColour(player!.crownLevel.styleLevelData.level)}
					class="w-full px-4"
				>
					{#snippet startElement()}
						<div class="flex gap-x-2">
							<img
								src="https://cdn.islandstats.xyz/icons/style_level/{player?.crownLevel
									.styleLevelData.evolution || 0}.png"
								alt=""
								class="size-7 self-center"
							/>
							<p class="self-center font-semibold tabular-nums">
								{player?.crownLevel.styleLevelData.level || 0}
							</p>
						</div>
					{/snippet}
					{#snippet endElement()}
						<p class="self-center font-semibold tabular-nums">
							{(player?.crownLevel.styleLevelData.level || 0) + 1}
						</p>
					{/snippet}
				</ProgressBar>

				<div
					class="mt-2 flex flex-col items-center justify-between gap-x-2 gap-y-1 text-base text-neutral-500 md:flex-row"
				>
					<p class="self-center">
						<span class="text-neutral-300 tabular-nums">
							{Math.round(
								(player!.crownLevel.styleLevelData.nextLevelProgress.obtained /
									player!.crownLevel.styleLevelData.nextLevelProgress.obtainable) *
									100 *
									10
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
								src="https://cdn.islandstats.xyz/icons/style_level/{(player?.crownLevel
									.styleLevelData.nextEvolutionLevel || 10) / 10}.png"
								alt="Style Level {player!.crownLevel.styleLevelData.nextEvolutionLevel} Icon"
								class="size-5 self-center"
							/>
							<span class="font-semibold tabular-nums"
								>{player!.crownLevel.styleLevelData.nextEvolutionLevel}</span
							>
						</span>
						<span>in</span>
						<span class="flex flex-row gap-x-1 text-neutral-300">
							<img
								src={`https://cdn.islandstats.xyz/icons/trophies/purple.png`}
								alt="Trophy Icon"
								class="size-5 self-center"
							/>
							<span class="font-semibold tabular-nums"
								>{calculateTrophiesToNextEvolution(
									'style',
									player?.trophies.style.total || 0,
									player?.crownLevel.styleLevelData.nextEvolutionLevel || 10
								).toLocaleString()}</span
							>
						</span>
					</p>
				</div>
			</div>
		</div>

		{#if player?.collections?.cosmetics}
			<div class="flex flex-col gap-y-2 px-4 pb-4">
				<div class="flex flex-col gap-2 md:flex-row">
					<!-- search filter -->
					<div
						class="flex w-full cursor-pointer justify-center gap-x-2 rounded-md border border-neutral-800 duration-100 hover:bg-neutral-800/60 md:w-1/6"
					>
						<input
							name="cosmetic"
							type="text"
							class="w-full rounded-md bg-neutral-950 px-3 outline-none placeholder:text-neutral-400 sm:text-sm"
							placeholder="Search a cosmetic..."
							role="combobox"
							aria-expanded="false"
							aria-controls="options"
							bind:value={cosmeticName}
							autocomplete="off"
						/>
					</div>

					<button
						onclick={changeFilter}
						class="flex w-44 cursor-pointer justify-center gap-x-2 rounded-md border border-neutral-800 px-2 py-2 duration-100 hover:bg-neutral-800/60"
					>
						<p class="self-center">Show {filter}</p>
					</button>
				</div>

				{#if cosmeticName.length > 0}
					<div class="flex w-full flex-wrap justify-start gap-4">
						{#each player.collections.cosmetics
							.filter((c) => {
								if (cosmeticName.length > 0) {
									return c.cosmetic.name.toLowerCase().includes(cosmeticName);
								} else {
									return true;
								}
							})
							.filter((c) => {
								if (filter === 'Locked') {
									return !c.owned;
								} else if (filter === 'Unlocked') {
									return c.owned;
								} else {
									return true;
								}
							}) as { cosmetic, owned, chromaPacks, donationsMade }, i (cosmetic.name)}
							<Cosmetic {cosmetic} {owned} {chromaPacks} {donationsMade} />
						{/each}
					</div>
				{:else}
					<div class="flex flex-col gap-y-2">
						{#each collections as collection}
							{@const earnedTrophies = player.collections.cosmetics
								.filter((c) => c.cosmetic.collection === collection && c.owned)
								.reduce((acc, c) => acc + c.cosmetic.trophies, 0)}
							{@const totalTrophies = player.collections.cosmetics
								.filter((c) => c.cosmetic.collection === collection)
								.reduce((acc, c) => acc + c.cosmetic.trophies, 0)}
							{@const earnedReputation =
								player.collections.cosmetics
									.filter((c) => c.cosmetic.collection === collection && c.owned)
									.reduce(
										(acc, c) =>
											acc + c.donationsMade * (c.cosmetic.royalReputation?.reputationAmount || 0),
										0
									) || 0}
							{@const totalReputation = player.collections.cosmetics
								.filter((c) => c.cosmetic.collection === collection)
								.reduce(
									(acc, c) =>
										acc +
										(c.cosmetic.royalReputation?.donationLimit || 0) *
											(c.cosmetic.royalReputation?.reputationAmount || 0),
									0
								)}
							<div
								class="bg-neutral-800/50 {earnedReputation === totalReputation &&
								earnedTrophies === totalTrophies
									? 'border border-purple-800/50'
									: earnedTrophies == totalTrophies
										? 'border border-green-800/30'
										: ''} rounded-md"
							>
								<button
									class="flex w-full cursor-pointer justify-between py-3 {earnedReputation ===
										totalReputation && earnedTrophies === totalTrophies
										? 'bg-purple-800/50 hover:bg-purple-800/40'
										: earnedTrophies == totalTrophies
											? 'bg-green-800/50 hover:bg-green-800/40'
											: 'hover:bg-neutral-800'} duration-100 {openCollection === collection
										? 'rounded-t-md'
										: 'rounded-md'}"
									onclick={() => {
										if (openCollection === collection) {
											openCollection = '';
										} else {
											openCollection = collection;
										}
									}}
								>
									<div class="flex gap-x-2 px-3">
										<img
											src="https://cdn.islandstats.xyz/icons/wardrobe/{collection
												.toLowerCase()
												.replaceAll(' ', '_')}.png"
											alt="{collection} Icon"
											class="size-6 self-center md:size-8"
										/>
										<p class="self-center text-base font-semibold lg:text-xl">{collection}</p>
									</div>
									<div class="flex gap-x-4 px-3">
										<div class="flex gap-x-1 self-center tabular-nums">
											{#if earnedTrophies === totalTrophies && totalReputation > 0}
												<img
													src="https://cdn.islandstats.xyz/icons/currency/royal_reputation.png"
													alt="Royal Reputation Icon"
													class="hidden size-6 self-center md:flex"
												/>
												<p class="hidden gap-x-1 text-sm md:flex md:text-base">
													<span>{(earnedReputation || 0).toLocaleString()}</span>
													<span> / </span>
													<span>{totalReputation.toLocaleString()}</span>
													<span class="text-neutral-500"
														>({calculatePercentage(earnedReputation || 0, totalReputation) ||
															100}%)</span
													>
												</p>
											{:else}
												<img
													src="https://cdn.islandstats.xyz/icons/trophies/{player.collections.cosmetics.filter(
														(c) => c.cosmetic.collection === collection
													)[0].cosmetic.isBonusTrophies
														? 'silver'
														: 'purple'}.png"
													alt="Cosmetic Trophy Icon"
													class="hidden size-6 self-center md:flex"
												/>
												<p class="hidden gap-x-1 text-sm md:flex md:text-base">
													<span>{earnedTrophies.toLocaleString()}</span>
													<span> / </span>
													<span>{totalTrophies.toLocaleString()}</span>
													<span class="text-neutral-500"
														>({calculatePercentage(earnedTrophies, totalTrophies)}%)</span
													>
												</p>
											{/if}
										</div>
										<span class="mr-2 size-6 self-center text-neutral-500 lg:size-8"
											><ChevronUpDown /></span
										>
									</div>
								</button>
								{#if collection === openCollection}
									{@const cosmetics = player.collections.cosmetics
										.filter((c) => c.cosmetic.collection === collection) // filter by collection
										.sort((a, b) => {
											// sort by rarity
											const rarityOrder = [
												'COMMON',
												'UNCOMMON',
												'RARE',
												'EPIC',
												'LEGENDARY',
												'MYTHIC'
											];
											return (
												rarityOrder.indexOf(a.cosmetic.rarity) -
												rarityOrder.indexOf(b.cosmetic.rarity)
											);
										})
										.filter((c) => {
											// filter by owned
											if (filter === 'Locked') {
												return !c.owned;
											} else if (filter === 'Unlocked') {
												return c.owned;
											} else {
												return true;
											}
										})}
									<div
										transition:slide={{ duration: 200 }}
										class="flex flex-col gap-y-4 rounded-b-md border-t text-base lg:text-lg {earnedReputation ===
											totalReputation && totalTrophies === earnedTrophies
											? 'border-purple-800/30'
											: earnedTrophies == totalTrophies
												? 'border-green-800/30'
												: 'border-neutral-800'} p-4"
									>
										<WardrobeCollectionStats {player} {collection} />
										{#if cosmetics.length > 0}
											<div class="flex w-full flex-wrap justify-start gap-4">
												{#each cosmetics as { cosmetic, owned, chromaPacks, donationsMade }}
													<Cosmetic {cosmetic} {owned} {chromaPacks} {donationsMade} />
												{/each}
											</div>
										{:else}
											<p class="flex justify-center gap-x-2 py-4">
												<img
													src="https://cdn.discordapp.com/emojis/1042056406997663844.webp"
													alt="Trophies Icon"
													class="size-6 self-center"
												/>
												All cosmetics unlocked!
											</p>
										{/if}
									</div>
								{/if}
							</div>
						{/each}
					</div>
				{/if}
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
