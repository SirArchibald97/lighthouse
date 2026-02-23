<script lang="ts">
	import { badges } from '$lib/badges';
	import { miscStat } from '$lib/components/Snippets.svelte';
	import StatBarChart from '$lib/components/StatBarChart.svelte';
	import StatRatioChart from '$lib/components/StatRatioChart.svelte';
	import type { HitwStatistics } from '$lib/types';
	import Badges from './Badges.svelte';
	import TieredBadges from './TieredBadges.svelte';

	let { stats }: { stats: HitwStatistics } = $props();
</script>

<div
	class="flex flex-col divide-y divide-neutral-800 border-t border-neutral-800 px-4 text-base lg:text-lg"
>
	<!-- STATS -->
	<div class="grid grid-cols-1 gap-4 py-4 md:grid-cols-2 xl:grid-cols-3">
		<StatBarChart
			data={[
				{ label: '1st Place', amount: stats.first_place, color: '#00c951 ' },
				{
					label: 'Top 3',
					amount: stats.top_three - stats.first_place,
					color: '#33d966 '
				},
				{
					label: 'Top 5',
					amount: stats.top_five - stats.top_three,
					color: '#66e680 '
				},
				{
					label: 'Top 8',
					amount: stats.top_eight - stats.top_five,
					color: '#99f39f '
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
			colour="#00c951"
			usePercentageOption
		>
			{#snippet title(useRatio)}
				<p class="text-lg font-semibold">{useRatio ? 'Win/Loss Ratio' : 'Win Rate Percentage'}</p>
			{/snippet}
			{#snippet subtitle()}
				<p class="text-sm">
					Total Games: <span class="font-semibold tabular-nums"
						>{stats.games_played.toLocaleString()}</span
					>
				</p>
			{/snippet}
			{#snippet legend(useRatio, value)}
				{#if useRatio}
					<p class="text-center text-base">
						You've won <span class="font-semibold tabular-nums">{value} games </span> for every loss
					</p>
				{:else}
					<p class="text-center text-base">
						You've won <span class="font-semibold tabular-nums">{value}</span> of the games you've played
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
					{@render miscStat('Walls Dodged', stats.walls_dodged)}
				</div>
				<div>
					{@render miscStat(
						'Survived 1 minute',
						stats.survived_minute - stats.survived_two_minute,
						stats.games_played
					)}
					{@render miscStat('Survived 2 minutes', stats.survived_two_minute, stats.games_played)}
				</div>
			</div>
		</div>
	</div>

	<!-- BADGES -->
	<div class="text-md grid grid-cols-1 gap-4 py-4 *:rounded-lg md:grid-cols-2">
		<Badges {stats} badges={badges.hitw} />
	</div>

	<!-- TIERED BADGES -->
	<div class="text-md grid grid-cols-1 gap-4 py-4 *:rounded-lg md:grid-cols-2">
		<TieredBadges {stats} badges={badges.hitw_tiered} />
	</div>
</div>
