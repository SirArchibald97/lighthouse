<script lang="ts">
	import { badges  } from "$lib/badges";
	import type { SkyBattleStatistics } from "$lib/types";
	import { calculatePercentage, roundNumber } from "$lib/utils";
	import Badges from "./Badges.svelte";
	import TieredBadges from "./TieredBadges.svelte";

    let { stats }: { stats: SkyBattleStatistics } = $props();
</script>

<div class="flex flex-col border-t border-neutral-800 px-4 divide-y divide-neutral-800 text-base lg:text-lg">
    <div class="flex flex-col md:flex-row gap-y-4 gap-x-20 py-4">
        <div class="flex flex-col gap-x-8 gap-y-4 justify-between">
            <div>
                <p>Games Won: <span class="tabular-nums font-semibold">{stats.team_first_place.toLocaleString()}</span></p>
                <p>Games Lost: <span class="tabular-nums font-semibold">{(stats.games_played - stats.team_first_place)}</span></p>
                <p>WLR: 
                    <span class="tabular-nums font-semibold">{roundNumber(stats.team_first_place / (stats.games_played - stats.team_first_place)).toLocaleString()}</span>
                    <span class="tabular-nums text-neutral-500">({calculatePercentage(stats.team_first_place, stats.games_played)}%)</span>
                </p>
            </div>

            <div>
                <p>Individual 1st Places: 
                    <span class="tabular-nums font-semibold">{stats.solo_first_place.toLocaleString()}</span>
                    <span class="tabular-nums text-neutral-500">({calculatePercentage(stats.solo_top_three - stats.solo_first_place, stats.games_played)}%)</span>
                </p>
                <p>Individual Top 3: 
                    <span class="tabular-nums font-semibold">{(stats.solo_top_three - stats.solo_first_place).toLocaleString()}</span>
                    <span class="tabular-nums text-neutral-500">({calculatePercentage(stats.solo_top_three - stats.solo_first_place, stats.games_played)}%)</span>
                </p>
                <p>Individual Top 5: 
                    <span class="tabular-nums font-semibold">{(stats.solo_top_five - stats.solo_top_three).toLocaleString()}</span>
                    <span class="tabular-nums text-neutral-500">({calculatePercentage(stats.solo_top_five - stats.solo_top_three, stats.games_played)}%)</span>
                </p>
                <p>Individual Top 8: 
                    <span class="tabular-nums font-semibold">{(stats.solo_top_eight - stats.solo_top_five).toLocaleString()}</span>
                    <span class="tabular-nums text-neutral-500">({calculatePercentage(stats.solo_top_eight - stats.solo_top_five, stats.games_played)}%)</span>
                </p>
            </div>
        </div>

        <div class="flex flex-col justify-between">
            <div>
                <p>Kills: <span class="tabular-nums font-semibold">{stats.kills.toLocaleString()}</span></p>
                <p>Deaths: <span class="tabular-nums font-semibold">{stats.deaths.toLocaleString()}</span></p>
                <p>KDR: <span class="tabular-nums font-semibold">{stats.kdr.toLocaleString()}</span></p>
            </div>
            <div>
                <p>Melee Kills: 
                    <span class="tabular-nums font-semibold">{stats.melee_kills.toLocaleString()}</span>
                    <span class="tabular-nums text-neutral-500">({calculatePercentage(stats.melee_kills, stats.kills).toLocaleString()}%)</span>
                </p>
                <p>Ranged Kills: 
                    <span class="tabular-nums font-semibold">{stats.ranged_kills.toLocaleString()}</span>
                    <span class="tabular-nums text-neutral-500">({calculatePercentage(stats.ranged_kills, stats.kills).toLocaleString()}%)</span>
                </p>
                <p>Explosive Kills: 
                    <span class="tabular-nums font-semibold">{stats.explosive_kills.toLocaleString()}</span>
                    <span class="tabular-nums text-neutral-500">
                        ({calculatePercentage(stats.explosive_kills, stats.kills).toLocaleString()}%)
                    </span>
                </p>
                <p>Other Kills: 
                    <span class="tabular-nums font-semibold">{(stats.kills - (stats.melee_kills + stats.ranged_kills + stats.explosive_kills)).toLocaleString()}</span>
                    <span class="tabular-nums text-neutral-500">
                        ({calculatePercentage((stats.kills - (stats.melee_kills + stats.ranged_kills + stats.explosive_kills)), stats.kills).toLocaleString()}%)
                    </span>
                </p>
            </div>
        </div>

        <div class="flex flex-col gap-y-4 justify-between">
            <div>
                <p>Games Played :
                    <span class="tabular-nums font-semibold">{stats.games_played.toLocaleString()}</span>
                </p>
                <p>Team 1st Places: 
                    <span class="tabular-nums font-semibold">{stats.team_first_place.toLocaleString()}</span>
                    <span class="tabular-nums text-neutral-500">
                        ({calculatePercentage(stats.team_first_place, stats.games_played)}%)
                    </span>
                </p>
                <p>Team 2nd Places: 
                    <span class="tabular-nums font-semibold">{(stats.team_second_place - stats.team_first_place).toLocaleString()}</span>
                    <span class="tabular-nums text-neutral-500">
                        ({calculatePercentage(stats.team_second_place - stats.team_first_place, stats.games_played)}%)
                    </span>
                </p>
                <p>Team 3rd Places: 
                    <span class="tabular-nums font-semibold">{(stats.team_third_place - stats.team_second_place).toLocaleString()}</span>
                    <span class="tabular-nums text-neutral-500">
                        ({calculatePercentage(stats.team_third_place - stats.team_second_place, stats.games_played)}%)
                    </span>
                </p>
                <p>Team 4th Places: 
                    <span class="tabular-nums font-semibold">{(stats.team_fourth_place - stats.team_third_place).toLocaleString()}</span>
                    <span class="tabular-nums text-neutral-500">
                        ({calculatePercentage(stats.team_fourth_place - stats.team_third_place, stats.games_played)}%)
                    </span>
                </p>
            </div>
            <div>
                <p>Survived 1 minute: 
                    <span class="tabular-nums font-semibold">{(stats.survived_minute - stats.survived_two_minute).toLocaleString()}</span>
                    <span class="tabular-nums text-neutral-500">({calculatePercentage(stats.survived_minute - stats.survived_two_minute, stats.games_played)}%)</span>
                </p>
                <p>Survived 2 minutes: 
                    <span class="tabular-nums font-semibold">{stats.survived_two_minute.toLocaleString()}</span>
                    <span class="tabular-nums text-neutral-500">({calculatePercentage(stats.survived_two_minute, stats.games_played)}%)</span>
                </p>
            </div>
        </div>

        <div class="flex flex-col gap-y-4 justify-between">
            <div>
                <p>Chests Looted: <span class="tabular-nums font-semibold">{stats.chests_looted.toLocaleString()}</span></p>
                <p>Golden Chests Looted: <span class="tabular-nums font-semibold">{stats.golden_chests_looted.toLocaleString()}</span></p>
            </div>
        </div>
    </div>


    <!-- BADGES -->
    <div class="py-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 *:rounded-lg text-md">
        <Badges stats={stats} badges={badges.sky_battle} />
    </div>

    <!-- TIERED BADGES -->
    <div class="py-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 *:rounded-lg text-md">
        <TieredBadges stats={stats} badges={badges.sky_battle_tiered} />
    </div>  
</div>