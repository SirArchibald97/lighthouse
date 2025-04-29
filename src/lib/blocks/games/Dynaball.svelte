<script lang="ts">
	import { badges  } from "$lib/badges";
	import type { DynaballStatistics } from "$lib/types";
	import { calculatePercentage } from "$lib/utils";
	import Badges from "./Badges.svelte";
	import TieredBadges from "./TieredBadges.svelte";

    let { stats }: { stats: DynaballStatistics } = $props();
</script>

<div class="flex flex-col border-t border-neutral-800 px-4 divide-y divide-neutral-800 text-base lg:text-lg">
    <div class="flex flex-col md:flex-row gap-y-4 gap-x-20 py-4">
        <div class="flex flex-col gap-x-8 gap-y-4 justify-between">
            <div>
                <p>Games Played: <span class="tabular-nums font-semibold">{stats.games_played.toLocaleString()}</span></p>
                <p>Games Won: <span class="tabular-nums font-semibold">{stats.wins.toLocaleString()}</span></p>
                <p>Games Lost: <span class="tabular-nums font-semibold">{stats.losses.toLocaleString()}</span></p>
                <p>WLR: 
                    <span class="tabular-nums font-semibold">{stats.wlr.toLocaleString()}</span>
                    <span class="tabular-nums text-neutral-500">({calculatePercentage(stats.wins, stats.games_played)}%)</span>
                </p>
            </div>
        </div>
        <div class="flex flex-col gap-y-4 justify-between">
            <div>
                <p>Kills: <span class="tabular-nums font-semibold">{stats.kills.toLocaleString()}</span></p>
                <p>Deaths: <span class="tabular-nums font-semibold">{(stats.games_played - stats.wins).toLocaleString()}</span></p>
                <p>KDR: <span class="tabular-nums font-semibold">{stats.kdr.toLocaleString()}</span></p>
                <p>Players Stuck: <span class="tabular-nums font-semibold">{stats.players_stuck.toLocaleString()}</span></p>
            </div>
        </div>
        <div class="flex flex-col gap-y-4 justify-between">
            <div>
                <p>Survived 1 Minute: 
                    <span class="tabular-nums font-semibold">{(stats.survive_1m - stats.survive_2m).toLocaleString()}</span>
                    <span class="text-neutral-500">({calculatePercentage(stats.survive_1m - stats.survive_2m, stats.games_played)}%)</span></p>
                <p>Survived 2 Minutes: 
                    <span class="tabular-nums font-semibold">{(stats.survive_2m - stats.survive_3m).toLocaleString()}</span>
                    <span class="text-neutral-500">({calculatePercentage(stats.survive_2m - stats.survive_3m, stats.games_played)}%)</span></p>
                <p>Survived 3 Minutes: 
                    <span class="tabular-nums font-semibold">{(stats.survive_3m - stats.survive_4m).toLocaleString()}</span>
                    <span class="text-neutral-500">({calculatePercentage(stats.survive_3m - stats.survive_4m, stats.games_played)}%)</span></p>
                <p>Survived 4 Minutes: 
                    <span class="tabular-nums font-semibold">{stats.survive_4m.toLocaleString()}</span>
                    <span class="text-neutral-500">({calculatePercentage(stats.survive_4m, stats.games_played)}%)</span></p>
            </div>
        </div>
        <div class="flex flex-col gap-y-4 justify-between">
            <div>
                <p>Spawners Broken: <span class="tabular-nums font-semibold">{stats.spawners_destroyed.toLocaleString()}</span></p>
                <p>Blocks Destroyed: <span class="tabular-nums font-semibold">{stats.blocks_destroyed.toLocaleString()}</span></p>
                <p>Blocks Placed: <span class="tabular-nums font-semibold">{stats.blocks_placed.toLocaleString()}</span></p>
            </div>
        </div>
    </div>


    <!-- BADGES -->
    <div class="py-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 *:rounded-lg text-md">
        <Badges stats={stats} badges={badges.dynaball} />
    </div>

    <!-- TIERED BADGES -->
    <div class="py-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 *:rounded-lg text-md">
        <TieredBadges stats={stats} badges={badges.dynaball_tiered} />
    </div>  
</div>