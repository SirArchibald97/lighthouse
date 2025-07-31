<script lang="ts">
	import { badges  } from "$lib/badges";
	import type { Player, TgttosStatistics } from "$lib/types";
	import { calculatePercentage, roundNumber } from "$lib/utils";
	import Badges from "./Badges.svelte";
	import TieredBadges from "./TieredBadges.svelte";

    let { stats }: { stats: TgttosStatistics } = $props();
</script>

<div class="flex flex-col border-t border-neutral-800 px-4 divide-y divide-neutral-800 text-base lg:text-lg">
    <div class="flex flex-col md:flex-row gap-y-4 gap-x-20 py-4">
        <div class="flex flex-col gap-x-8 gap-y-4 justify-between">
            <div>
                <p>Games Won: <span class="tabular-nums font-semibold">{stats.first_place.toLocaleString()}</span></p>
                <p>Games Lost: <span class="tabular-nums font-semibold">{(stats.games_played - stats.first_place).toLocaleString()}</span></p>
                <p>WLR: 
                    <span class="tabular-nums font-semibold">{roundNumber(stats.first_place / (stats.games_played - stats.first_place))}</span>
                    <span class="tabular-nums text-neutral-500">({calculatePercentage(stats.first_place, stats.games_played)}%)</span>
                </p>
            </div>
            <div>
                <p>Game 1st Places: 
                    <span class="tabular-nums font-semibold">{stats.first_place.toLocaleString()}</span>
                    <span class="tabular-nums text-neutral-500">({calculatePercentage(stats.first_place, stats.games_played)}%)</span>
                </p>
                <p>Game Top 3: 
                    <span class="tabular-nums font-semibold">{(stats.top_three - stats.first_place).toLocaleString()}</span>
                    <span class="tabular-nums text-neutral-500">({calculatePercentage(stats.top_three - stats.first_place, stats.games_played)}%)</span>
                </p>
                <p>Game Top 5: 
                    <span class="tabular-nums font-semibold">{(stats.top_five - stats.top_three).toLocaleString()}</span>
                    <span class="tabular-nums text-neutral-500">({calculatePercentage(stats.top_five - stats.top_three, stats.games_played)}%)</span>
                </p>
                <p>Game Top 8: 
                    <span class="tabular-nums font-semibold">{(stats.top_eight - stats.top_five).toLocaleString()}</span>
                    <span class="tabular-nums text-neutral-500">({calculatePercentage(stats.top_eight - stats.top_five, stats.games_played)}%)</span>
                </p>
            </div>
        </div>
        <div class="flex flex-col gap-y-4 justify-between">
            <div>
                <p>Kills: <span class="tabular-nums font-semibold">{stats.kills.toLocaleString()}</span></p>
                <p>Deaths: <span class="tabular-nums font-semibold">{stats.deaths.toLocaleString()}</span></p>
                <p>KDR: <span class="tabular-nums font-semibold">{stats.kdr.toLocaleString()}</span></p>
            </div>
            <div>
                <p>Round 1st Places: 
                    <span class="tabular-nums font-semibold">{stats.round_first_place.toLocaleString()}</span>
                    <span class="tabular-nums text-neutral-500">({calculatePercentage(stats.round_first_place, stats.games_played * 3)}%)</span>
                </p>
                <p>Round Top 3: 
                    <span class="tabular-nums font-semibold">{(stats.round_top_three - stats.round_first_place).toLocaleString()}</span>
                    <span class="tabular-nums text-neutral-500">({calculatePercentage(stats.round_top_three - stats.round_first_place, stats.games_played * 3)}%)</span>
                </p>
                <p>Round Top 5: 
                    <span class="tabular-nums font-semibold">{(stats.round_top_five - stats.round_top_three).toLocaleString()}</span>
                    <span class="tabular-nums text-neutral-500">({calculatePercentage(stats.round_top_five - stats.round_top_three, stats.games_played * 3)}%)</span>
                </p>
                <p>Round Top 8: 
                    <span class="tabular-nums font-semibold">{(stats.round_top_eight - stats.round_top_five).toLocaleString()}</span>
                    <span class="tabular-nums text-neutral-500">({calculatePercentage(stats.round_top_eight - stats.round_top_five, stats.games_played * 3)}%)</span>
                </p>
            </div>
        </div> 
        <div class="flex flex-col gap-y-4 justify-between">
            <div>
                <p>Games Played: <span class="tabular-nums font-semibold">{stats.games_played.toLocaleString()}</span></p>
                <p>Chickens Punched: <span class="tabular-nums font-semibold">{stats.chickens_punched.toLocaleString()}</span></p>
                <p>Blocks Placed: <span class="tabular-nums font-semibold">{stats.blocks_placed.toLocaleString()}</span></p>
                <p>Blocks Broken: <span class="tabular-nums font-semibold">{stats.blocks_broken.toLocaleString()}</span></p>
            </div>
        </div>
    </div>


    <!-- BADGES -->
    <div class="py-4 grid grid-cols-1 md:grid-cols-2 gap-4 *:rounded-lg text-md">
        <Badges stats={stats} badges={badges.tgttos} />
    </div>

    <!-- TIERED BADGES -->
    <div class="py-4 grid grid-cols-1 md:grid-cols-2 gap-4 *:rounded-lg text-md">
        <TieredBadges stats={stats} badges={badges.tgttos_tiered} />
    </div>  
</div>