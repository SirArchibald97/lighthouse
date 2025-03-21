<script lang="ts">
	import { badges  } from "$lib/badges";
	import type { ParkourWarriorSurvivorStatistics } from "$lib/types";
	import TieredBadges from "./TieredBadges.svelte";

    let { stats }: { stats: ParkourWarriorSurvivorStatistics } = $props();
</script>

<div class="flex flex-col border-t border-neutral-800 px-4 divide-y divide-neutral-800 text-lg">
    <div class="flex flex-row gap-x-20 py-4">
        <div class="flex flex-col gap-y-4 justify-between">
            <div>
                <p>Games Won: <span class="tabular-nums font-semibold">{stats.wins.toLocaleString()}</span></p>
                <p>Games Lost: <span class="tabular-nums font-semibold">{stats.losses.toLocaleString()}</span></p>
                <p>WLR: <span class="tabular-nums font-semibold">{stats.wlr.toLocaleString()}</span></p>
            </div>
        </div>
        <div class="flex flex-col gap-y-4 justify-between">
            <div>
                <p>Games Played: <span class="tabular-nums font-semibold">{stats.games_played.toLocaleString()}</span></p>
                <p>Players Eliminated: <span class="tabular-nums font-semibold">{stats.kills.toLocaleString()}</span></p>
                <p>Obstacles Completed: <span class="tabular-nums font-semibold">{stats.obstacles.toLocaleString()}</span></p>
            </div>
        </div>
    </div>

    <!-- TIERED BADGES -->
    <div class="py-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 *:rounded-lg text-md">
        <TieredBadges stats={stats} badges={badges.survivor_tiered} />
    </div>  
</div>