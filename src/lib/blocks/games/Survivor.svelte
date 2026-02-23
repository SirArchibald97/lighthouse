<script lang="ts">
	import { badges } from '$lib/badges';
	import { miscStat } from '$lib/components/Snippets.svelte';
	import StatBarChart from '$lib/components/StatBarChart.svelte';
	import StatRatioChart from '$lib/components/StatRatioChart.svelte';
	import type { ParkourWarriorSurvivorStatistics } from '$lib/types';
	import TieredBadges from './TieredBadges.svelte';

	let { stats }: { stats: ParkourWarriorSurvivorStatistics } = $props();
</script>

<div
	class="flex flex-col divide-y divide-neutral-800 border-t border-neutral-800 px-4 text-base lg:text-lg"
>
	<!-- STATS -->
	<div class="grid grid-cols-1 gap-4 py-4 md:grid-cols-2 xl:grid-cols-3">
		<!-- LEAP REACHED -->
		<StatBarChart
			data={[
				{ label: 'Leap 7', amount: stats.leap_7, color: '#b360eb' },
				{ label: 'Leap 6', amount: stats.leap_6 - stats.leap_7, color: '#c280f1' },
				{ label: 'Leap 5', amount: stats.leap_5 - stats.leap_6, color: '#dcc0fb' },
				{ label: 'Leap 4', amount: stats.leap_4 - stats.leap_5, color: '#e7e0fd' },
				{ label: 'Leap 3', amount: stats.leap_3 - stats.leap_4, color: '#f4f0fe' },
				{ label: 'Leap 2', amount: stats.leap_2 - stats.leap_3, color: '#f4f0fe' }
			]}
			total={stats.games_played}
			tooltipLabel="Completions"
		>
			{#snippet title()}
				<p class="text-lg font-semibold">Leap Reached</p>
			{/snippet}
			{#snippet subtitle()}
				<p class="text-sm">
					Total Games: <span class="font-semibold tabular-nums"
						>{stats.games_played.toLocaleString()}</span
					>
				</p>
			{/snippet}
		</StatBarChart>

		<!-- LEAP COMPLETIONS -->
		<StatBarChart
			data={[
				{ label: 'Leap 1', amount: stats.leap_2, color: '#a440e3' },
				{ label: 'Leap 2', amount: stats.leap_3, color: '#b360eb' },
				{ label: 'Leap 3', amount: stats.leap_4, color: '#c280f1' },
				{ label: 'Leap 4', amount: stats.leap_5, color: '#dcc0fb' },
				{ label: 'Leap 5', amount: stats.leap_6, color: '#e7e0fd' },
				{ label: 'Leap 6', amount: stats.leap_7, color: '#f4f0fe' }
			]}
			total={stats.leap_2 +
				stats.leap_3 +
				stats.leap_4 +
				stats.leap_5 +
				stats.leap_6 +
				stats.leap_7}
			tooltipLabel="Completions"
		>
			{#snippet title()}
				<p class="text-lg font-semibold">Leap Completions</p>
			{/snippet}
			{#snippet subtitle()}
				<p class="text-sm">
					Total Leaps: <span class="font-semibold tabular-nums"
						>{(
							stats.leap_2 +
							stats.leap_3 +
							stats.leap_4 +
							stats.leap_5 +
							stats.leap_6 +
							stats.leap_7
						).toLocaleString()}</span
					>
				</p>
			{/snippet}
		</StatBarChart>

		<!-- WIN/LOSS RATIO -->
		<StatRatioChart
			firstStat={stats.wins}
			secondStat={stats.losses}
			colour="#a440e3"
			usePercentageOption
		>
			{#snippet title(useRatio)}
				<p class="text-lg font-semibold">Win/Loss Ratio</p>
			{/snippet}
			{#snippet subtitle()}
				<p class="text-sm">
					Total Wins: <span class="font-semibold tabular-nums">{stats.wins.toLocaleString()}</span>
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

		<!-- LEAP CHAMPION WIN/LOSS RATIO -->
		<StatRatioChart
			firstStat={stats.leap_champions}
			secondStat={stats.leap_2 +
				stats.leap_3 +
				stats.leap_4 +
				stats.leap_5 +
				stats.leap_6 +
				stats.leap_7 -
				stats.leap_champions}
			colour="#a440e3"
			usePercentageOption
		>
			{#snippet title(useRatio)}
				<p class="text-lg font-semibold">
					{useRatio ? 'Leap Champion Win/Loss Ratio' : 'Leap Champion Win Rate Percentage'}
				</p>
			{/snippet}
			{#snippet subtitle()}
				<p class="text-sm">
					Total Leap Champions: <span class="font-semibold tabular-nums"
						>{stats.leap_champions.toLocaleString()}</span
					>
					/ Total Leaps:
					<span class="font-semibold tabular-nums"
						>{(
							stats.leap_2 +
							stats.leap_3 +
							stats.leap_4 +
							stats.leap_5 +
							stats.leap_6 +
							stats.leap_7
						).toLocaleString()}</span
					>
				</p>
			{/snippet}
			{#snippet legend(useRatio, value)}
				{#if useRatio}
					<p class="text-center text-base">
						You've won <span class="font-semibold tabular-nums">{value} leaps</span> for every loss
					</p>
				{:else}
					<p class="text-center text-base">
						You've won <span class="font-semibold tabular-nums">{value}</span> of the leaps you've played
					</p>
				{/if}
			{/snippet}
		</StatRatioChart>

		<!-- MISC STATS -->
		<div class="rounded-lg bg-neutral-800 p-4">
			<p class="text-lg font-semibold">Misc Stats</p>
			<div class="flex flex-col gap-y-3 pt-2">
				<div>
					{@render miscStat('Players Outlived', stats.kills)}
					{@render miscStat('Obstacles Completed', stats.obstacles)}
					{@render miscStat('Leap Champions', stats.leap_champions)}
				</div>
			</div>
		</div>
	</div>

	<!-- TIERED BADGES -->
	<div class="text-md grid grid-cols-1 gap-4 py-4 *:rounded-lg md:grid-cols-2">
		<TieredBadges {stats} badges={badges.survivor_tiered} />
	</div>
</div>
