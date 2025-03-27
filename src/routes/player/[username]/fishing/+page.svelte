<script lang="ts">
	import ChevronUpDown from '$lib/icons/ChevronUpDown.svelte';
	import { calculateTrophiesToNextEvolution, getCrownColour, getRarityColour } from '$lib/utils';
	import { slide } from 'svelte/transition';
    import crab_pot from "$lib/images/crab_pot.png";
    import type { PageProps } from './$types';
	import FishingIslandStats from '$lib/blocks/fishing/FishingIslandStats.svelte';
	let { data }: PageProps = $props();

    let expandedSection = $state("");
</script>

{#await data.streamed.player then player}
    <div class="flex flex-col gap-y-4 border-b border-x border-neutral-800 rounded-b-md">
        {#if player?.collections}
            <div class="flex flex-col items-center py-4 mt-2">
                <div class="flex flex-row justify-between w-5/6 lg:w-1/2">
                    <img src={`https://cdn.islandstats.xyz/fishing/level/${player.crownLevel.fishingLevelData.evolution}.png`} alt={``} class="size-8" />
                    <span class="ml-2 text-xl font-bold self-center">{player.crownLevel.fishingLevelData.level}</span>
            
                    <div class="overflow-hidden rounded-full w-full mx-4 bg-neutral-800 self-center">
                        <div 
                            class={`h-4 rounded-l-full ${getCrownColour(player.crownLevel.fishingLevelData.level)}`} 
                            style={`width: ${player.crownLevel.fishingLevelData.nextLevelProgress.obtained / player.crownLevel.fishingLevelData.nextLevelProgress.obtainable * 100}%`}
                        ></div>
                    </div>
            
                    <span class="text-xl font-bold self-center">{player.crownLevel.fishingLevelData.level + 1}</span>
                </div>
                <div class="flex flex-col items-center text-neutral-500 mt-2 gap-y-1">
                    <p>
                        <span>Progress: </span>
                        <span class="text-neutral-300 tabular-nums">
                            {Math.round((player.crownLevel.fishingLevelData.nextLevelProgress.obtained / player.crownLevel.fishingLevelData.nextLevelProgress.obtainable * 100) * 10) / 10}%
                        </span>
                        <span class="text-neutral-300 tabular-nums">
                            ({player.crownLevel.fishingLevelData.nextLevelProgress.obtained.toLocaleString()}/{player.crownLevel.fishingLevelData.nextLevelProgress.obtainable.toLocaleString()})
                        </span>
                    </p>
                    <p class="flex flex-row gap-x-1.5 items-center">
                        <span>Next evolution is </span>
                        <span class="flex flex-row gap-x-1 text-neutral-300 border-2 border-neutral-700 rounded-md px-1 shadow-xl">
                            <img src={`https://cdn.islandstats.xyz/fishing/level/${player.crownLevel.fishingLevelData.evolution + 1}.png`} alt={`Crown Level ${player.crownLevel.fishingLevelData.evolution} Icon`} class="size-5 self-center" />
                            <span class="font-semibold tabular-nums">{player.crownLevel.fishingLevelData.nextEvolutionLevel}</span>
                        </span>
                        <span>in</span>
                        <span class="flex flex-row gap-x-1 text-neutral-300 border-2 border-neutral-700 rounded-md px-1 shadow-xl">
                            <img src={`https://cdn.islandstats.xyz/icons/trophies/blue.png`} alt="Trophy Icon" class="size-5 self-center" />
                            <span class="font-semibold tabular-nums">{calculateTrophiesToNextEvolution("fishing", player.trophies.angler.total, player.crownLevel.fishingLevelData.nextEvolutionLevel).toLocaleString()}</span>
                        </span>
                    </p>
                </div>
            </div>

            <div class="flex flex-col gap-y-2 px-4 pb-4">
                {#each [
                    { name: "Verdant Woods", climate: "TEMPERATE", icon: "verdant_woods", level: 0, type: "fish" },
                    { name: "Sunken Swamp", climate: "TEMPERATE", icon: "grotto_temperate", level: 0, type: "fish" },
                    { name: "Temperate Crab Pots", climate: "TEMPERATE", icon: crab_pot, level:  0, type: "crab" },
                    { name: "Floral Forest", climate: "TEMPERATE", icon: "floral_forest", level: 10, type: "fish" },
                    { name: "Dark Grove", climate: "TEMPERATE", icon: "dark_grove", level: 20, type: "fish" },
                    
                    { name: "Tropical Overgrowth", climate: "TROPICAL", icon: "tropical_overgrowth", level: 30, type: "fish" },
                    { name: "Mirrored Oasis", climate: "TROPICAL", icon: "grotto_tropical", level: 30, type: "fish" },
                    { name: "Tropical Crab Pots", climate: "TROPICAL", icon: crab_pot, level:  30, type: "crab" },
                    { name: "Coral Shores", climate: "TROPICAL", icon: "coral_shores", level: 40, type: "fish" },
                    { name: "Twisted Swamp", climate: "TROPICAL", icon: "twisted_swamp", level: 45, type: "fish" },

                    { name: "Ancient Sands", climate: "BARREN", icon: "ancient_sands", level: 50, type: "fish" },
                    { name: "Volcanic Springs", climate: "BARREN", icon: "grotto_barren", level: 50, type: "fish" },
                    { name: "Barren Crab Pots", climate: "BARREN", icon: crab_pot, level:  50, type: "crab" },
                    { name: "Blazing Canyon", climate: "BARREN", icon: "blazing_canyon", level: 55, type: "fish" },
                    { name: "Ashen Wastes", climate: "BARREN", icon: "ashen_wastes", level: 60, type: "fish" }
                ] as { name: string, climate: string, icon: string, level: number, type: "fish" | "crab" }[] as collection}
                    <div class="border border-neutral-800 rounded-md">
                        {#if player.crownLevel.fishingLevelData.level >= collection.level}
                            <button onclick={() => { if (expandedSection === collection.name) expandedSection = ""; else expandedSection = collection.name; }} class="w-full cursor-pointer flex flex-row justify-between hover:bg-neutral-800/50 duration-100">
                                <div class="flex flex-row gap-x-2 p-3">
                                    <img 
                                        src={collection.icon.startsWith("/") ? collection.icon : `https://cdn.islandstats.xyz/fishing/islands/${collection.icon}.png`} 
                                        alt={`${collection.icon} Collection`} 
                                        class="size-8"
                                    />
                                    <p class="text-lg lg:text-xl font-semibold self-center">{collection.name}</p>
                                </div>
                                <span class="size-6 lg:size-8 text-neutral-500 self-center mr-2"><ChevronUpDown /></span>
                            </button>
                        {:else}
                            <div class="w-full flex flex-row justify-between bg-neutral-800/80">
                                <div class="flex flex-row gap-x-2 p-3">
                                    <img src={collection.icon.startsWith("/") ? collection.icon : `https://cdn.islandstats.xyz/fishing/islands/${collection.icon}.png`} alt={``} class="size-8"/>
                                    <p class="text-lg lg:text-xl font-semibold self-center">{collection.name}</p>
                                </div>
                                <div class="flex gap-x-2 self-center mr-4 text-neutral-400">
                                    <p class="self-center">Unlocked at</p>
                                    <div class="flex gap-x-1">
                                        <img src={`https://cdn.islandstats.xyz/fishing/level/${Math.floor(collection.level / 10)}.png`} alt={``} class="size-6 lg:size-8" />
                                        <span class="self-center tabular-nums">{collection.level}</span>
                                    </div>
                                </div>
                            </div>
                        {/if}
                        {#if expandedSection === collection.name}
                            <div transition:slide={{ duration: 400 }} class="text-lg p-4 border-t border-neutral-800">
                                <div class="w-full divide-y divide-neutral-800">
                                    <FishingIslandStats {player} {collection} />

                                    <div class="pt-4 flex flex-col gap-y-2">
                                        {#each ["COMMON", "UNCOMMON", "RARE", "EPIC", "LEGENDARY", "MYTHIC"] as rarity}
                                            <div class="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
                                                <!-- FISH -->
                                                {#each (collection.type === "fish" ? 
                                                    player.collections.fish.filter(fish => fish.fish.collection === collection.name && fish.fish.rarity === rarity) : 
                                                    player.collections.fish.filter(fish => fish.fish.climate.toUpperCase() === collection.climate && fish.fish.name.includes(" Crab") && fish.fish.rarity === rarity)
                                                ) as fish}
                                                    <div class={`flex flex-row gap-x-2 p-2 border border-neutral-800 rounded-md`}>
                                                        <img class="size-12 self-center" src={`https://cdn.islandstats.xyz/fishing/fish/${collection.type === "fish" ? fish.fish.collection.toLowerCase().replaceAll(" ", "_") : "crab_collection"}/${fish.fish.name.toLowerCase().replaceAll(" ", "_")}.png`} alt={fish.fish.name} />
                                                        <div class="flex flex-col w-full">
                                                            <div class="flex gap-x-4">
                                                                <p class={`text-lg font-semibold ${getRarityColour(fish.fish.rarity)}`}>{fish.fish.name}</p>
                                                                <div class="flex gap-x-1">
                                                                    {#if collection.type === "crab"}
                                                                        {#each ["average", "large", "colossal"] as weight}
                                                                            <img src={`https://cdn.islandstats.xyz/fishing/stars/${fish.weights.find(w => w.weight === weight.toUpperCase()) ? (weight === "colossal" ? "gargantuan" : weight) : `${(weight === "colossal" ? "gargantuan" : weight)}_empty`}.png`} alt={``} class="size-6" />
                                                                        {/each}
                                                                    {:else}
                                                                        {#each ["average", "large", "massive", "gargantuan"] as weight}
                                                                            <img src={`https://cdn.islandstats.xyz/fishing/stars/${fish.weights.find(w => w.weight === weight.toUpperCase()) ? (weight === "colossal" ? "gargantuan" : weight) : `${(weight === "colossal" ? "gargantuan" : weight)}_empty`}.png`} alt={``} class="size-6" />
                                                                        {/each}
                                                                    {/if}
                                                                </div>
                                                            </div>
                                                            <p class="flex gap-x-2 text-neutral-400 text-base">
                                                                <span>Type: <span class="text-neutral-900 dark:text-neutral-100">{fish.fish.elusive ? "Elusive" : "Normal"}</span></span>
                                                                <span>•</span>
                                                                <span>Catch Time: <span class="text-neutral-900 dark:text-neutral-100">{fish.fish.catchTime.toLowerCase()[0].toUpperCase() + fish.fish.catchTime.toLowerCase().slice(1, fish.fish.catchTime.length)}</span></span>
                                                            </p>
                                                        </div>
                                                    </div>                                             
                                                {/each}
                                            </div>
                                        {/each}
                                    </div>
                                </div>  
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>
        {:else}
            <div class="flex flex-row items-center justify-center py-16 rounded-lg bg-neutral-950/40 text-neutral-400">
                <div class="flex flex-col gap-y-1">
                    <img
                        src="https://cdn.collectionstats.xyz/icons/warnings/orange.png"
                        alt="Orange warning icon"
                        class="size-8 self-center"
                    />
                    <p class="text-lg">Collections disabled!</p>
                </div>
            </div>
        {/if}
    </div>
{/await}