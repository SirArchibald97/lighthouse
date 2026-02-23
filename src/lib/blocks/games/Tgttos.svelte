<script lang="ts">
	import { badges } from '$lib/badges';
	import { miscStat } from '$lib/components/Snippets.svelte';
	import StatBarChart from '$lib/components/StatBarChart.svelte';
	import StatRatioChart from '$lib/components/StatRatioChart.svelte';
	import type { TgttosStatistics } from '$lib/types';
	import Badges from './Badges.svelte';
	import TieredBadges from './TieredBadges.svelte';

	let { stats }: { stats: TgttosStatistics } = $props();
</script>

<div
	class="flex flex-col divide-y divide-neutral-800 border-t border-neutral-800 px-4 text-base lg:text-lg"
>
	<div class="grid grid-cols-1 gap-4 py-4 md:grid-cols-2 xl:grid-cols-3">
		<!-- GAME PLACEMETNS -->
		<StatBarChart
			data={[
				{ label: '1st Place', amount: stats.first_place, color: '#ffe842' },
				{
					label: 'Top 3',
					amount: stats.top_three - stats.first_place,
					color: '#ffe680'
				},
				{
					label: 'Top 5',
					amount: stats.top_five - stats.top_three,
					color: '#fff5b3'
				},
				{
					label: 'Top 8',
					amount: stats.top_eight - stats.top_five,
					color: '#fffacc'
				}
			]}
			total={stats.games_played}
			tooltipLabel="Placements"
		>
			{#snippet title()}
				<p class="text-lg font-semibold">Game Placements</p>
			{/snippet}
			{#snippet subtitle()}
				<p class="text-sm">
					Total Games: <span class="font-semibold tabular-nums"
						>{stats.games_played.toLocaleString()}</span
					>
				</p>
			{/snippet}
		</StatBarChart>

		<!-- ROUND PLACEMENTS -->
		<StatBarChart
			data={[
				{ label: '1st Place', amount: stats.round_first_place, color: '#ffe842' },
				{
					label: 'Top 3',
					amount: stats.round_top_three - stats.round_first_place,
					color: '#ffe680'
				},
				{
					label: 'Top 5',
					amount: stats.round_top_five - stats.round_top_three,
					color: '#fff5b3'
				},
				{
					label: 'Top 8',
					amount: stats.round_top_eight - stats.round_top_five,
					color: '#fffacc'
				}
			]}
			total={stats.games_played * 3}
			tooltipLabel="Placements"
		>
			{#snippet title()}
				<p class="text-lg font-semibold">Round Placements</p>
			{/snippet}
			{#snippet subtitle()}
				<p class="text-sm">
					Total Rounds: <span class="font-semibold tabular-nums"
						>{(stats.games_played * 3).toLocaleString()}</span
					>
				</p>
			{/snippet}
		</StatBarChart>

		<!-- KILL/DEATH RATIO -->
		<StatRatioChart firstStat={stats.kills} secondStat={stats.deaths} colour="#ffe842">
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
					<span class="font-semibold tabular-nums">{stats.deaths.toLocaleString()}</span>
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

		<!-- WIN/LOSS RATIO -->
		<StatRatioChart
			firstStat={stats.first_place}
			secondStat={stats.game_losses}
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
					Total Wins: <span class="font-semibold tabular-nums"
						>{stats.first_place.toLocaleString()}</span
					>
					/ Total Losses:
					<span class="font-semibold tabular-nums">{stats.game_losses.toLocaleString()}</span>
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

		<!-- ROUND WIN/LOSS RATIO -->
		<StatRatioChart
			firstStat={stats.round_first_place}
			secondStat={stats.round_losses}
			colour="#ffe842"
			usePercentageOption
		>
			{#snippet title(useRatio)}
				<p class="text-lg font-semibold">
					{useRatio ? 'Round Win/Loss Ratio' : 'Round Win Rate Percentage'}
				</p>
			{/snippet}
			{#snippet subtitle()}
				<p class="text-sm">
					Total Round Wins: <span class="font-semibold tabular-nums"
						>{stats.round_first_place.toLocaleString()}</span
					>
					/ Total Round Losses:
					<span class="font-semibold tabular-nums">{stats.round_losses.toLocaleString()}</span>
				</p>
			{/snippet}
			{#snippet legend(useRatio, value)}
				{#if useRatio}
					<p class="text-center text-base">
						You've gotten <span class="font-semibold tabular-nums">{value} round wins</span> for every
						loss
					</p>
				{:else}
					<p class="text-center text-base">
						You've won <span class="font-semibold tabular-nums">{value}</span> of rounds you've played
					</p>
				{/if}
			{/snippet}
		</StatRatioChart>

		<!-- MISC STATS -->
		<div class="rounded-lg bg-neutral-800 p-4">
			<p class="text-lg font-semibold">Misc Stats</p>
			<div class="flex flex-col gap-y-3 pt-2">
				<div>
					{@render miscStat('Blocks Placed', stats.blocks_placed)}
					{@render miscStat('Blocks Broken', stats.blocks_broken)}
				</div>
				<div>
					{@render miscStat('Chickens Punched', stats.chickens_punched)}
					{@render miscStat('DNFs', stats.games_played * 3 - stats.chickens_punched)}
				</div>
			</div>
		</div>
	</div>

	<!-- BADGES -->
	<div class="text-md grid grid-cols-1 gap-4 py-4 *:rounded-lg md:grid-cols-2">
		<Badges {stats} badges={badges.tgttos} />
	</div>

	<!-- TIERED BADGES -->
	<div class="text-md grid grid-cols-1 gap-4 py-4 *:rounded-lg md:grid-cols-2">
		<TieredBadges {stats} badges={badges.tgttos_tiered} />
	</div>
</div>
