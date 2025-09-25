<script lang="ts">
	import { badges } from '$lib/badges';
	import type { Player, TgttosStatistics } from '$lib/types';
	import { calculatePercentage, roundNumber } from '$lib/lighthouseUtils';
	import Badges from './Badges.svelte';
	import TieredBadges from './TieredBadges.svelte';

	let { stats }: { stats: TgttosStatistics } = $props();
</script>

<div class="flex flex-col divide-y divide-neutral-800 border-t border-neutral-800 px-4 text-base lg:text-lg">
	<div class="flex flex-col gap-x-20 gap-y-4 py-4 md:flex-row">
		<div class="flex flex-col justify-between gap-x-8 gap-y-4">
			<div>
				<p>Games Won: <span class="font-semibold tabular-nums">{stats.first_place.toLocaleString()}</span></p>
				<p>Games Lost: <span class="font-semibold tabular-nums">{(stats.games_played - stats.first_place).toLocaleString()}</span></p>
				<p>
					WLR:
					<span class="font-semibold tabular-nums">{roundNumber(stats.first_place / (stats.games_played - stats.first_place))}</span>
					<span class="text-neutral-500 tabular-nums">({calculatePercentage(stats.first_place, stats.games_played)}%)</span>
				</p>
			</div>
			<div>
				<p>
					Game 1st Places:
					<span class="font-semibold tabular-nums">{stats.first_place.toLocaleString()}</span>
					<span class="text-neutral-500 tabular-nums">({calculatePercentage(stats.first_place, stats.games_played)}%)</span>
				</p>
				<p>
					Game Top 3:
					<span class="font-semibold tabular-nums">{(stats.top_three - stats.first_place).toLocaleString()}</span>
					<span class="text-neutral-500 tabular-nums">({calculatePercentage(stats.top_three - stats.first_place, stats.games_played)}%)</span>
				</p>
				<p>
					Game Top 5:
					<span class="font-semibold tabular-nums">{(stats.top_five - stats.top_three).toLocaleString()}</span>
					<span class="text-neutral-500 tabular-nums">({calculatePercentage(stats.top_five - stats.top_three, stats.games_played)}%)</span>
				</p>
				<p>
					Game Top 8:
					<span class="font-semibold tabular-nums">{(stats.top_eight - stats.top_five).toLocaleString()}</span>
					<span class="text-neutral-500 tabular-nums">({calculatePercentage(stats.top_eight - stats.top_five, stats.games_played)}%)</span>
				</p>
			</div>
		</div>
		<div class="flex flex-col justify-between gap-y-4">
			<div>
				<p>Kills: <span class="font-semibold tabular-nums">{stats.kills.toLocaleString()}</span></p>
				<p>Deaths: <span class="font-semibold tabular-nums">{stats.deaths.toLocaleString()}</span></p>
				<p>KDR: <span class="font-semibold tabular-nums">{stats.kdr.toLocaleString()}</span></p>
			</div>
			<div>
				<p>
					Round 1st Places:
					<span class="font-semibold tabular-nums">{stats.round_first_place.toLocaleString()}</span>
					<span class="text-neutral-500 tabular-nums">({calculatePercentage(stats.round_first_place, stats.games_played * 3)}%)</span>
				</p>
				<p>
					Round Top 3:
					<span class="font-semibold tabular-nums">{(stats.round_top_three - stats.round_first_place).toLocaleString()}</span>
					<span class="text-neutral-500 tabular-nums">({calculatePercentage(stats.round_top_three - stats.round_first_place, stats.games_played * 3)}%)</span>
				</p>
				<p>
					Round Top 5:
					<span class="font-semibold tabular-nums">{(stats.round_top_five - stats.round_top_three).toLocaleString()}</span>
					<span class="text-neutral-500 tabular-nums">({calculatePercentage(stats.round_top_five - stats.round_top_three, stats.games_played * 3)}%)</span>
				</p>
				<p>
					Round Top 8:
					<span class="font-semibold tabular-nums">{(stats.round_top_eight - stats.round_top_five).toLocaleString()}</span>
					<span class="text-neutral-500 tabular-nums">({calculatePercentage(stats.round_top_eight - stats.round_top_five, stats.games_played * 3)}%)</span>
				</p>
			</div>
		</div>
		<div class="flex flex-col justify-between gap-y-4">
			<div>
				<p>Games Played: <span class="font-semibold tabular-nums">{stats.games_played.toLocaleString()}</span></p>
				<p>Chickens Punched: <span class="font-semibold tabular-nums">{stats.chickens_punched.toLocaleString()}</span></p>
				<p>Blocks Placed: <span class="font-semibold tabular-nums">{stats.blocks_placed.toLocaleString()}</span></p>
				<p>Blocks Broken: <span class="font-semibold tabular-nums">{stats.blocks_broken.toLocaleString()}</span></p>
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
