<script lang="ts">
	import { badges } from '$lib/badges';
	import { miscStat } from '$lib/components/Snippets.svelte';
	import StatBarChart from '$lib/components/StatBarChart.svelte';
	import StatRatioChart from '$lib/components/StatRatioChart.svelte';
	import type { DynaballStatistics } from '$lib/types';
	import { calculatePercentage } from '$lib/utils';
	import Badges from './Badges.svelte';
	import TieredBadges from './TieredBadges.svelte';

	let { stats }: { stats: DynaballStatistics } = $props();
</script>

<div
	class="flex flex-col divide-y divide-neutral-800 border-t border-neutral-800 px-4 text-base lg:text-lg"
>
	<!-- STATS -->
	<div class="grid grid-cols-1 gap-4 py-4 md:grid-cols-2 xl:grid-cols-3">
		<!-- SURVIVAL TIMES -->
		<StatBarChart
			data={[
				{ label: '1 Minute', amount: stats.survive_1m - stats.survive_2m, color: '#ff8904 ' },
				{ label: '2 Minutes', amount: stats.survive_2m - stats.survive_3m, color: '#ffaa33 ' },
				{ label: '3 Minutes', amount: stats.survive_3m - stats.survive_4m, color: '#ffcc66 ' },
				{ label: '4 Minutes', amount: stats.survive_4m, color: '#ffee99 ' }
			]}
			total={stats.games_played}
			tooltipLabel="Games"
		>
			{#snippet title()}
				<p class="text-lg font-semibold">Survival Times</p>
			{/snippet}
			{#snippet subtitle()}
				<p class="text-sm">
					Total Games: <span class="font-semibold tabular-nums"
						>{stats.games_played.toLocaleString()}</span
					>
				</p>
			{/snippet}
		</StatBarChart>

		<!-- WIN/LOSS RATIO -->
		<StatRatioChart
			firstStat={stats.wins}
			secondStat={stats.losses}
			colour="#ffe842"
			usePercentageOption
		>
			{#snippet title(useRatio)}
				<p class="text-lg font-semibold">
					{useRatio ? 'Win/Loss Ratio' : 'Win Rate Percentage'}
				</p>
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
						You've gotten <span class="font-semibold tabular-nums">{value} wins</span> for every loss
					</p>
				{:else}
					<p class="text-center text-base">
						You've won <span class="font-semibold tabular-nums">{value}</span> of games you've played
					</p>
				{/if}
			{/snippet}
		</StatRatioChart>

		<!-- KILL/DEATH RATIO -->
		<StatRatioChart firstStat={stats.kills} secondStat={stats.losses} colour="#ffe842" max={3}>
			{#snippet title(useRatio)}
				<p class="text-lg font-semibold">Kill/Death Ratio</p>
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
				{/if}
			{/snippet}
		</StatRatioChart>

		<!-- MISC STATS -->
		<div class="rounded-lg bg-neutral-800 p-4">
			<p class="text-lg font-semibold">Misc Stats</p>
			<div class="flex flex-col gap-y-3 pt-2">
				<div>
					{@render miscStat('Players Stuck', stats.players_stuck)}
					{@render miscStat('Spawners Broken', stats.spawners_destroyed)}
				</div>
				<div>
					{@render miscStat('Blocks Destroyed', stats.blocks_destroyed)}
					{@render miscStat('Blocks Placed', stats.blocks_placed)}
				</div>
			</div>
		</div>
	</div>

	<!-- BADGES -->
	<div class="text-md grid grid-cols-1 gap-4 py-4 *:rounded-lg md:grid-cols-2">
		<Badges {stats} badges={badges.dynaball} />
	</div>

	<!-- TIERED BADGES -->
	<div class="text-md grid grid-cols-1 gap-4 py-4 *:rounded-lg md:grid-cols-2">
		<TieredBadges {stats} badges={badges.dynaball_tiered} />
	</div>
</div>
