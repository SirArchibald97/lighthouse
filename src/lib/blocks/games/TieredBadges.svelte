<script lang="ts">
    import type { BattleBoxStatistics, DynaballStatistics, HitwStatistics, IslandTieredBadge, ParkourWarriorDojoStatistics, ParkourWarriorSurvivorStatistics, RocketSpleefStatistics, SkyBattleStatistics, TgttosStatistics } from "$lib/types";
	import { calculateBadgeTier, calculateMaxTrophies, calculateTotalTrophies } from "$lib/badges";
	import { shortenNumber } from "$lib/utils";

    const { stats, badges }: {
        stats: BattleBoxStatistics | SkyBattleStatistics | TgttosStatistics | HitwStatistics | DynaballStatistics | ParkourWarriorDojoStatistics | ParkourWarriorSurvivorStatistics | RocketSpleefStatistics,
        badges: IslandTieredBadge[]
    } = $props(); 
</script>

{#each badges as badge}
    <div class={`flex flex-col justify-between gap-y-2 text-lg border ${calculateTotalTrophies(stats!, [], [badge]) === calculateMaxTrophies([], [badge]) ? "border-green-800/50 bg-green-800/10" : "border-neutral-800"}`}>
        <div class="flex justify-between p-2">
            <div class="flex gap-x-4 min-w-full justify-between">
                <div class="flex gap-x-2">
                    <img class="size-16" src={`https://cdn.islandstats.xyz/badges/${badge.icon}.png`} alt={badge.name} />
                    <div class="flex flex-col">
                        <p class="font-semibold">{badge.name} {calculateBadgeTier(stats[badge.stat], badge.tiers).tier.name}</p>
                        <p class="text-base text-neutral-500">{badge.description}</p>
                    </div>
                </div>
                <div class={`flex shrink-0 gap-x-1 rounded-full px-2 py-0.5 self-start ${stats[badge.stat] > badge.tiers[badge.tiers.length - 1].amount ? "bg-green-800" : "bg-neutral-700/50"}`}>
                    <img src="https://cdn.islandstats.xyz/icons/trophies/red.png" alt="Trophies Icon" class="size-6 self-center" />
                    <p class="text-base flex self-center">{calculateTotalTrophies(stats, [], [badge])}</p>
                </div>
            </div>
        </div>
        <p class={`px-3 py-2 rounded-b-lg tabular-nums text-base ${stats[badge.stat]! > badge.tiers[badge.tiers.length - 1].amount ? "bg-green-800/50" : "bg-neutral-800"}`}>
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
    </div>
{/each}