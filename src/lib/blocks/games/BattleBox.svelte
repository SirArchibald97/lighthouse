<script lang="ts">
	import { badges } from '$lib/badges';
	import { miscStat } from '$lib/components/Snippets.svelte';
	import StatBarChart from '$lib/components/StatBarChart.svelte';
	import StatRatioChart from '$lib/components/StatRatioChart.svelte';
	import type { BattleBoxStatistics } from '$lib/types';
	import Badges from './Badges.svelte';
	import TieredBadges from './TieredBadges.svelte';

	let { stats }: { stats: BattleBoxStatistics } = $props();
</script>

<div
	class="flex flex-col divide-y divide-neutral-800 border-t border-neutral-800 px-4 text-base lg:text-lg"
>
	<!-- STATS -->
	<div class="grid grid-cols-1 gap-4 py-4 md:grid-cols-2 xl:grid-cols-3">
		<!-- TEAM PLACEMENTS -->
		<StatBarChart
			data={[
				{ label: '1st Place', amount: stats.team_first_place, color: '#339933' },
				{
					label: '2nd Place',
					amount: stats.team_second_place - stats.team_first_place,
					color: '#40bf40'
				},
				{
					label: '3rd Place',
					amount: stats.team_third_place - stats.team_second_place,
					color: '#79d279'
				},
				{
					label: '4th Place',
					amount: stats.team_fourth_place - stats.team_third_place,
					color: '#b3e6b3'
				}
			]}
			total={stats.games_played}
			tooltipLabel="Placements"
		>
			{#snippet title()}
				<p class="text-lg font-semibold">Team Placements</p>
			{/snippet}
			{#snippet subtitle()}
				<p class="text-sm">
					Total Games: <span class="font-semibold tabular-nums"
						>{stats.games_played.toLocaleString()}</span
					>
				</p>
			{/snippet}
		</StatBarChart>

		<!-- SOLO PLACEMENTS -->
		<StatBarChart
			data={[
				{ label: '1st Place', amount: stats.solo_first_place, color: '#339933' },
				{
					label: 'Top 3',
					amount: stats.solo_top_three - stats.solo_first_place,
					color: '#40bf40'
				},
				{
					label: 'Top 5',
					amount: stats.solo_top_five - stats.solo_top_three,
					color: '#79d279'
				},
				{
					label: 'Other',
					amount: stats.games_played - stats.solo_top_five,
					color: '#b3e6b3'
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
				{ label: 'Melee', amount: stats.melee_kills, color: '#339933' },
				{
					label: 'Ranged',
					amount: stats.ranged_kills,
					color: '#40bf40'
				},
				{
					label: 'Explosive',
					amount: stats.explosive_kills,
					color: '#79d279'
				},
				{
					label: 'Other',
					amount: stats.kills - (stats.melee_kills + stats.ranged_kills + stats.explosive_kills),
					color: '#b3e6b3'
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
			firstStat={stats.team_first_place}
			secondStat={stats.games_played - stats.team_first_place}
			colour="#339933"
			usePercentageOption
		>
			{#snippet title(useRatio)}
				<p class="text-lg font-semibold">{useRatio ? 'Win/Loss Ratio' : 'Win Rate Percentage'}</p>
			{/snippet}
			{#snippet subtitle()}
				<p class="text-sm">
					Total Wins: <span class="font-semibold tabular-nums"
						>{stats.team_first_place.toLocaleString()}</span
					>
					/ Total Losses:
					<span class="font-semibold tabular-nums"
						>{(stats.games_played - stats.team_first_place).toLocaleString()}</span
					>
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
			secondStat={stats.games_played * 3 - stats.rounds_won}
			colour="#339933"
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
						>{(stats.games_played * 3 - stats.rounds_won).toLocaleString()}</span
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
			colour="#339933"
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
					{@render miscStat('Aces', stats.ace)}
				</div>
			</div>
		</div>
	</div>

	<!-- BADGES -->
	<div class="text-md grid grid-cols-1 gap-4 py-4 *:rounded-lg md:grid-cols-2">
		<Badges stats={stats!} badges={badges.battle_box} />
	</div>

	<!-- TIERED BADGES -->
	<div class="text-md grid grid-cols-1 gap-4 py-4 *:rounded-lg md:grid-cols-2">
		<TieredBadges stats={stats!} badges={badges.battle_box_tiered} />
	</div>
</div>
