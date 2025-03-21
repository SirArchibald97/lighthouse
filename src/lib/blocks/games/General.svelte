<script lang="ts">
	import { badges, calculateMaxTrophies, calculateTotalTrophies } from "$lib/badges";
	import type { Player } from "$lib/types";
	import { calculatePercentage, getCrownColour, getCrownColourHex, roundNumber } from "$lib/utils";

    let { player }: { player: Player } = $props();

    const gamesWon = player.statistics!.battle_box.team_first_place + 
        player.statistics!.sky_battle.quads.team_first_place + 
        player.statistics!.tgttos.first_place + 
        player.statistics!.hitw.first_place + 
        player.statistics!.dynaball.wins + 
        player.statistics!.pkw.survivor.wins +
        player.statistics!.rocket_spleef.first_place;
</script>

<div class="flex flex-col border-t border-neutral-800 px-4 divide-y divide-neutral-800 text-lg">
    <div class="flex flex-row gap-x-20 py-4">
        <div>
            <p>Total XP: <span class="tabular-nums font-semibold">{player.statistics?.total_xp.toLocaleString()}</span></p>
            <p>Game XP: <span class="tabular-nums font-semibold">{player.statistics?.game_xp.toLocaleString()}</span></p>
            <p>Fishing XP: <span class="tabular-nums font-semibold">{player.statistics?.fishing_xp.toLocaleString()}</span></p>
            <p>Other XP: <span class="tabular-nums font-semibold">{(player.statistics?.total_xp! - player.statistics?.game_xp! - player.statistics?.fishing_xp!).toLocaleString()}</span></p>
        </div>
        <div>
            <p>Games Played: <span class="tabular-nums font-semibold">{player.statistics?.games_played.toLocaleString()}</span></p>
            <p>Games Won: <span class="tabular-nums font-semibold">{gamesWon.toLocaleString()}</span></p>
            <p>Overall WLR: 
                <span class="tabular-nums font-semibold">{roundNumber(gamesWon / (player.statistics?.games_played! - gamesWon)).toLocaleString()}</span>
                <span class="text-neutral-500">({calculatePercentage(gamesWon, player.statistics?.games_played!)}%)</span>
            </p>
            <p>Community Contributions: <span class="tabular-nums font-semibold">{player.statistics?.community_contribution.toLocaleString()}</span></p>
        </div>
    </div>

    <div class="py-4">
        <p class="text-xl font-semibold mb-2">Skill Trophy Progress</p>
        <div class="grid grid-cols-4 gap-2">
            {#each [
                { label: "Battle Box", icon: "battle_box", stats: player.statistics?.battle_box!, badges: badges.battle_box, tieredBadges: badges.battle_box_tiered },
                { label: "Sky Battle", icon: "sky_battle", stats: player.statistics?.sky_battle.quads!, badges: badges.sky_battle, tieredBadges: badges.sky_battle_tiered },
                { label: "To Get To The Other Side", icon: "tgttos", stats: player.statistics?.tgttos, badges: badges.tgttos!, tieredBadges: badges.tgttos_tiered },
                { label: "Hole in the Wall", icon: "hitw", stats: player.statistics?.hitw, badges: badges.hitw!, tieredBadges: badges.hitw_tiered },
                { label: "Dynaball", icon: "dynaball", stats: player.statistics?.dynaball!, badges: badges.dynaball, tieredBadges: badges.dynaball_tiered },
                { label: "Parkour Warrior Dojo", icon: "parkour_warrior/solo", stats: player.statistics?.pkw.dojo!, badges: [], tieredBadges: badges.dojo_tiered },
                { label: "Parkour Warrior Survivor", icon: "parkour_warrior", stats: player.statistics?.pkw.survivor!, badges: [], tieredBadges: badges.survivor_tiered },
                { label: "Rocket Spleef", icon: "rocket_spleef", stats: player.statistics?.rocket_spleef!, badges: badges.rocket_spleef, tieredBadges: badges.rocket_spleef_tiered },
            ] as game}
                <div class="flex gap-x-4 border border-neutral-800 rounded-md p-2">
                    <span 
                        class={`flex justify-center items-center size-18 bg-neutral-100 rounded-full ${getCrownColour(player.crownLevel.levelData.level)}`}  
                        style={`background: conic-gradient(${getCrownColourHex(player.crownLevel.levelData.level)} ${Math.floor((calculateTotalTrophies(game.stats!, game.badges, game.tieredBadges) / calculateMaxTrophies(game.badges, game.tieredBadges)) * 360)}deg, oklch(0.269 0 0) 0deg)`}
                    >
                        <span class="flex justify-center items-center size-14 bg-neutral-900 rounded-full">
                            <img src={`https://cdn.islandstats.xyz/games/${game.icon}/icon.png`} alt={``} class="size-8" />
                        </span>
                    </span>
                    <div class="self-center">
                        <p class="text-lg font-semibold">{game.label}</p>
                        <div class="flex gap-x-2 tabular-nums">
                            <img src="https://cdn.islandstats.xyz/icons/trophies/red.png" alt="Skill Trophy Icon" class="size-6" />
                            <p>
                                <span>{calculateTotalTrophies(game.stats!, game.badges, game.tieredBadges).toLocaleString()}</span>
                                <span> / </span>
                                <span>{calculateMaxTrophies(game.badges, game.tieredBadges).toLocaleString()}</span>
                                <span class="text-neutral-500">({Math.round((calculateTotalTrophies(game.stats!, game.badges, game.tieredBadges) / calculateMaxTrophies(game.badges, game.tieredBadges)) * 100)}%)</span>
                            </p>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>