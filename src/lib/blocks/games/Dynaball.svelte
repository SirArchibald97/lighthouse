<script lang="ts">
	import { badges } from '$lib/badges';
	import type { DynaballStatistics } from '$lib/types';
	import { calculatePercentage } from '$lib/lighthouseUtils';
	import Badges from './Badges.svelte';
	import TieredBadges from './TieredBadges.svelte';

	let { stats }: { stats: DynaballStatistics } = $props();
</script>

<div class="flex flex-col divide-y divide-neutral-800 border-t border-neutral-800 px-4 text-base lg:text-lg">
	<div class="flex flex-col gap-x-20 gap-y-4 py-4 md:flex-row">
		<div class="flex flex-col justify-between gap-x-8 gap-y-4">
			<div>
				<p>Games Played: <span class="font-semibold tabular-nums">{stats.games_played.toLocaleString()}</span></p>
				<p>Games Won: <span class="font-semibold tabular-nums">{stats.wins.toLocaleString()}</span></p>
				<p>Games Lost: <span class="font-semibold tabular-nums">{stats.losses.toLocaleString()}</span></p>
				<p>
					WLR:
					<span class="font-semibold tabular-nums">{stats.wlr.toLocaleString()}</span>
					<span class="text-neutral-500 tabular-nums">({calculatePercentage(stats.wins, stats.games_played)}%)</span>
				</p>
			</div>
		</div>
		<div class="flex flex-col justify-between gap-y-4">
			<div>
				<p>Kills: <span class="font-semibold tabular-nums">{stats.kills.toLocaleString()}</span></p>
				<p>Deaths: <span class="font-semibold tabular-nums">{(stats.games_played - stats.wins).toLocaleString()}</span></p>
				<p>KDR: <span class="font-semibold tabular-nums">{stats.kdr.toLocaleString()}</span></p>
				<p>Players Stuck: <span class="font-semibold tabular-nums">{stats.players_stuck.toLocaleString()}</span></p>
			</div>
		</div>
		<div class="flex flex-col justify-between gap-y-4">
			<div>
				<p>
					Survived 1 Minute:
					<span class="font-semibold tabular-nums">{(stats.survive_1m - stats.survive_2m).toLocaleString()}</span>
					<span class="text-neutral-500">({calculatePercentage(stats.survive_1m - stats.survive_2m, stats.games_played)}%)</span>
				</p>
				<p>
					Survived 2 Minutes:
					<span class="font-semibold tabular-nums">{(stats.survive_2m - stats.survive_3m).toLocaleString()}</span>
					<span class="text-neutral-500">({calculatePercentage(stats.survive_2m - stats.survive_3m, stats.games_played)}%)</span>
				</p>
				<p>
					Survived 3 Minutes:
					<span class="font-semibold tabular-nums">{(stats.survive_3m - stats.survive_4m).toLocaleString()}</span>
					<span class="text-neutral-500">({calculatePercentage(stats.survive_3m - stats.survive_4m, stats.games_played)}%)</span>
				</p>
				<p>
					Survived 4 Minutes:
					<span class="font-semibold tabular-nums">{stats.survive_4m.toLocaleString()}</span>
					<span class="text-neutral-500">({calculatePercentage(stats.survive_4m, stats.games_played)}%)</span>
				</p>
			</div>
		</div>
		<div class="flex flex-col justify-between gap-y-4">
			<div>
				<p>Spawners Broken: <span class="font-semibold tabular-nums">{stats.spawners_destroyed.toLocaleString()}</span></p>
				<p>Blocks Destroyed: <span class="font-semibold tabular-nums">{stats.blocks_destroyed.toLocaleString()}</span></p>
				<p>Blocks Placed: <span class="font-semibold tabular-nums">{stats.blocks_placed.toLocaleString()}</span></p>
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
