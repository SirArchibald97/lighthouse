<script lang="ts">
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import type { Player } from '$lib/types';
	import { calculateTrophiesToNextEvolution, getCrownColour, getFactionColour } from '$lib/utils';

	const { player }: { player: Player } = $props();

	const trophies = (
		player: Player
	): { name: string; current: number; max?: number; icon: string }[] => {
		return [
			{
				name: 'Total',
				current: player.trophies.total,
				max: player.trophies.max,
				icon: '/trophies/yellow'
			},
			{
				name: 'Skill',
				current: player.trophies.skill.total,
				max: player.trophies.skill.max,
				icon: '/trophies/red'
			},
			{
				name: 'Style',
				current: player.trophies.style.total,
				max: player.trophies.style.max,
				icon: '/trophies/purple'
			},
			{
				name: 'Angler',
				current: player.trophies.angler.total,
				max: player.trophies.angler.max,
				icon: '/trophies/blue'
			},
			{
				name: 'Bonus',
				current: player.trophies.bonus,
				icon: '/trophies/silver'
			}
		];
	};

	const wallet = (player: Player): { name: string; amount: number; icon: string }[] => {
		return [
			{
				name: 'Coins',
				amount: player.collections?.currency.coins || 0,
				icon: 'coin'
			},
			{
				name: 'A.N.G.L.R Tokens',
				amount: player.collections?.currency.anglrTokens || 0,
				icon: 'angler_token'
			},
			{
				name: 'Royal Reputation',
				amount: player.collections?.currency.royalReputation || 0,
				icon: 'royal_reputation'
			}
		];
	};

	const isNextFactionLevelEvolution = (player: Player): boolean => {
		const faction = player.factions?.find((f) => f.selected);
		if (!faction) return false;
		return faction.levelData.level + 1 === faction.levelData.nextEvolutionLevel;
	};
</script>

