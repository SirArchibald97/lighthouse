<script lang="ts">
	import { badges  } from "$lib/badges";
	import type { HitwStatistics } from "$lib/types";
	import { calculatePercentage, roundNumber } from "$lib/utils";
	import Badges from "./Badges.svelte";
	import TieredBadges from "./TieredBadges.svelte";

    let { stats }: { stats: HitwStatistics } = $props();
</script>

<div class="flex flex-col border-t border-neutral-800 px-4 divide-y divide-neutral-800 text-base lg:text-lg">
    <div class="flex flex-col lg:flex-row gap-y-4 gap-x-20 py-4">
        <div class="flex flex-col gap-x-8 gap-y-4 justify-between">
            <div>
                <p>Games Won: <span class="tabular-nums font-semibold">{stats.first_place.toLocaleString()}</span></p>
                <p>Games Lost: <span class="tabular-nums font-semibold">{(stats.games_played - stats.first_place).toLocaleString()}</span></p>
                <p>WLR: <span class="tabular-nums font-semibold">{stats.wlr.toLocaleString()}</span></p>
            </div>
        </div>
        <div class="flex flex-col gap-y-4 justify-between">
            <div>
                <p>Games Played: <span class="tabular-nums font-semibold">{stats.games_played.toLocaleString()}</span></p>
                <p>1st Places: 
                    <span class="tabular-nums font-semibold">{stats.first_place.toLocaleString()}</span>
                    <span class="tabular-nums text-neutral-500">({calculatePercentage(stats.first_place, stats.games_played)}%)</span>
                </p>
                <p>Top 3: 
                    <span class="tabular-nums font-semibold">{(stats.top_three - stats.first_place).toLocaleString()}</span>
                    <span class="tabular-nums text-neutral-500">({calculatePercentage((stats.top_three - stats.first_place), stats.games_played)}%)</span>
                </p>
                <p>Top 5: 
                    <span class="tabular-nums font-semibold">{(stats.top_five - stats.top_three).toLocaleString()}</span>
                    <span class="tabular-nums text-neutral-500">({calculatePercentage((stats.top_five - stats.top_three), stats.games_played)}%)</span>
                </p>
            </div>
        </div>
        <div class="flex flex-col gap-y-4 justify-between">
            <div>
                <p>Players Outlived: <span class="tabular-nums font-semibold">{stats.players_outlived.toLocaleString()}</span></p>
                <p>Walls Dodged: <span class="tabular-nums font-semibold">{stats.walls_dodged.toLocaleString()}</span></p>
                <p>Survived 1 minute: 
                    <span class="tabular-nums font-semibold">{(stats.survived_minute - stats.survived_two_minute).toLocaleString()}</span>
                    <span class="tabular-nums text-neutral-500">({calculatePercentage((stats.survived_minute - stats.survived_two_minute), stats.games_played)}%)</span>
                </p>
                <p>Survived 2 minutes: 
                    <span class="tabular-nums font-semibold">{stats.survived_two_minute.toLocaleString()}</span>
                    <span class="tabular-nums text-neutral-500">({calculatePercentage(stats.survived_two_minute, stats.games_played)}%)</span>
                </p>
            </div>
        </div>
    </div>


    <!-- BADGES -->
    <div class="py-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 *:rounded-lg text-md">
        <Badges stats={stats} badges={badges.hitw} />
    </div>

    <!-- TIERED BADGES -->
    <div class="py-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 *:rounded-lg text-md">
        <TieredBadges stats={stats} badges={badges.hitw_tiered} />
    </div>  
</div>