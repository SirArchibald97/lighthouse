<script lang="ts">
	import { badges } from '$lib/badges';
	import { miscStat } from '$lib/components/Snippets.svelte';
	import StatBarChart from '$lib/components/StatBarChart.svelte';
	import StatRatioChart from '$lib/components/StatRatioChart.svelte';
	import type { RocketSpleefStatistics } from '$lib/types';
	import { calculatePercentage } from '$lib/utils';
	import Badges from './Badges.svelte';
	import TieredBadges from './TieredBadges.svelte';

	let { stats }: { stats: RocketSpleefStatistics } = $props();
</script>

<div
	class="flex flex-col divide-y divide-neutral-800 border-t border-neutral-800 px-4 text-base lg:text-lg"
>
	<!-- STATS -->
	<div class="grid grid-cols-1 gap-4 py-4 md:grid-cols-2 xl:grid-cols-3">
		<!-- SOLO PLACEMENTS -->
		<StatBarChart
			data={[
				{ label: '1st Place', amount: stats.first_place, color: '#00bc7d' },
				{
					label: 'Top 3',
					amount: stats.top_three - stats.first_place,
					color: '#40cd9e'
				},
				{
					label: 'Top 5',
					amount: stats.top_five - stats.top_three,
					color: '#80debe'
				},
				{
					label: 'Top 8',
					amount: stats.top_eight - stats.top_five,
					color: '#bfeedf'
				}
			]}
			total={stats.games_played}
			tooltipLabel="Placements"
		>
			{#snippet title()}
				<p class="text-lg font-semibold">Placements</p>
			{/snippet}
			{#snippet subtitle()}
				<p class="text-sm">
					Total Games: <span class="font-semibold tabular-nums"
						>{stats.games_played.toLocaleString()}</span
					>
				</p>
			{/snippet}
		</StatBarChart>

		<StatRatioChart
			firstStat={stats.first_place}
			secondStat={stats.losses}
			colour="#00bc7d "
			usePercentageOption
		>
			{#snippet title(useRatio)}
				<p class="text-lg font-semibold">Win/Loss Ratio</p>
			{/snippet}
			{#snippet subtitle()}
				<p class="text-sm">
					Total Wins: <span class="font-semibold tabular-nums"
						>{stats.first_place.toLocaleString()}</span
					>
					/ Total Losses:
					<span class="font-semibold tabular-nums">{stats.losses.toLocaleString()}</span>
				</p>
			{/snippet}
			{#snippet legend(useRatio, value)}
				{#if useRatio}
					<p class="text-center text-base">
						You've won <span class="font-semibold tabular-nums">{value} games</span> for every loss
					</p>
				{:else}
					<p class="text-center text-base">
						You've won <span class="font-semibold tabular-nums">{value}</span> of the games you've played
					</p>
				{/if}
			{/snippet}
		</StatRatioChart>

		<StatBarChart
			data={[
				{ label: 'Ranged', amount: stats.kills - stats.melee_kills, color: '#00bc7d' },
				{
					label: 'Melee',
					amount: stats.melee_kills,
					color: '#80debe'
				}
			]}
			total={stats.kills}
			tooltipLabel="Kills"
		>
			{#snippet title()}
				<p class="text-lg font-semibold">Kill Method</p>
			{/snippet}
			{#snippet subtitle()}
				<p class="text-sm">
					Total Kills: <span class="font-semibold tabular-nums">{stats.kills.toLocaleString()}</span
					>
				</p>
			{/snippet}
		</StatBarChart>

		<StatRatioChart
			firstStat={stats.kills}
			secondStat={stats.losses}
			colour="#00bc7d"
			usePercentageOption
		>
			{#snippet title(useRatio)}
				<p class="text-lg font-semibold">
					{useRatio ? 'Kill/Death Ratio' : 'Engagement Win Percentage'}
				</p>
			{/snippet}
			{#snippet subtitle()}
				<p class="text-sm">
					Total Kills: <span class="font-semibold tabular-nums">{stats.kills.toLocaleString()}</span
					>
					/ Total Deaths:
					<span class="font-semibold tabular-nums">{stats.losses.toLocaleString()}</span>
				</p>
			{/snippet}
			{#snippet legend(useRatio, value)}
				{#if useRatio}
					<p class="text-center text-base">
						You've gotten <span class="font-semibold tabular-nums">{value} kills</span> for every death
					</p>
				{:else}
					<p class="text-center text-base">
						You've won <span class="font-semibold tabular-nums">{value}</span> of the fights you've taken
					</p>
				{/if}
			{/snippet}
		</StatRatioChart>

		<!-- MISC STATS -->
		<div class="rounded-lg bg-neutral-800 p-4">
			<p class="text-lg font-semibold">Misc Stats</p>
			<div class="flex flex-col gap-y-3 pt-2">
				<div>
					{@render miscStat('Players Outlived', stats.players_outlived)}
				</div>
			</div>
		</div>
	</div>

	<!-- BADGES -->
	<div class="text-md grid grid-cols-1 gap-4 py-4 *:rounded-lg md:grid-cols-2">
		<Badges {stats} badges={badges.rocket_spleef} />
	</div>

	<!-- TIERED BADGES -->
	<div class="text-md grid grid-cols-1 gap-4 py-4 *:rounded-lg md:grid-cols-2">
		<TieredBadges {stats} badges={badges.rocket_spleef_tiered} />
	</div>
</div>
