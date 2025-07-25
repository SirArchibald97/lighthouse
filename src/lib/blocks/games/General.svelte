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

    const gameTrophies = [
        { game: "Battle Box", colour: "oklch(53.2% 0.157 131.589)", trophies: calculateTotalTrophies(player.statistics?.battle_box!, badges.battle_box, badges.battle_box_tiered), gamesPlayed: player.statistics?.battle_box!.games_played },
        { game: "Sky Battle", colour: "oklch(57.7% 0.245 27.325)", trophies: calculateTotalTrophies(player.statistics?.sky_battle.quads!, badges.sky_battle, badges.sky_battle_tiered), gamesPlayed: player.statistics?.sky_battle.quads!.games_played },
        { game: "TGTTOS", colour: "oklch(94.5% 0.129 101.54)", trophies: calculateTotalTrophies(player.statistics?.tgttos!, badges.tgttos!, badges.tgttos_tiered), gamesPlayed: player.statistics?.tgttos!.games_played },
        { game: "HITW", colour: "oklch(72.3% 0.219 149.579)", trophies: calculateTotalTrophies(player.statistics?.hitw!, badges.hitw!, badges.hitw_tiered), gamesPlayed: player.statistics?.hitw!.games_played },
        { game: "Dynaball", colour: "oklch(75% 0.183 55.934)", trophies: calculateTotalTrophies(player.statistics?.dynaball!, badges.dynaball, badges.dynaball_tiered), gamesPlayed: player.statistics?.dynaball!.games_played },
        { game: "Dojo", colour: "oklch(87.9% 0.169 91.605)", trophies: calculateTotalTrophies(player.statistics?.pkw.dojo!, [], badges.dojo_tiered) },
        { game: "Survivor", colour: "oklch(76.8% 0.233 130.85)", trophies: calculateTotalTrophies(player.statistics?.pkw.survivor!, [], badges.survivor_tiered), gamesPlayed: player.statistics?.pkw.survivor!.games_played },
        { game: "Rocket Spleef", colour: "oklch(60.6% 0.25 292.717)", trophies: calculateTotalTrophies(player.statistics?.rocket_spleef!, badges.rocket_spleef, badges.rocket_spleef_tiered), gamesPlayed: player.statistics?.rocket_spleef!.games_played },
    ];

    let previousEnd = 0;
    const trophyPie = gameTrophies.map((game) => {
        if (game.trophies === 0) return "";
        const start = previousEnd;
        const end = start + Math.round(((game.trophies / player.trophies.skill.total) * 100));
        previousEnd = end;
        return `${game.colour} ${start}% ${end}%`;
    }).filter(g => g !== "").join(", ");

    previousEnd = 0;
    const gamesPie = gameTrophies.map((game) => {
        if (!game.gamesPlayed) return "";
        const start = previousEnd;
        const end = start + Math.round(((game.gamesPlayed! / player.statistics!.games_played) * 100));
        previousEnd = end;
        return `${game.colour} ${start}% ${end}%`;
    }).filter(g => g !== "").join(", ");

    console.log(trophyPie, gamesPie)
</script>

<div class="flex flex-col border-t border-neutral-800 px-4 divide-y divide-neutral-800 text-base md:text-lg">
    <div class="flex flex-col lg:flex-row gap-y-4 gap-x-20 py-4">
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
        <p class="text-xl font-semibold mb-2">Games Breakdown</p>
        <div class="flex flex-col md:flex-row gap-4">
            <!-- skill trophies -->
            <div class="flex flex-col xl:flex-row items-center w-full md:w-1/2 gap-4 bg-neutral-900 rounded-md p-2">
                <span 
                    class="flex justify-center items-center size-32 md:size-44 bg-neutral-100 rounded-full"
                    style="background: conic-gradient({trophyPie})">
                    <span class="flex justify-center items-center size-24 md:size-32 bg-neutral-900 rounded-full">
                        <img src="https://cdn.islandstats.xyz/icons/trophies/red.png" alt="" class="size-8 md:size-14" />
                    </span>
                </span>
                <div class="flex flex-col gap-y-1 items-center md:items-start self-center">
                    <p class="text-xs md:text-lg font-semibold">Where do your skill trophies come from?</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-2 tabular-nums">
                        {#each gameTrophies as game}
                            <p class="flex gap-x-2 text-xs md:text-sm">
                                <span class="size-3 md:size-5 rounded-sm" style="background-color: {game.colour}"></span>
                                <span>{game.game}: {game.trophies.toLocaleString()} <span class="text-neutral-500">({calculatePercentage(game.trophies, player.trophies.skill.total)}%)</span></span>
                            </p>
                        {/each}
                    </div>
                </div>
            </div>

            <!-- games played -->
            <div class="flex flex-col xl:flex-row items-center w-full md:w-1/2 gap-4 bg-neutral-900 rounded-md p-2">
                <span 
                    class="flex justify-center items-center size-32 md:size-44 bg-neutral-100 rounded-full"
                    style="background: conic-gradient({gamesPie})">
                    <span class="flex justify-center items-center size-24 md:size-32 bg-neutral-900 rounded-full">
                        <img src="https://cdn.islandstats.xyz/games/lobby/icon.png" alt="" class="size-8 md:size-14" />
                    </span>
                </span>
                <div class="flex flex-col gap-y-1 items-center md:items-start self-center">
                    <p class="text-xs md:text-lg font-semibold">Which games have you played the most?</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-2 tabular-nums">
                        {#each gameTrophies.filter(g => g.game !== "Dojo") as game}
                            <p class="flex gap-x-2 text-xs md:text-sm">
                                <span class="size-3 md:size-5 rounded-sm" style="background-color: {game.colour}"></span>
                                <span>{game.game}: {game.gamesPlayed!.toLocaleString()} <span class="text-neutral-500">({calculatePercentage(game.gamesPlayed!, player.statistics!.games_played)}%)</span></span>
                            </p>
                        {/each}
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="py-4">
        <p class="text-xl font-semibold mb-2">Skill Trophy Progress</p>
        <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
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
                <div class="flex gap-x-4 bg-neutral-900 rounded-md p-2">
                    <span 
                        class="flex justify-center items-center size-14 md:size-18 bg-neutral-100 rounded-full {getCrownColour(player.crownLevel.levelData.level)}"
                        style="background: conic-gradient({getCrownColourHex(player.crownLevel.levelData.level)} {Math.floor((calculateTotalTrophies(game.stats!, game.badges, game.tieredBadges) / calculateMaxTrophies(game.badges, game.tieredBadges)) * 360)}deg, oklch(0.269 0 0) 0deg)"
                    >
                        <span class="flex justify-center items-center size-11 md:size-14 bg-neutral-900 rounded-full">
                            <img src="https://cdn.islandstats.xyz/games/{game.icon}/icon.png" alt="{game.label}" class="size-6 md:size-8" />
                        </span>
                    </span>
                    <div class="self-center">
                        <p class="text-base md:text-lg font-semibold">{game.label}</p>
                        <div class="flex gap-x-1 tabular-nums">
                            <img src="https://cdn.islandstats.xyz/icons/trophies/red.png" alt="Skill Trophy Icon" class="size-6" />
                            <p class="text-base self-center">
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