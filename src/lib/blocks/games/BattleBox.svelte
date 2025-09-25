<script lang="ts">
	import { badges } from '$lib/badges';
	import type { BattleBoxStatistics } from '$lib/types';
	import { calculatePercentage, roundNumber } from '$lib/lighthouseUtils';
	import Badges from './Badges.svelte';
	import TieredBadges from './TieredBadges.svelte';

	let { stats }: { stats: BattleBoxStatistics } = $props();
	console.log(stats);
</script>

<div class="flex flex-col divide-y divide-neutral-800 border-t border-neutral-800 px-4 text-base lg:text-lg">
	<div class="flex flex-col gap-x-20 gap-y-4 py-4 md:flex-row">
		<div class="flex flex-col justify-between gap-x-8 gap-y-4">
			<div>
				<p>Rounds Won: <span class="font-semibold tabular-nums">{stats.rounds_won.toLocaleString()}</span></p>
				<p>Rounds Lost: <span class="font-semibold tabular-nums">{(stats.games_played! * 3 - stats.rounds_won!).toLocaleString()}</span></p>
				<p>
					Round WLR:
					<span class="font-semibold tabular-nums">{roundNumber(stats.rounds_won! / (stats.games_played! * 3 - stats.rounds_won!)).toLocaleString()}</span>
					<span class="text-neutral-500 tabular-nums">({calculatePercentage(stats.rounds_won!, stats.games_played! * 3)}%)</span>
				</p>
			</div>

			<div>
				<p>Games Won: <span class="font-semibold tabular-nums">{stats.team_first_place.toLocaleString()}</span></p>
				<p>Games Lost: <span class="font-semibold tabular-nums">{(stats.games_played! - stats.team_first_place!).toLocaleString()}</span></p>
				<p>
					Game WLR:
					<span class="font-semibold tabular-nums"
						>{roundNumber(stats.team_first_place! / (stats.games_played! - stats.team_first_place!)).toLocaleString()}</span>
					<span class="text-neutral-500 tabular-nums">({calculatePercentage(stats.team_first_place!, stats.games_played!)}%)</span>
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
					<span class="text-neutral-500 tabular-nums">({calculatePercentage(stats.melee_kills!, stats.kills!).toLocaleString()}%)</span>
				</p>
				<p>
					Ranged Kills:
					<span class="font-semibold tabular-nums">{stats.ranged_kills.toLocaleString()}</span>
					<span class="text-neutral-500 tabular-nums">({calculatePercentage(stats.ranged_kills!, stats.kills!).toLocaleString()}%)</span>
				</p>
				<p>
					Explosive Kills:
					<span class="font-semibold tabular-nums">{stats.explosive_kills.toLocaleString()}</span>
					<span class="text-neutral-500 tabular-nums">({calculatePercentage(stats.explosive_kills!, stats.kills!).toLocaleString()}%)</span>
				</p>
			</div>
		</div>

		<div class="flex flex-col justify-between gap-y-4">
			<div>
				<p>Games Played: <span class="font-semibold tabular-nums">{stats.games_played.toLocaleString()}</span></p>
				<p>
					Individual 1st Places:
					<span class="font-semibold tabular-nums">{stats.solo_first_place.toLocaleString()}</span>
					<span class="text-neutral-500 tabular-nums">({calculatePercentage(stats.solo_first_place!, stats.games_played!)}%)</span>
				</p>
				<p>
					Individual Top 3:
					<span class="font-semibold tabular-nums">{(stats.solo_top_three! - stats.solo_first_place!).toLocaleString()}</span>
					<span class="text-neutral-500 tabular-nums">({calculatePercentage(stats.solo_top_three! - stats.solo_first_place!, stats.games_played!)}%)</span>
				</p>
				<p>
					Individual Top 5:
					<span class="font-semibold tabular-nums">{(stats.solo_top_five! - stats.solo_top_three!).toLocaleString()}</span>
					<span class="text-neutral-500 tabular-nums">({calculatePercentage(stats.solo_top_five! - stats.solo_top_three!, stats.games_played!)}%)</span>
				</p>
			</div>

			<div>
				<p>Concrete Placed: <span class="font-semibold tabular-nums">{stats.blocks_placed.toLocaleString()}</span></p>
				<p>Concrete Broken: <span class="font-semibold tabular-nums">{stats.blocks_broken.toLocaleString()}</span></p>
			</div>
		</div>

		<div class="flex flex-col justify-between gap-y-4">
			<div>
				<p>
					Team 1st Places:
					<span class="font-semibold tabular-nums">{stats.team_first_place.toLocaleString()}</span>
					<span class="text-neutral-500 tabular-nums">({calculatePercentage(stats.team_first_place!, stats.games_played!)}%)</span>
				</p>
				<p>
					Team 2nd Places:
					<span class="font-semibold tabular-nums">{(stats.team_second_place! - stats.team_first_place!).toLocaleString()}</span>
					<span class="text-neutral-500 tabular-nums"
						>({calculatePercentage((stats.team_second_place! - stats.team_first_place!)!, stats.games_played!)}%)</span>
				</p>
				<p>
					Team 3rd Places:
					<span class="font-semibold tabular-nums">{(stats.team_third_place! - stats.team_second_place!).toLocaleString()}</span>
					<span class="text-neutral-500 tabular-nums">({calculatePercentage(stats.team_third_place! - stats.team_second_place!, stats.games_played!)}%)</span>
				</p>
				<p>
					Team 4th Places:
					<span class="font-semibold tabular-nums">{(stats.team_fourth_place! - stats.team_third_place!).toLocaleString()}</span>
					<span class="text-neutral-500 tabular-nums">({calculatePercentage(stats.team_fourth_place! - stats.team_third_place!, stats.games_played!)}%)</span>
				</p>
			</div>
			<div>
				<p>Aces: <span class="font-semibold tabular-nums">{stats.ace.toLocaleString()}</span></p>
				<p>Total Score: <span class="font-semibold tabular-nums">{stats.total_score.toLocaleString()}</span></p>
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
