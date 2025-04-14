<script lang="ts">
    import type { BattleBoxStatistics, DynaballStatistics, HitwStatistics, IslandTieredBadge, ParkourWarriorDojoStatistics, ParkourWarriorSurvivorStatistics, RocketSpleefStatistics, SkyBattleStatistics, TgttosStatistics } from "$lib/types";
	import { calculateBadgeTier, calculateTotalTrophies } from "$lib/badges";
	import { roundNumber, shortenNumber } from "$lib/utils";

    const { stats, badges, gameIcon, forNextTier, sortedBy, all }: {
        stats: BattleBoxStatistics | SkyBattleStatistics | TgttosStatistics | HitwStatistics | DynaballStatistics | ParkourWarriorDojoStatistics | ParkourWarriorSurvivorStatistics | RocketSpleefStatistics,
        badges: IslandTieredBadge[],
        gameIcon: string,
        forNextTier: boolean,
        sortedBy: string,
        all: boolean
    } = $props();

    function calculateStatLeft(badge: IslandTieredBadge) {
        return forNextTier ? calculateBadgeTier(stats[badge.stat], badge.tiers).next.amount - stats[badge.stat] : badge.tiers[badge.tiers.length - 1].amount - stats[badge.stat];
    }

    function totalDojoRotations() {
        const currentTime = new Date().getTime();
        const startTime = new Date("2023-06-20T00:00:00Z").getTime();
        const timeDiff = currentTime - startTime;
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const monthsDiff = Math.ceil(daysDiff / 30);
        return monthsDiff;
    }

    const sortedBadges = badges.filter(b => stats[b.stat] < b.tiers[b.tiers.length - 1].amount);
</script>

{#if sortedBadges.length === 0 && !all}
    <div class="flex gap-x-2 px-1 text-lg">
        <img src="https://cdn.discordapp.com/emojis/1042056406997663844.webp" alt="Trophies Icon" class="size-6 self-center" />
        <p>All badges complete!</p>
    </div>
{:else}
    {#each sortedBadges.sort((a, b) => {
        if (sortedBy === "Games Left") {
            return Math.round(calculateStatLeft(a) / (stats[a.stat] / (gameIcon === "parkour_warrior/solo" ? totalDojoRotations() : stats.games_played))) - Math.round(calculateStatLeft(b) / (stats[b.stat] / (gameIcon === "parkour_warrior/solo" ? totalDojoRotations() : stats.games_played)));
        } else if (sortedBy === "Stats Left") {
            return calculateStatLeft(a) - calculateStatLeft(b);
        } else if (sortedBy === "Trophies") {
            return calculateTotalTrophies(stats, [], [b]) - calculateTotalTrophies(stats, [], [a]);
        }
        return 0;
    }) as badge}
        <div class="relative flex flex-col justify-between gap-y-2 text-base lg:text-lg border rounded-md border-neutral-800">
            <div class="flex justify-between p-2">
                <div class="flex gap-x-4 min-w-full justify-between">
                    <div class="flex gap-x-2">
                        <img class="size-12 lg:size-16" src={`https://cdn.islandstats.xyz/badges/${badge.icon}.png`} alt={badge.name} />
                        <div class="flex flex-col">
                            <p class="font-semibold">{badge.name} {calculateBadgeTier(stats[badge.stat], badge.tiers).tier.name} -> {forNextTier ? calculateBadgeTier(stats[badge.stat], badge.tiers).next.name : badge.tiers[badge.tiers.length - 1].name}</p>
                            <p class="text-sm lg:text-base text-neutral-500">
                                <span>{badge.description.split("%%")[0]}</span>
                                <span class="text-neutral-300 font-semibold"> {calculateStatLeft(badge).toLocaleString()} more </span>
                                <span>{badge.description.split("%%")[1]}</span>
                            </p>
                            <p class="mt-2 text-sm lg:text-base text-neutral-300">
                                <span>Estimated {gameIcon === "parkour_warrior/solo" ? "Completions" : "Games"} Left:</span> <span class="font-semibold">
                                    {#if gameIcon === "parkour_warrior/solo"}
                                        {calculateStatLeft(badge)}
                                    {:else}
                                        {(Math.round(calculateStatLeft(badge) / (stats[badge.stat] / stats.games_played)) || "Unknown").toLocaleString()}
                                    {/if}
                                </span> 
                                <span class="text-neutral-500">
                                    {#if badge.game === "parkour_warrior/solo"}
                                        {!badge.name.includes("Leaper") ? `(${roundNumber(stats[badge.stat] / totalDojoRotations()).toLocaleString()} per rotation)` : ""}
                                    {:else}
                                        ({(roundNumber(stats[badge.stat] / stats.games_played) || 0).toLocaleString()} per game)
                                    {/if}
                                </span>
                            </p>
                            <p class="flex gap-x-1 text-sm lg:text-base text-neutral-300">
                                <img src="https://cdn.islandstats.xyz/icons/trophies/red.png" alt="Trophies Icon" class="size-5 self-center" />
                                <span class="font-semibold">{calculateBadgeTier(stats[badge.stat], badge.tiers).next.trophies}</span>
                                <span>for next tier</span> 
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <p class={`px-3 py-2 rounded-b-md tabular-nums text-sm lg:text-base ${stats[badge.stat]! > badge.tiers[badge.tiers.length - 1].amount ? "bg-green-800/50" : "bg-neutral-800"}`}>
                {#each badge.tiers as tier}
                    {#if stats[badge.stat] >= tier.amount}
                        <span class="text-green-600">{shortenNumber(tier.amount).toLocaleString()}</span>
                    {:else}
                        {#if calculateBadgeTier(stats[badge.stat], badge.tiers).next.name === tier.name}
                            <span class="text-orange-400">{stats[badge.stat].toLocaleString()}</span>
                            <span class="text-neutral-500">
                                <span> / </span>
                                <span>{shortenNumber(tier.amount).toLocaleString()}</span>
                            </span>
                        {:else}
                            <span class="text-orange-400">{shortenNumber(tier.amount).toLocaleString()}</span>
                        {/if}
                    {/if}
                
                    {#if badge.tiers.indexOf(tier) !== badge.tiers.length - 1}<span class="text-neutral-600 pr-2 px-1">•</span>{/if}
                {/each}
            </p>

            <div class="absolute -top-2 -right-2 bg-neutral-800 rounded-md">
                <img src={`https://cdn.islandstats.xyz/games/${gameIcon}/icon.png`} alt={badge.name} class="size-10 p-1" />
            </div>
        </div>
    {/each}
{/if}
