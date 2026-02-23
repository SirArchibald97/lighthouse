<script lang="ts">
	import { badges } from '$lib/badges';
	import StatBarChart from '$lib/components/StatBarChart.svelte';
	import StatRatioChart from '$lib/components/StatRatioChart.svelte';
	import type { SkyBattleStatistics } from '$lib/types';
	import { miscStat } from '$lib/components/Snippets.svelte';
	import Badges from './Badges.svelte';
	import TieredBadges from './TieredBadges.svelte';

	let { stats }: { stats: SkyBattleStatistics } = $props();
</script>

<div
	class="flex flex-col divide-y divide-neutral-800 border-t border-neutral-800 px-4 text-base lg:text-lg"
>
	<!-- STATS -->
	<div class="grid grid-cols-1 gap-4 py-4 md:grid-cols-2 xl:grid-cols-3">
		<!-- TEAM PLACEMENTS -->
		<StatBarChart
			data={[
				{ label: '1st Place', amount: stats.team_first_place, color: '#3366ff' },
				{
					label: '2nd Place',
					amount: stats.team_second_place - stats.team_first_place,
					color: '#4d79ff'
				},
				{
					label: '3rd Place',
					amount: stats.team_third_place - stats.team_second_place,
					color: '#80a0ff'
				},
				{
					label: '4th Place',
					amount: stats.team_fourth_place - stats.team_third_place,
					color: '#b3cfff'
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
				{ label: '1st Place', amount: stats.solo_first_place, color: '#3366ff' },
				{
					label: 'Top 3',
					amount: stats.solo_top_three - stats.solo_first_place,
					color: '#4d79ff'
				},
				{
					label: 'Top 5',
					amount: stats.solo_top_five - stats.solo_top_three,
					color: '#80a0ff'
				},
				{
					label: 'Top 8',
					amount: stats.solo_top_eight - stats.solo_top_five,
					color: '#b3cfff'
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
				{ label: 'Melee', amount: stats.melee_kills, color: '#3366ff' },
				{
					label: 'Ranged',
					amount: stats.ranged_kills,
					color: '#4d79ff'
				},
				{
					label: 'Explosive',
					amount: stats.explosive_kills,
					color: '#80a0ff'
				},
				{
					label: 'Other',
					amount: stats.kills - (stats.melee_kills + stats.ranged_kills + stats.explosive_kills),
					color: '#b3cfff'
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

		<StatRatioChart
			firstStat={stats.team_first_place}
			secondStat={stats.team_losses}
			colour="#3366ff"
			usePercentageOption
		>
			{#snippet title(useRatio)}
				<p class="text-lg font-semibold">Win/Loss Ratio</p>
			{/snippet}
			{#snippet subtitle()}
				<p class="text-sm">
					Total Wins: <span class="font-semibold tabular-nums"
						>{stats.team_first_place.toLocaleString()}</span
					>
					/ Total Losses:
					<span class="font-semibold tabular-nums">{stats.team_losses.toLocaleString()}</span>
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

		<StatRatioChart
			firstStat={stats.kills}
			secondStat={stats.deaths}
			colour="#3366ff"
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
					{@render miscStat(
						'Team Place 5th',
						stats.team_fifth_place - stats.team_fourth_place,
						stats.games_played
					)}
					{@render miscStat(
						'Team Place 6th',
						stats.team_sixth_place - stats.team_fifth_place,
						stats.games_played
					)}
					{@render miscStat(
						'Team Place 7th',
						stats.team_seventh_place - stats.team_sixth_place,
						stats.games_played
					)}
					{@render miscStat(
						'Team Place 8th',
						stats.team_eigth_place - stats.team_seventh_place,
						stats.games_played
					)}
				</div>
				<div>
					{@render miscStat(
						'Survived 1 minute',
						stats.survived_minute - stats.survived_two_minute,
						stats.games_played
					)}
					{@render miscStat('Survived 2 minutes', stats.survived_two_minute, stats.games_played)}
				</div>
				<div>
					{@render miscStat('Chests Looted', stats.chests_looted - stats.golden_chests_looted)}
					{@render miscStat('Mid Chests Looted', stats.golden_chests_looted)}
				</div>
				<div>
					{@render miscStat('Total Score', stats.total_score)}
				</div>
			</div>
		</div>
	</div>

	<!-- BADGES -->
	<div class="text-md grid grid-cols-1 gap-4 py-4 *:rounded-lg md:grid-cols-2">
		<Badges {stats} badges={badges.sky_battle} />
	</div>

	<!-- TIERED BADGES -->
	<div class="text-md grid grid-cols-1 gap-4 py-4 *:rounded-lg md:grid-cols-2">
		<TieredBadges {stats} badges={badges.sky_battle_tiered} />
	</div>
</div>
