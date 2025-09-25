<script lang="ts">
	import type {
		BattleBoxStatistics,
		DynaballStatistics,
		HitwStatistics,
		IslandTieredBadge,
		ParkourWarriorDojoStatistics,
		ParkourWarriorSurvivorStatistics,
		PlayerStatistics,
		RocketSpleefStatistics,
		SkyBattleStatistics,
		TgttosStatistics
	} from '$lib/types';
	import { calculateBadgeTier, calculateMaxTrophies, calculateTotalTrophies } from '$lib/badges';
	import { shortenNumber } from '$lib/lighthouseUtils';
	import { Tooltip } from 'flowbite-svelte';

	const {
		stats,
		badges
	}: {
		stats:
			| BattleBoxStatistics
			| SkyBattleStatistics
			| TgttosStatistics
			| HitwStatistics
			| DynaballStatistics
			| ParkourWarriorDojoStatistics
			| ParkourWarriorSurvivorStatistics
			| RocketSpleefStatistics;
		badges: IslandTieredBadge[];
	} = $props();
</script>

{#each badges as badge}
	<div
		class={`flex flex-col justify-between gap-y-2 rounded-md border text-base lg:text-lg ${calculateTotalTrophies(stats!, [], [badge]) === calculateMaxTrophies([], [badge]) ? 'border-green-800/50 bg-green-800/10' : 'border-neutral-800'}`}>
		<div class="flex justify-between p-2">
			<div class="flex min-w-full justify-between gap-x-4">
				<div class="flex gap-x-2">
					<img class="size-12 lg:size-16" src={`https://cdn.islandstats.xyz/badges/${badge.icon}.png`} alt={badge.name} />
					<div class="flex flex-col">
						<p class="font-semibold">{badge.name} {calculateBadgeTier(stats[badge.stat], badge.tiers).tier.name}</p>
						<p class="text-sm text-neutral-500 lg:text-base">{badge.description.replaceAll('%%', ' ')}</p>
					</div>
				</div>
				<div
					class={`flex shrink-0 gap-x-1 self-start rounded-full px-2 py-0.5 ${stats[badge.stat] >= badge.tiers[badge.tiers.length - 1].amount ? 'bg-green-800' : 'bg-neutral-700/50'}`}>
					<img src="https://cdn.islandstats.xyz/icons/trophies/red.png" alt="Trophies Icon" class="size-6 self-center" />
					<p class="flex self-center text-sm lg:text-base">{calculateTotalTrophies(stats, [], [badge])}</p>
				</div>
			</div>
		</div>
		<p
			class={`rounded-b-md px-3 py-2 text-sm tabular-nums lg:text-base ${stats[badge.stat]! >= badge.tiers[badge.tiers.length - 1].amount ? 'bg-green-800/50' : 'bg-neutral-800'}`}>
			{#each badge.tiers as tier}
				{#if stats[badge.stat] >= tier.amount}
					<span class="cursor-pointer text-green-600">{shortenNumber(tier.amount).toLocaleString()}</span>
				{:else if calculateBadgeTier(stats[badge.stat], badge.tiers).next.name === tier.name}
					<span class="text-orange-400">{stats[badge.stat]?.toLocaleString() || '0'}</span>
					<span class="text-neutral-500">
						<span> / </span>
						<span>{shortenNumber(tier.amount).toLocaleString()}</span>
					</span>
				{:else}
					<span class="cursor-pointer text-orange-400">{shortenNumber(tier.amount).toLocaleString()}</span>
				{/if}
				<Tooltip arrow={false} type="custom" placement="top" class="rounded-md border !border-neutral-700 !bg-neutral-900 px-2 py-0.5 text-sm">
					<p class="flex gap-x-1">
						<img src="https://cdn.islandstats.xyz/icons/trophies/red.png" alt="Trophies Icon" class="size-4 self-center" />
						<span class="font-semibold tabular-nums {stats[badge.stat] >= tier.amount ? 'text-green-600' : 'text-neutral-400'}">{tier.trophies}</span>
					</p>
				</Tooltip>

				{#if badge.tiers.indexOf(tier) !== badge.tiers.length - 1}<span class="px-1 pr-2 text-neutral-600">•</span>{/if}
			{/each}

			{#if badge.tiers[badge.tiers.length - 1].amount < stats[badge.stat]}
				<span class="cursor-pointer self-center text-green-600">({stats[badge.stat].toLocaleString()})</span>
			{/if}
		</p>
	</div>
{/each}
