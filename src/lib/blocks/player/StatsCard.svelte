<script lang="ts">
	import type { Player } from '$lib/types';
	import { calculateTrophiesToNextEvolution, getCrownColour } from '$lib/utils';

	export let player: Player;
</script>

<div class="h-full flex flex-col rounded-lg border border-neutral-800 bg-neutral-900 shadow-lg divide-y divide-neutral-800">
    <!-- progress bar -->
	<div class="p-4">
        <div class="flex flex-row justify-between">
            <img src={`https://cdn.islandstats.xyz/icons/crowns/${player.crownLevel.levelData.evolution}.png`} alt={``} class="size-8" />
            <span class="ml-2 text-xl font-bold self-center">{player.crownLevel.levelData.level}</span>
    
            <div class="overflow-hidden rounded-full w-full mx-4 bg-neutral-800 self-center">
                <div 
                    class={`h-4 rounded-l-full ${getCrownColour(player.crownLevel.levelData.level)}`} 
                    style={`width: ${player.crownLevel.levelData.nextLevelProgress.obtained / player.crownLevel.levelData.nextLevelProgress.obtainable * 100}%`}
                ></div>
            </div>
    
            <span class="text-xl font-bold self-center">{player.crownLevel.levelData.level + 1}</span>
        </div>
        <div class="flex gap-x-2 justify-center text-neutral-500 mt-2 gap-y-1 text-base">
            <p class="self-center">
                <span class="text-neutral-300 tabular-nums">
                    {Math.round((player.crownLevel.levelData.nextLevelProgress.obtained / player.crownLevel.levelData.nextLevelProgress.obtainable * 100) * 10) / 10}%
                </span>
                <span class="text-neutral-300 tabular-nums">
                    ({player.crownLevel.levelData.nextLevelProgress.obtained.toLocaleString()}/{player.crownLevel.levelData.nextLevelProgress.obtainable.toLocaleString()})
                </span>
            </p>
            <p> / </p>
            <p class="flex gap-x-1.5 items-center">
                <span class="flex flex-row gap-x-1 text-neutral-300">
                    <img src={`https://cdn.islandstats.xyz/icons/crowns/${player.crownLevel.levelData.evolution + 1}.png`} alt={`Crown Level ${player.crownLevel.levelData.evolution} Icon`} class="size-5 self-center" />
                    <span class="font-semibold tabular-nums">{player.crownLevel.levelData.nextEvolutionLevel}</span>
                </span>
                <span>in</span>
                <span class="flex flex-row gap-x-1 text-neutral-300">
                    <img src={`https://cdn.islandstats.xyz/icons/trophies/yellow.png`} alt="Trophy Icon" class="size-5 self-center" />
                    <span class="font-semibold tabular-nums">{calculateTrophiesToNextEvolution("crown", player.trophies.total, player.crownLevel.levelData.nextEvolutionLevel).toLocaleString()}</span>
                </span>
            </p>
        </div>
    </div>

    <!-- trophies and wallet -->
    <div class="flex flex-row divide-x divide-neutral-800">
        <div class="w-3/5 p-4">
            <p class="text-md lg:text-lg font-semibold mb-2">Trophies</p>
            <div class="flex flex-col gap-y-1">
                {#each [
                    { label: "Total Trophies", icon: "yellow", stats: [player.trophies.total, player.trophies.max] },
                    { label: "Skill Trophies", icon: "red", stats: [player.trophies.skill.total, player.trophies.skill.max] },
                    { label: "Style Trophies", icon: "purple", stats: [player.trophies.style.total, player.trophies.style.max] },
                    { label: "Angler Trophies", icon: "blue", stats: [player.trophies.angler.total, player.trophies.angler.max] },
                    { label: "Bonus Trophies", icon: "silver", stats: [player.trophies.bonus] },
                ] as { label: string, icon: string, stats: number[] }[] as trophyType}
                    <p class="flex flex-row gap-x-2 text-sm lg:text-base">
                        <img src={`https://cdn.islandstats.xyz/icons/trophies/${trophyType.icon}.png`} alt={`${trophyType.label} Icon`} class="size-7 2xl:size-8" />
                        <span class="tabular-nums self-center">{trophyType.stats[0].toLocaleString()}</span>
                        {#if trophyType.stats.length > 1}<span class="text-neutral-500 tabular-nums self-center"> / {trophyType.stats[1].toLocaleString()}</span>{/if}
                    </p>
                {/each}
            </div>
        </div>
        <div class="w-1/2 p-4">
            <p class="text-md lg:text-lg font-semibold mb-2">Wallet</p>
            <div class="flex flex-col gap-y-1">
                {#each [
                    { label: "Coins", icon: "coin", stat: player.collections?.currency.coins },
                    { label: "Silver", icon: "silver", stat: player.collections?.currency.silver },
                    { label: "Material Dust", icon: "material_dust", stat: player.collections?.currency.materialDust },
                    { label: "A.N.G.L.R Tokens", icon: "angler_token", stat: player.collections?.currency.anglrTokens },
                    { label: "Royal Reputation", icon: "royal_reputation", stat: player.collections?.currency.royalReputation },
                ] as { label: string, icon: string, stat: number }[] as trophyType}
                    <p class="flex flex-row gap-x-2 text-sm lg:text-base">
                        <img src={`https://cdn.islandstats.xyz/icons/currency/${trophyType.icon}.png`} alt={`${trophyType.label} Icon`} class="size-6 lg:size-8" />
                        <span class="tabular-nums self-center">{trophyType.stat?.toLocaleString() || "Unknown"}</span>
                    </p>
                {/each}
            </div>
        </div>
    </div>
</div>