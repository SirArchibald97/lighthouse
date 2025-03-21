<script lang="ts">
	import { badges  } from "$lib/badges";
	import type { BattleBoxStatistics, Player } from "$lib/types";
	import { calculatePercentage, roundNumber } from "$lib/utils";
	import Badges from "./Badges.svelte";
	import TieredBadges from "./TieredBadges.svelte";

    let { stats }: { stats: BattleBoxStatistics } = $props();
</script>

<div class="flex flex-col border-t border-neutral-800 px-4 divide-y divide-neutral-800 text-lg">
    <div class="flex flex-row gap-x-20 py-4">
        <div class="flex flex-col gap-y-4 justify-between">
            <div>
                <p>Rounds Won: <span class="tabular-nums font-semibold">{stats.rounds_won.toLocaleString()}</span></p>
                <p>Rounds Lost: <span class="tabular-nums font-semibold">{(stats.games_played! * 3 - stats.rounds_won!)}</span></p>
                <p>Round WLR: 
                    <span class="tabular-nums font-semibold">{roundNumber(stats.rounds_won! / (stats.games_played! * 3 - stats.rounds_won!)).toLocaleString()}</span>
                    <span class="tabular-nums text-neutral-500">({calculatePercentage(stats.rounds_won!, stats.games_played! * 3)}%)</span>
                </p>
            </div>

            <div>
                <p>Games Won: <span class="tabular-nums font-semibold">{stats.team_first_place.toLocaleString()}</span></p>
                <p>Games Lost: <span class="tabular-nums font-semibold">{(stats.games_played! - stats.team_first_place!).toLocaleString()}</span></p>
                <p>Game WLR: 
                    <span class="tabular-nums font-semibold">{roundNumber(stats.team_first_place! / (stats.games_played! - stats.team_first_place!)).toLocaleString()}</span>
                    <span class="tabular-nums text-neutral-500">({calculatePercentage(stats.team_first_place!, stats.games_played!)}%)</span>
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
                    <span class="tabular-nums text-neutral-500">({calculatePercentage(stats.melee_kills!, stats.kills!).toLocaleString()}%)</span>
                </p>
                <p>Ranged Kills: 
                    <span class="tabular-nums font-semibold">{stats.ranged_kills.toLocaleString()}</span>
                    <span class="tabular-nums text-neutral-500">({calculatePercentage(stats.ranged_kills!, stats.kills!).toLocaleString()}%)</span>
                </p>
                <p>Explosive Kills: 
                    <span class="tabular-nums font-semibold">{stats.explosive_kills.toLocaleString()}</span>
                    <span class="tabular-nums text-neutral-500">({calculatePercentage(stats.explosive_kills!, stats.kills!).toLocaleString()}%)</span>
                </p>
            </div>
        </div>

        <div class="flex flex-col gap-y-4 justify-between">
            <div>
                <p>Games Played: <span class="tabular-nums font-semibold">{stats.games_played.toLocaleString()}</span></p>
                <p>Individual 1st Places: 
                    <span class="tabular-nums font-semibold">{stats.solo_first_place.toLocaleString()}</span>
                    <span class="tabular-nums text-neutral-500">({calculatePercentage(stats.solo_first_place!, stats.games_played!)}%)</span>
                </p>
                <p>Individual Top 3: 
                    <span class="tabular-nums font-semibold">{(stats.solo_top_three! - stats.solo_first_place!).toLocaleString()}</span>
                    <span class="tabular-nums text-neutral-500">({calculatePercentage((stats.solo_top_three! - stats.solo_first_place!), stats.games_played!)}%)</span>
                </p>
                <p>Individual Top 5: 
                    <span class="tabular-nums font-semibold">{(stats.solo_top_five! - stats.solo_top_three!).toLocaleString()}</span>
                    <span class="tabular-nums text-neutral-500">({calculatePercentage((stats.solo_top_five! - stats.solo_top_three!), stats.games_played!)}%)</span>
                </p>
            </div>

            <div>
                <p>Concrete Placed: <span class="tabular-nums font-semibold">{stats.blocks_placed.toLocaleString()}</span></p>
                <p>Concrete Broken: <span class="tabular-nums font-semibold">{stats.blocks_broken.toLocaleString()}</span></p>
            </div>
        </div>

        <div class="flex flex-col gap-y-4 justify-between">
            <div>
                <p>Team 1st Places: 
                    <span class="tabular-nums font-semibold">{stats.team_first_place.toLocaleString()}</span>
                    <span class="tabular-nums text-neutral-500">({calculatePercentage(stats.team_first_place!, stats.games_played!)}%)</span>
                </p>
                <p>Team 2nd Places: 
                    <span class="tabular-nums font-semibold">{(stats.team_second_place! - stats.team_first_place!).toLocaleString()}</span>
                    <span class="tabular-nums text-neutral-500">({calculatePercentage((stats.team_second_place! - stats.team_first_place!)!, stats.games_played!)}%)</span>
                </p>
                <p>Team 3rd Places: 
                    <span class="tabular-nums font-semibold">{(stats.team_third_place! - stats.team_second_place!).toLocaleString()}</span>
                    <span class="tabular-nums text-neutral-500">({calculatePercentage((stats.team_third_place! - stats.team_second_place!), stats.games_played!)}%)</span>
                </p>
                <p>Team 4th Places: 
                    <span class="tabular-nums font-semibold">{(stats.team_fourth_place! - stats.team_third_place!).toLocaleString()}</span>
                    <span class="tabular-nums text-neutral-500">({calculatePercentage((stats.team_fourth_place! - stats.team_third_place!), stats.games_played!)}%)</span>
                </p>
            </div>
            <div>
                <p>Total Score: <span class="tabular-nums font-semibold">{stats.total_score.toLocaleString()}</span></p>
            </div>
        </div>
    </div>


    <!-- BADGES -->
    <div class="py-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 *:rounded-lg text-md">
        <Badges stats={stats!} badges={badges.battle_box} />
    </div>

    <!-- TIERED BADGES -->
    <div class="py-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 *:rounded-lg text-md">
        <TieredBadges stats={stats!} badges={badges.battle_box_tiered} />
    </div>  
</div>