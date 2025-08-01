<script lang="ts">
	import type { Player } from '$lib/types';
	import { calculateTrophiesToNextEvolution, getCrownColour } from '$lib/utils';
	import { Tooltip } from 'flowbite-svelte';

	export let player: Player;
</script>

<div class="h-full flex flex-col rounded-lg border border-neutral-800 bg-neutral-900 shadow-lg divide-y divide-neutral-800">
	<div class="p-4">
        <!-- progress bar -->
        <div class="flex flex-row justify-between text-lg md:text-xl">
            <img src={`https://cdn.islandstats.xyz/icons/crowns/${player.crownLevel.levelData.evolution}.png`} alt={``} class="size-6 md:size-8" />
            <span class="ml-2 font-bold self-center">{player.crownLevel.levelData.level}</span>
    
            <div class="overflow-hidden rounded-full w-full mx-4 bg-neutral-800 self-center">
                <div 
                    class={`h-4 rounded-l-full ${getCrownColour(player.crownLevel.levelData.level)}`} 
                    style={`width: ${player.crownLevel.levelData.nextLevelProgress.obtained / player.crownLevel.levelData.nextLevelProgress.obtainable * 100}%`}
                ></div>
            </div>
    
            <span class="font-bold self-center">{player.crownLevel.levelData.level + 1}</span>
        </div>

        <!-- progress stats -->
        <div class="flex flex-col sm:flex-row gap-x-2 justify-center items-center text-neutral-500 mt-2 gap-y-1 text-base">
            <p class="self-center">
                <span class="text-neutral-300 tabular-nums">
                    {Math.round((player.crownLevel.levelData.nextLevelProgress.obtained / player.crownLevel.levelData.nextLevelProgress.obtainable * 100) * 10) / 10}%
                </span>
                <span class="text-neutral-300 tabular-nums">
                    ({player.crownLevel.levelData.nextLevelProgress.obtained.toLocaleString()}/{player.crownLevel.levelData.nextLevelProgress.obtainable.toLocaleString()})
                </span>
            </p>
            <p class="hidden sm:flex"> / </p>
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
    <div class="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-neutral-800">
        <div class="w-full md:w-1/2 p-3">
            <p class="text-md lg:text-lg font-semibold pb-2">Trophies</p>
            <div class="flex flex-col gap-y-1">
                {#each [
                    { label: "Total Trophies", icon: "yellow", stats: [player.trophies.total, player.trophies.max] },
                    { label: "Skill Trophies", icon: "red", stats: [player.trophies.skill.total, player.trophies.skill.max] },
                    { label: "Style Trophies", icon: "purple", stats: [player.trophies.style.total, player.trophies.style.max] },
                    { label: "Angler Trophies", icon: "blue", stats: [player.trophies.angler.total, player.trophies.angler.max] },
                    { label: "Bonus Trophies", icon: "silver", stats: [player.trophies.bonus] },
                ] as { label: string, icon: string, stats: number[] }[] as trophy}
                    <p class="flex gap-x-2 text-base">
                        <img src={`https://cdn.islandstats.xyz/icons/trophies/${trophy.icon}.png`} alt={`${trophy.label} Icon`} class="size-7 2xl:size-8 self-center cursor-pointer" />
                        <Tooltip arrow={false} type="custom" placement="top" class="text-sm border !border-neutral-700 !bg-neutral-900 px-2 py-0.5 rounded-md duration-75">
                            {trophy.label}
                        </Tooltip>
                        <span class="tabular-nums self-center">{trophy.stats[0].toLocaleString()}</span>
                        {#if trophy.stats.length > 1}<span class="text-neutral-500 tabular-nums self-center"> / {trophy.stats[1].toLocaleString()}</span>{/if}
                    </p>
                {/each}
            </div>
        </div>
        <div class="w-1/2 p-3">
            <p class="text-md lg:text-lg font-semibold mb-2">Wallet</p>
            <div class="flex flex-col gap-y-1">
                {#each [
                    { label: "Coins", icon: "currency/coin.png", stat: player.collections?.currency.coins },
                    { label: "A.N.G.L.R Tokens", icon: "currency/angler_token.png", stat: player.collections?.currency.anglrTokens },
                    { label: "Royal Reputation", icon: "currency/royal_reputation.png", stat: player.collections?.currency.royalReputation },
                ] as { label: string, icon: string, stat: number }[] as currency}
                    <p class="flex flex-row gap-x-2 text-base">
                        <img src={`https://cdn.islandstats.xyz/icons/${currency.icon}`} alt={`${currency.label} Icon`} class="size-6 lg:size-8 cursor-pointer" />
                        <Tooltip arrow={false} type="custom" placement="top" class="text-sm border !border-neutral-700 !bg-neutral-900 px-2 py-0.5 rounded-md duration-75">
                            {currency.label}
                        </Tooltip>
                        <span class="tabular-nums self-center">{currency.stat?.toLocaleString() || "Unknown"}</span>
                    </p>
                {/each}
            </div>
        </div>
    </div>
</div>