<div class="flex flex-col gap-4 lg:flex-row">
	<div
		class="flex w-full flex-col justify-between gap-y-4 rounded-lg border border-neutral-800 bg-neutral-900 p-4 lg:w-2/3"
	>
		<!-- CROWN LEVEL PROGRESS -->
		<div class="flex flex-col gap-y-3">
			<div class="flex flex-row justify-between">
				<p class="text-base font-semibold md:text-lg lg:text-xl">Crown Level</p>
				<p class="flex gap-x-1 text-sm md:gap-x-2 md:text-base lg:text-lg">
					<span class="self-center">Progress to</span>
					<img
						src="https://cdn.islandstats.xyz/icons/crowns/{player.crownLevel.levelData.level + 1 ===
						player.crownLevel.levelData.nextEvolutionLevel
							? player.crownLevel.levelData.evolution + 1
							: player.crownLevel.levelData.evolution}.png"
						alt="{player.crownLevel.levelData.level + 1} Crown Icon"
						class="inline-block size-4 self-center md:size-6 lg:size-7"
					/>
					<span class="self-center font-semibold tabular-nums"
						>{player.crownLevel.levelData.level + 1}</span
					>
				</p>
			</div>
			<ProgressBar
				value={player.crownLevel.levelData.nextLevelProgress.obtained}
				max={player.crownLevel.levelData.nextLevelProgress.obtainable}
				min={0}
				colour={getCrownColour(player.crownLevel.levelData.level)}
			></ProgressBar>
			<div class="flex flex-col gap-x-4 gap-y-1 md:flex-row">
				<p class="text-sm md:text-base lg:text-lg">
					<span class="text-neutral-300 tabular-nums">
						{Math.round(
							(player.crownLevel.levelData.nextLevelProgress.obtained /
								player.crownLevel.levelData.nextLevelProgress.obtainable) *
								100 *
								10
						) / 10}%
					</span>
					<span class="text-neutral-300 tabular-nums">
						({player.crownLevel.levelData.nextLevelProgress.obtained.toLocaleString()}/{player.crownLevel.levelData.nextLevelProgress.obtainable.toLocaleString()})
					</span>
				</p>
				<p class="hidden self-center md:flex">/</p>
				<p class="flex items-center gap-x-1 text-sm md:gap-x-2 md:text-base lg:text-lg">
					<span class="flex flex-row gap-x-1.5 text-neutral-300">
						<img
							src={`https://cdn.islandstats.xyz/icons/crowns/${player.crownLevel.levelData.evolution + 1}.png`}
							alt={`Crown Level ${player.crownLevel.levelData.evolution} Icon`}
							class="size-4 self-center md:size-5"
						/>
						<span class="font-semibold tabular-nums"
							>{player.crownLevel.levelData.nextEvolutionLevel}</span
						>
					</span>
					<span>in</span>
					<span class="flex flex-row gap-x-1 text-neutral-300">
						<img
							src={`https://cdn.islandstats.xyz/icons/trophies/yellow.png`}
							alt="Trophy Icon"
							class="size-4 self-center md:size-5"
						/>
						<span class="font-semibold tabular-nums"
							>{calculateTrophiesToNextEvolution(
								'crown',
								player.trophies.total,
								player.crownLevel.levelData.nextEvolutionLevel
							).toLocaleString()}</span
						>
					</span>
				</p>
			</div>
		</div>

		<!-- FACTION PROGRESS -->
		<div class="flex flex-col gap-y-3">
			<div class="flex flex-row justify-between">
				<p class="text-base font-semibold md:text-lg lg:text-xl">Active Faction</p>
				<p class="flex gap-x-1 text-sm md:gap-x-2 md:text-base lg:text-lg">
					<span class="self-center">Progress to</span>
					<img
						src="https://cdn.islandstats.xyz/factions/{player.factions
							?.find((f) => f.selected)
							?.name.split('_')[0]
							.toLowerCase()}/{isNextFactionLevelEvolution(player)
							? player.factions?.find((f) => f.selected)?.levelData.evolution || 0 + 1
							: player.factions?.find((f) => f.selected)?.levelData.evolution}.png"
						alt="{player.factions?.find((f) => f.selected)?.name} Faction Badge"
						class="inline-block aspect-3/2 h-5 self-center md:h-6"
					/>
					<span class="self-center font-semibold tabular-nums"
						>{player.factions?.find((f) => f.selected)?.levelData.level}</span
					>
				</p>
			</div>
			<ProgressBar
				value={player.factions?.find((f) => f.selected)?.levelData.nextLevelProgress.obtained || 0}
				max={player.factions?.find((f) => f.selected)?.levelData.nextLevelProgress.obtainable || 0}
				min={0}
				colour={getFactionColour(player.factions?.find((f) => f.selected)?.name || 'RED_RABBITS')}
			></ProgressBar>
			<p class="text-sm md:text-base lg:text-lg">
				<span class="text-neutral-300 tabular-nums">
					{Math.round(
						((player.factions?.find((f) => f.selected)?.levelData.nextLevelProgress.obtained || 0) /
							(player.factions?.find((f) => f.selected)?.levelData.nextLevelProgress.obtainable ||
								0)) *
							100 *
							10
					) / 10}%
				</span>
				<span class="text-neutral-300 tabular-nums">
					({player.factions
						?.find((f) => f.selected)
						?.levelData.nextLevelProgress.obtained.toLocaleString()}/{player.factions
						?.find((f) => f.selected)
						?.levelData.nextLevelProgress.obtainable.toLocaleString()})
				</span>
			</p>
		</div>
	</div>

	<!-- TROPHY OVERVIEW -->
	<div
		class="flex w-full flex-col gap-4 divide-x divide-neutral-800 rounded-lg lg:w-1/3 lg:flex-row"
	>
		<div
			class="flex w-full flex-col gap-y-2 rounded-lg border border-neutral-800 bg-neutral-900 p-4 lg:w-1/2"
		>
			<p class="text-lg font-semibold xl:text-2xl">Trophies</p>
			<div class="flex flex-col gap-x-4 gap-y-2 md:flex-row md:flex-wrap lg:flex-col">
				{#each trophies(player) as trophy}
					<div class="flex items-center gap-x-2 text-lg">
						<img
							src="https://cdn.islandstats.xyz/icons/{trophy.icon}.png"
							alt="{trophy.name} Trophy Icon"
							class="inline-block size-6 self-center"
						/>
						<Tooltip>
							{#snippet trigger()}
								<p class="text-base tabular-nums lg:text-lg">
									{trophy.current.toLocaleString()}
									{#if trophy.max}
										<span class="text-neutral-500"> / {trophy.max.toLocaleString()}</span>
									{/if}
								</p>
							{/snippet}
							{#snippet content()}
								<p>{trophy.name} Trophies</p>
							{/snippet}
						</Tooltip>
					</div>
				{/each}
			</div>
		</div>
		<div
			class="flex w-full flex-col gap-y-2 rounded-lg border border-neutral-800 bg-neutral-900 p-4 lg:w-1/2"
		>
			<p class="text-lg font-semibold xl:text-2xl">Wallet</p>
			<div class="flex flex-col gap-x-4 gap-y-2 md:flex-row md:flex-wrap lg:flex-col">
				{#each wallet(player) as currency}
					<div class="flex items-center gap-x-2 text-lg">
						<img
							src="https://cdn.islandstats.xyz/icons/currency/{currency.icon}.png"
							alt="{currency.name} Trophy Icon"
							class="inline-block size-6 self-center"
						/>
						<Tooltip>
							{#snippet trigger()}
								<p class="text-base tabular-nums lg:text-lg">{currency.amount.toLocaleString()}</p>
							{/snippet}
							{#snippet content()}
								<p>{currency.name}</p>
							{/snippet}
						</Tooltip>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
