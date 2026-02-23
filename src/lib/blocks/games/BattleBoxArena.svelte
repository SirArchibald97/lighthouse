<script lang="ts">
	import { badges } from '$lib/badges';
	import { miscStat } from '$lib/components/Snippets.svelte';
	import StatBarChart from '$lib/components/StatBarChart.svelte';
	import StatRatioChart from '$lib/components/StatRatioChart.svelte';
	import type { BattleBoxArenaStatistics } from '$lib/types';
	import Badges from './Badges.svelte';
	import TieredBadges from './TieredBadges.svelte';

	let { stats }: { stats: BattleBoxArenaStatistics } = $props();
</script>

<div
	class="flex flex-col divide-y divide-neutral-800 border-t border-neutral-800 px-4 text-base lg:text-lg"
>
	<!-- STATS -->
	<div class="grid grid-cols-1 gap-4 py-4 md:grid-cols-2 xl:grid-cols-3">
		<!-- SOLO PLACEMENTS -->
		<StatBarChart
			data={[
				{ label: '1st Place', amount: stats.first_place, color: '#e33030' },
				{
					label: 'Top 3',
					amount: stats.top_three - stats.first_place,
					color: '#ed5555'
				},
				{
					label: 'Other',
					amount: stats.games_played - stats.top_three,
					color: '#f58080'
				}
			]}
			total={stats.games_played}
			tooltipLabel="Placements"
		>
			{#snippet title()}
				<p class="text-lg font-semibold">Solo Placements</p>
			{/snippet}
			{#snippet subtitle()}
				<p class="text-sm">
					Total Games: <span class="font-semibold tabular-nums"
						>{stats.games_played.toLocaleString()}</span
					>
				</p>
			{/snippet}
		</StatBarChart>

		<!-- KILL METHODS -->
		<StatBarChart
			data={[
				{ label: 'Melee', amount: stats.melee_kills, color: '#e33030' },
				{
					label: 'Ranged',
					amount: stats.ranged_kills,
					color: '#ed5555'
				},
				{
					label: 'Explosive',
					amount: stats.explosive_kills,
					color: '#f58080'
				},
				{
					label: 'Other',
					amount: stats.kills - (stats.melee_kills + stats.ranged_kills + stats.explosive_kills),
					color: '#fdabab'
				}
			]}
			total={stats.kills}
			tooltipLabel="Kills"
		>
			{#snippet title()}
				<p class="text-lg font-semibold">Kill Methods</p>
			{/snippet}
			{#snippet subtitle()}
				<p class="text-sm">
					Total Kills: <span class="font-semibold tabular-nums">{stats.kills.toLocaleString()}</span
					>
				</p>
			{/snippet}
		</StatBarChart>

		<!-- WIN/LOSS RATIO-->
		<StatRatioChart
			firstStat={stats.wins}
			secondStat={stats.losses}
			colour="#e33030"
			usePercentageOption
		>
			{#snippet title(useRatio)}
				<p class="text-lg font-semibold">{useRatio ? 'Win/Loss Ratio' : 'Win Rate Percentage'}</p>
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

		<!-- ROUND WIN/LOSS RATIO -->
		<StatRatioChart
			firstStat={stats.rounds_won}
			secondStat={stats.rounds_played - stats.rounds_won}
			colour="#e33030"
			usePercentageOption
		>
			{#snippet title(useRatio)}
				<p class="text-lg font-semibold">
					{useRatio ? 'Round Win/Loss Ratio' : 'Round Win Rate Percentage'}
				</p>
			{/snippet}
			{#snippet subtitle()}
				<p class="text-sm">
					Rounds Won: <span class="font-semibold tabular-nums"
						>{stats.rounds_won.toLocaleString()}</span
					>
					/ Rounds Lost:
					<span class="font-semibold tabular-nums"
						>{(stats.rounds_played - stats.rounds_won).toLocaleString()}</span
					>
				</p>
			{/snippet}
			{#snippet legend(useRatio, value)}
				{#if useRatio}
					<p class="text-center text-base">
						You've won <span class="font-semibold tabular-nums">{value} rounds</span> for every loss
					</p>
				{:else}
					<p class="text-center text-base">
						You've won <span class="font-semibold tabular-nums">{value}</span> of the rounds you've played
					</p>
				{/if}
			{/snippet}
		</StatRatioChart>

		<!-- KILL/DEATH RATIO-->
		<StatRatioChart
			firstStat={stats.kills}
			secondStat={stats.deaths}
			colour="#e33030"
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
					<span class="font-semibold tabular-nums">{stats.deaths.toLocaleString()}</span>
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
					{@render miscStat('Blocks Placed', stats.blocks_broken)}
					{@render miscStat('Blocks Broken', stats.blocks_broken)}
				</div>
				<div>
					{@render miscStat('Total Score', stats.total_score)}
				</div>
				<div>
					{@render miscStat('Aces', stats.aces)}
				</div>
			</div>
		</div>
	</div>
</div>
