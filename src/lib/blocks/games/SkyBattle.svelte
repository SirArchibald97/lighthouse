<script lang="ts">
	import { badges } from '$lib/badges';
	import type { SkyBattleStatistics } from '$lib/types';
	import { calculatePercentage, roundNumber } from '$lib/lighthouseUtils';
	import Badges from './Badges.svelte';
	import TieredBadges from './TieredBadges.svelte';

	let { stats }: { stats: SkyBattleStatistics } = $props();
</script>

<div class="flex flex-col divide-y divide-neutral-800 border-t border-neutral-800 px-4 text-base lg:text-lg">
	<div class="flex flex-col gap-x-20 gap-y-4 py-4 md:flex-row">
		<div class="flex flex-col justify-between gap-x-8 gap-y-4">
			<div>
				<p>Games Won: <span class="font-semibold tabular-nums">{stats.team_first_place.toLocaleString()}</span></p>
				<p>Games Lost: <span class="font-semibold tabular-nums">{(stats.games_played - stats.team_first_place).toLocaleString()}</span></p>
				<p>
					WLR:
					<span class="font-semibold tabular-nums">{roundNumber(stats.team_first_place / (stats.games_played - stats.team_first_place)).toLocaleString()}</span>
					<span class="text-neutral-500 tabular-nums">({calculatePercentage(stats.team_first_place, stats.games_played)}%)</span>
				</p>
			</div>

			<div>
				<p>
					Individual 1st Places:
					<span class="font-semibold tabular-nums">{stats.solo_first_place.toLocaleString()}</span>
					<span class="text-neutral-500 tabular-nums">({calculatePercentage(stats.solo_top_three - stats.solo_first_place, stats.games_played)}%)</span>
				</p>
				<p>
					Individual Top 3:
					<span class="font-semibold tabular-nums">{(stats.solo_top_three - stats.solo_first_place).toLocaleString()}</span>
					<span class="text-neutral-500 tabular-nums">({calculatePercentage(stats.solo_top_three - stats.solo_first_place, stats.games_played)}%)</span>
				</p>
				<p>
					Individual Top 5:
					<span class="font-semibold tabular-nums">{(stats.solo_top_five - stats.solo_top_three).toLocaleString()}</span>
					<span class="text-neutral-500 tabular-nums">({calculatePercentage(stats.solo_top_five - stats.solo_top_three, stats.games_played)}%)</span>
				</p>
				<p>
					Individual Top 8:
					<span class="font-semibold tabular-nums">{(stats.solo_top_eight - stats.solo_top_five).toLocaleString()}</span>
					<span class="text-neutral-500 tabular-nums">({calculatePercentage(stats.solo_top_eight - stats.solo_top_five, stats.games_played)}%)</span>
				</p>
			</div>
		</div>

		<div class="flex flex-col justify-between">
			<div>
				<p>Kills: <span class="font-semibold tabular-nums">{stats.kills.toLocaleString()}</span></p>
				<p>Deaths: <span class="font-semibold tabular-nums">{stats.deaths.toLocaleString()}</span></p>
				<p>KDR: <span class="font-semibold tabular-nums">{stats.kdr.toLocaleString()}</span></p>
			</div>
			<div>
				<p>
					Melee Kills:
					<span class="font-semibold tabular-nums">{stats.melee_kills.toLocaleString()}</span>
					<span class="text-neutral-500 tabular-nums">({calculatePercentage(stats.melee_kills, stats.kills).toLocaleString()}%)</span>
				</p>
				<p>
					Ranged Kills:
					<span class="font-semibold tabular-nums">{stats.ranged_kills.toLocaleString()}</span>
					<span class="text-neutral-500 tabular-nums">({calculatePercentage(stats.ranged_kills, stats.kills).toLocaleString()}%)</span>
				</p>
				<p>
					Explosive Kills:
					<span class="font-semibold tabular-nums">{stats.explosive_kills.toLocaleString()}</span>
					<span class="text-neutral-500 tabular-nums">
						({calculatePercentage(stats.explosive_kills, stats.kills).toLocaleString()}%)
					</span>
				</p>
				<p>
					Other Kills:
					<span class="font-semibold tabular-nums">{(stats.kills - (stats.melee_kills + stats.ranged_kills + stats.explosive_kills)).toLocaleString()}</span>
					<span class="text-neutral-500 tabular-nums">
						({calculatePercentage(stats.kills - (stats.melee_kills + stats.ranged_kills + stats.explosive_kills), stats.kills).toLocaleString()}%)
					</span>
				</p>
			</div>
		</div>

		<div class="flex flex-col justify-between gap-y-4">
			<div>
				<p>
					Games Played :
					<span class="font-semibold tabular-nums">{stats.games_played.toLocaleString()}</span>
				</p>
				<p>
					Team 1st Places:
					<span class="font-semibold tabular-nums">{stats.team_first_place.toLocaleString()}</span>
					<span class="text-neutral-500 tabular-nums">
						({calculatePercentage(stats.team_first_place, stats.games_played)}%)
					</span>
				</p>
				<p>
					Team 2nd Places:
					<span class="font-semibold tabular-nums">{(stats.team_second_place - stats.team_first_place).toLocaleString()}</span>
					<span class="text-neutral-500 tabular-nums">
						({calculatePercentage(stats.team_second_place - stats.team_first_place, stats.games_played)}%)
					</span>
				</p>
				<p>
					Team 3rd Places:
					<span class="font-semibold tabular-nums">{(stats.team_third_place - stats.team_second_place).toLocaleString()}</span>
					<span class="text-neutral-500 tabular-nums">
						({calculatePercentage(stats.team_third_place - stats.team_second_place, stats.games_played)}%)
					</span>
				</p>
				<p>
					Team 4th Places:
					<span class="font-semibold tabular-nums">{(stats.team_fourth_place - stats.team_third_place).toLocaleString()}</span>
					<span class="text-neutral-500 tabular-nums">
						({calculatePercentage(stats.team_fourth_place - stats.team_third_place, stats.games_played)}%)
					</span>
				</p>
			</div>
			<div>
				<p>
					Survived 1 minute:
					<span class="font-semibold tabular-nums">{(stats.survived_minute - stats.survived_two_minute).toLocaleString()}</span>
					<span class="text-neutral-500 tabular-nums">({calculatePercentage(stats.survived_minute - stats.survived_two_minute, stats.games_played)}%)</span>
				</p>
				<p>
					Survived 2 minutes:
					<span class="font-semibold tabular-nums">{stats.survived_two_minute.toLocaleString()}</span>
					<span class="text-neutral-500 tabular-nums">({calculatePercentage(stats.survived_two_minute, stats.games_played)}%)</span>
				</p>
			</div>
		</div>

		<div class="flex flex-col justify-between gap-y-4">
			<div>
				<p>Chests Looted: <span class="font-semibold tabular-nums">{stats.chests_looted.toLocaleString()}</span></p>
				<p>Golden Chests Looted: <span class="font-semibold tabular-nums">{stats.golden_chests_looted.toLocaleString()}</span></p>
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
