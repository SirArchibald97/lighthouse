<script lang="ts">
	import { badges } from '$lib/badges';
	import type { ParkourWarriorSurvivorStatistics } from '$lib/types';
	import { calculatePercentage } from '$lib/lighthouseUtils';
	import TieredBadges from './TieredBadges.svelte';

	let { stats }: { stats: ParkourWarriorSurvivorStatistics } = $props();
</script>

<div class="flex flex-col divide-y divide-neutral-800 border-t border-neutral-800 px-4 text-base lg:text-lg">
	<div class="flex flex-col gap-x-20 gap-y-4 py-4 md:flex-row">
		<div class="flex flex-col justify-between gap-x-8 gap-y-4">
			<div>
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
				<p>Games Played: <span class="font-semibold tabular-nums">{stats.games_played.toLocaleString()}</span></p>
				<p>Players Eliminated: <span class="font-semibold tabular-nums">{stats.kills.toLocaleString()}</span></p>
				<p>Obstacles Completed: <span class="font-semibold tabular-nums">{stats.obstacles.toLocaleString()}</span></p>
			</div>
		</div>
	</div>

	<!-- TIERED BADGES -->
	<div class="text-md grid grid-cols-1 gap-4 py-4 *:rounded-lg md:grid-cols-2">
		<TieredBadges {stats} badges={badges.survivor_tiered} />
	</div>
</div>
