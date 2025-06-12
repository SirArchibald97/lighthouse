<script lang="ts">
	import ChevronUpDown from '$lib/icons/ChevronUpDown.svelte';
	import { calculatePercentage, calculateTrophiesToNextEvolution, earnedTrophiesForIsland, formatCaughtDate, getCrownColour, getRarityColour, totalTrophiesForIsland } from '$lib/utils';
	import { slide } from 'svelte/transition';
	import FishingIslandStats from '$lib/blocks/fishing/FishingIslandStats.svelte';
    import type { PageProps } from './$types';
	import type { Player } from '$lib/types';
    import { Tooltip } from 'flowbite-svelte';

	let { data }: PageProps = $props();

    const collections = [
        { name: "Verdant Woods", climate: "TEMPERATE", icon: "verdant_woods", level: 0, type: "fish" },
        { name: "Floral Forest", climate: "TEMPERATE", icon: "floral_forest", level: 10, type: "fish" },
        { name: "Dark Grove", climate: "TEMPERATE", icon: "dark_grove", level: 20, type: "fish" },
        { name: "Temperate Crab Pots", climate: "TEMPERATE", icon: "crab_pot", level:  0, type: "crab" },
        { name: "Sunken Swamp", climate: "TEMPERATE", icon: "grotto_temperate", level: 0, type: "grotto" },

        { name: "Tropical Overgrowth", climate: "TROPICAL", icon: "tropical_overgrowth", level: 30, type: "fish" },
        { name: "Coral Shores", climate: "TROPICAL", icon: "coral_shores", level: 40, type: "fish" },
        { name: "Twisted Swamp", climate: "TROPICAL", icon: "twisted_swamp", level: 45, type: "fish" },
        { name: "Tropical Crab Pots", climate: "TROPICAL", icon: "crab_pot", level:  30, type: "crab" },
        { name: "Mirrored Oasis", climate: "TROPICAL", icon: "grotto_tropical", level: 30, type: "grotto" },

        { name: "Ancient Sands", climate: "BARREN", icon: "ancient_sands", level: 50, type: "fish" },
        { name: "Blazing Canyon", climate: "BARREN", icon: "blazing_canyon", level: 55, type: "fish" },
        { name: "Ashen Wastes", climate: "BARREN", icon: "ashen_wastes", level: 60, type: "fish" },
        { name: "Barren Crab Pots", climate: "BARREN", icon: "crab_pot", level:  50, type: "crab" },
        { name: "Volcanic Springs", climate: "BARREN", icon: "grotto_barren", level: 50, type: "grotto" },
    ] as { name: string, climate: string, icon: string, level: number, type: "fish" | "crab" }[];

    const climateStyles = {
        "TEMPERATE": "bg-green-500/50 border-green-500",
        "TROPICAL": "bg-lime-500/50 border-lime-500",
        "BARREN": "bg-orange-500/50 border-orange-500"
    } as { [climate: string]: string };

    let expandedSection = $state("");

    const recommendedTypes = {
        "fish": "Fish",
        "crab": "Crab Pots",
        "grotto": "Grotto"
    } as { [type: string]: string };
    let recommendedType = $state("fish");
    function cycleRecommendedType() {
        const types = ["fish", "crab", "grotto"];
        recommendedType = types[types.indexOf(recommendedType) + 1 >= types.length ? 0 : types.indexOf(recommendedType) + 1];
    }
    function getRecommendedIsland(player: Player, type: string) {
        const islands = collections.filter(c => player.crownLevel.fishingLevelData.level >= c.level && c.type === type);
        const islandPoints = {} as { [island: string]: number };
        for (const island of islands) {
            islandPoints[island.name] = 0;
            for (const fish of player.collections?.fish.filter(f => f.fish.collection === island.name) || []) {
                const points = { "AVERAGE": 1, "LARGE": 2, "MASSIVE": 3, "GARGANTUAN": 4, "COLOSSAL": 4 } as { [weight: string]: number };
                for (const weight of fish.weights) {
                    islandPoints[island.name] = islandPoints[island.name] + points[weight.weight];
                }
            }
        }
        
        let recommendedIsland = Object.entries(islandPoints)[0];
        for (const [name, points] of Object.entries(islandPoints)) {
            if (points < recommendedIsland[1]) {
                recommendedIsland = [name, points];
            }
        }
        return islands.find(i => i.name === recommendedIsland[0]);
    }
</script>

{#await data.streamed.player then player}
    <div class="flex flex-col border-b border-x border-neutral-800 rounded-b-md">
        {#if player?.collections}
            <div class="w-full p-4 flex flex-col gap-4 lg:flex-row justify-between">
                <!-- fishing level -->
                <div class="flex flex-col justify-between w-full lg:w-2/5 border border-neutral-800 divide-y divide-neutral-800 rounded-md">
                    <div class="w-full flex flex-col items-center p-4">
                        <div class="flex flex-row justify-between w-full">
                            <img src={`https://cdn.islandstats.xyz/fishing/level/${player.crownLevel.fishingLevelData.evolution}.png`} alt={``} class="size-8" />
                            <span class="pl-2 text-xl font-bold self-center">{player.crownLevel.fishingLevelData.level}</span>
                    
                            <div class="overflow-hidden rounded-full w-full mx-4 bg-neutral-800 self-center">
                                <div 
                                    class={`h-4 rounded-l-full ${getCrownColour(player.crownLevel.fishingLevelData.level)}`} 
                                    style={`width: ${player.crownLevel.fishingLevelData.nextLevelProgress.obtained / player.crownLevel.fishingLevelData.nextLevelProgress.obtainable * 100}%`}
                                ></div>
                            </div>
                    
                            <span class="text-xl font-bold self-center">{player.crownLevel.fishingLevelData.level + 1}</span>
                        </div>
                        <div class="flex justify-between gap-x-2 text-neutral-500 mt-2 gap-y-1 text-base">
                            <p class="self-center">
                                <span class="text-neutral-300 tabular-nums">
                                    {Math.round((player.crownLevel.fishingLevelData.nextLevelProgress.obtained / player.crownLevel.fishingLevelData.nextLevelProgress.obtainable * 100) * 10) / 10}%
                                </span>
                                <span class="text-neutral-300 tabular-nums">
                                    ({player.crownLevel.fishingLevelData.nextLevelProgress.obtained.toLocaleString()}/{player.crownLevel.fishingLevelData.nextLevelProgress.obtainable.toLocaleString()})
                                </span>
                            </p>
                            <p> / </p>
                            <p class="flex flex-row gap-x-1.5 items-center">
                                <span class="flex flex-row gap-x-1 text-neutral-300">
                                    <img src={`https://cdn.islandstats.xyz/fishing/level/${player.crownLevel.fishingLevelData.evolution + 1}.png`} alt={`Crown Level ${player.crownLevel.fishingLevelData.evolution} Icon`} class="size-5 self-center" />
                                    <span class="font-semibold tabular-nums">{player.crownLevel.fishingLevelData.nextEvolutionLevel}</span>
                                </span>
                                <span>in</span>
                                <span class="flex flex-row gap-x-1 text-neutral-300">
                                    <img src={`https://cdn.islandstats.xyz/icons/trophies/blue.png`} alt="Trophy Icon" class="size-5 self-center" />
                                    <span class="font-semibold tabular-nums">{calculateTrophiesToNextEvolution("fishing", player.trophies.angler.total, player.crownLevel.fishingLevelData.nextEvolutionLevel).toLocaleString()}</span>
                                </span>
                            </p>
                        </div>
                    </div>
                    <div class="p-4 flex flex-col">
                       {#if player.collections.fish}
                            {@const recommendedIsland = getRecommendedIsland(player, recommendedType)}
                            {#if recommendedIsland}
                                <div class="flex justify-between">
                                    <div class="flex flex-col gap-y-1">
                                        <p class="text-xl font-semibold">Recommended Island</p>
                                        <div class="flex gap-x-3">
                                            <img src="https://cdn.islandstats.xyz/fishing/islands/{recommendedIsland?.icon}.png" alt="Fishing Game Icon" class="size-14 lg:size-16 self-center" />
                                            <div class="flex flex-col gap-y-1 self-center">
                                                <div class="flex gap-x-3">
                                                    <p class="text-lg font-semibold">{recommendedIsland?.name}</p>
                                                    <p class="text-sm self-center px-3 border rounded-full {climateStyles[recommendedIsland.climate]}">{recommendedIsland.climate[0] + recommendedIsland.climate.slice(1).toLowerCase()}</p>
                                                </div>  
                                                <div class="grid grid-cols-2 2xl:flex gap-x-4">
                                                    {#each (recommendedType === "crab" ? ["AVERAGE", "LARGE", "COLOSSAL"] : ["AVERAGE", "LARGE", "MASSIVE", "GARGANTUAN"]) as weight}
                                                        <p class="flex gap-x-2 tabular-nums">
                                                            <img src={`https://cdn.islandstats.xyz/fishing/stars/${(weight === "COLOSSAL" ? "GARGANTUAN" : weight).toLowerCase()}.png`} alt={``} class="size-6 self-center cursor-pointer" />
                                                            <Tooltip arrow={false} type="custom" placement="top" class="z-20 text-sm border !border-neutral-700 !bg-neutral-900 px-2 py-0.5 rounded-md">{weight[0] + weight.slice(1).toLowerCase()}</Tooltip>
                                                            <span>
                                                                {player.collections.fish.filter(f => f.fish.collection === recommendedIsland?.name && f.weights.find(w => w.weight === weight)).length}
                                                                /
                                                                {player.collections.fish.filter(f => f.fish.collection === recommendedIsland?.name).length}
                                                            </span>
                                                        </p>
                                                    {/each}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button onclick={cycleRecommendedType} class="flex gap-x-1 self-start border border-neutral-800 rounded-md px-2 py-1 hover:bg-neutral-800/50 duration-100 cursor-pointer">
                                        {recommendedTypes[recommendedType]}
                                    </button>
                                </div>
                            {/if}
                       {/if}
                    </div>
                </div>

                <!-- fishing islands overview -->
                <div class="w-full lg:w-3/5 flex flex-col justify-center gap-y-4 items-center p-4 border border-neutral-800 rounded-md">
                    <div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
                        {#each collections as collection}
                            {#if player.crownLevel.fishingLevelData.level >= collection.level}
                                <div class="flex gap-x-2">
                                    <div class="relative cursor-pointer">
                                        <span class="flex justify-center items-center size-8 lg:size-12 bg-neutral-800 rounded-md">
                                            <img src="https://cdn.islandstats.xyz/fishing/islands/{collection.icon}.png" alt="Fishing Game Icon" class="z-10 size-6 lg:size-8 shadow-2xl" />
                                        </span>
                                        <span 
                                            class="absolute size-auto top-0 left-0 right-0 bottom-0 {getCrownColour(player.crownLevel.fishingLevelData.level)} {(earnedTrophiesForIsland(player.collections.fish, collection.name) / totalTrophiesForIsland(player.collections.fish, collection.name)) < 1 ? "rounded-l-md" : "rounded-md"}" 
                                            style={`width: ${(earnedTrophiesForIsland(player.collections.fish, collection.name) / totalTrophiesForIsland(player.collections.fish, collection.name)) * 100}%`}
                                        ></span>
                                    </div>
                                    <Tooltip arrow={false} type="custom" placement="top" class="z-20 text-sm border !border-neutral-700 !bg-neutral-900 px-2 py-0.5 rounded-md duration-75">{collection.name}</Tooltip>
                                    <div class="flex gap-x-1 self-center">
                                        <img src="https://cdn.islandstats.xyz/icons/trophies/blue.png" alt="Skill Trophy Icon" class="size-6 self-center" />
                                        <p class="text-base tabular-nums self-center">{calculatePercentage(
                                            earnedTrophiesForIsland(player.collections!.fish, collection.name),
                                            totalTrophiesForIsland(player.collections!.fish, collection.name)
                                        )}%</p>
                                    </div>
                                </div>
                            {:else}
                                <div class="flex gap-x-2">
                                    <span class="relative cursor-pointer">
                                        <span class="flex justify-center items-center size-8 lg:size-12 bg-neutral-800 rounded-md">
                                            <img src="https://cdn.islandstats.xyz/fishing/islands/{collection.icon}.png" alt="Fishing Game Icon" class="z-10 size-6 lg:size-8 shadow-2xl" />
                                        </span>
                                    </span>
                                    <Tooltip arrow={false} type="custom" placement="top" class="z-20 text-sm border !border-neutral-700 !bg-neutral-900 px-2 py-0.5 rounded-md duration-75">{collection.name}</Tooltip>
                                    <div class="flex gap-x-1 self-center">
                                        <img src="/locked.png" alt="Skill Trophy Icon" class="size-6 self-center" />
                                        <p class="text-base self-center">Locked</p>
                                    </div>
                                </div>
                            {/if}
                        {/each}
                    </div>
                </div>
            </div>

            <!-- fishing collections -->
            <div class="flex flex-col gap-y-2 px-4 pb-4">
                {#each collections.filter(c => c.level <= player.crownLevel.fishingLevelData.level).concat(collections.filter(c => c.level > player.crownLevel.fishingLevelData.level).sort((a, b) => a.level - b.level)) as collection}
                    <div class="border border-neutral-800 rounded-md">
                        {#if player.crownLevel.fishingLevelData.level >= collection.level}
                            <button onclick={() => { if (expandedSection === collection.name) expandedSection = ""; else expandedSection = collection.name; }} class="w-full cursor-pointer flex flex-row justify-between hover:bg-neutral-800/50 duration-100">
                                <div class="flex flex-row gap-x-2 p-3">
                                    <img 
                                        src={collection.icon.startsWith("!") ? collection.icon : `https://cdn.islandstats.xyz/fishing/islands/${collection.icon}.png`} 
                                        alt={`${collection.icon} Collection`} 
                                        class="size-8"
                                    />
                                    <p class="text-lg lg:text-xl font-semibold self-center">{collection.name}</p>
                                </div>
                                <div class="hidden md:flex gap-x-4">
                                    <span class="self-center px-3 py-0.5 border rounded-full {climateStyles[collection.climate]}">{collection.climate[0] + collection.climate.toLowerCase().slice(1)}</span>
                                    <span class="size-6 lg:size-8 text-neutral-500 self-center mr-2"><ChevronUpDown /></span>
                                </div>
                            </button>
                        {:else}
                            <div class="w-full flex flex-row justify-between bg-neutral-800/80">
                                <div class="flex flex-row gap-x-2 p-3">
                                    <img src={collection.icon.startsWith("/") ? collection.icon : `https://cdn.islandstats.xyz/fishing/islands/${collection.icon}.png`} alt={``} class="size-8"/>
                                    <p class="text-lg lg:text-xl font-semibold self-center">{collection.name}</p>
                                </div>
                                <div class="flex gap-x-2 self-center mr-4 text-neutral-400">
                                    <p class="hidden md:flex self-center">Unlocked at</p>
                                    <div class="flex gap-x-1">
                                        <img src={`https://cdn.islandstats.xyz/fishing/level/${Math.floor(collection.level / 10)}.png`} alt={``} class="size-6 lg:size-8" />
                                        <span class="self-center tabular-nums">{collection.level}</span>
                                    </div>
                                </div>
                            </div>
                        {/if}
                        {#if expandedSection === collection.name}
                            <div transition:slide={{ duration: 400 }} class="text-base md:text-lg p-4 border-t border-neutral-800">
                                <div class="w-full">
                                    <FishingIslandStats {player} {collection} />

                                    <div class="pt-4 flex flex-col gap-y-2">
                                        {#each ["COMMON", "UNCOMMON", "RARE", "EPIC", "LEGENDARY", "MYTHIC"] as rarity}
                                            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
                                                <!-- FISH -->
                                                {#each (collection.type !== "crab" ? 
                                                    player.collections.fish.filter(fish => fish.fish.collection === collection.name && fish.fish.rarity === rarity) : 
                                                    player.collections.fish.filter(fish => fish.fish.climate.toUpperCase() === collection.climate && fish.fish.name.includes(" Crab") && fish.fish.rarity === rarity)
                                                ) as fish}
                                                    <div class="flex flex-row gap-x-2 p-2 border border-neutral-800 rounded-md">
                                                        <img class="size-12 self-center" src="https://cdn.islandstats.xyz/fishing/fish/{collection.type === "crab" ? "crab_collection" : fish.fish.collection.toLowerCase().replaceAll(" ", "_")}/{fish.fish.name.toLowerCase().replaceAll(" ", "_")}.png" alt={fish.fish.name} />
                                                        <div class="flex flex-col w-full">
                                                            <div class="flex gap-x-4">
                                                                <p class={`text-base lg:text-lg font-semibold ${getRarityColour(fish.fish.rarity)}`}>{fish.fish.name}</p>
                                                                <div class="flex gap-x-1 self-center">
                                                                    {#each (collection.type === "crab" ? ["average", "large", "colossal"] : ["average", "large", "massive", "gargantuan"]) as weight}
                                                                        <img src={`https://cdn.islandstats.xyz/fishing/stars/${fish.weights.find(w => w.weight === weight.toUpperCase()) ? (weight === "colossal" ? "gargantuan" : weight) : `${(weight === "colossal" ? "gargantuan" : weight)}_empty`}.png`} alt={``} class="size-6 cursor-pointer" />
                                                                        <Tooltip arrow={false} type="custom" class="z-10 flex flex-col items-center text-sm border !border-neutral-700 !bg-neutral-900 px-2 py-0.5 rounded-md">
                                                                            <div class="flex gap-x-1">
                                                                                <span>{weight[0].toUpperCase() + weight.slice(1)}:</span>
                                                                                <img src="https://cdn.islandstats.xyz/icons/trophies/blue.png" alt="Angler Trophy Icon" class="size-3 lg:size-5 self-center {fish.weights.find(w => w.weight === weight.toUpperCase()) ? "" : "grayscale"}" />
                                                                                <span class="self-center tabular-nums {fish.weights.find(w => w.weight === weight.toUpperCase()) ? "text-green-500" : "text-neutral-500"}">{fish.fish[`${weight}Trophies`]}</span>
                                                                            </div>
                                                                            <span>{fish.weights.find(w => w.weight === weight.toUpperCase()) ? `Caught: ${formatCaughtDate(fish.weights.find(w => w.weight === weight.toUpperCase())?.firstCaught!)}` : "Not Caught"}</span>
                                                                        </Tooltip>
                                                                    {/each}
                                                                </div>
                                                            </div>
                                                            <p class="flex gap-x-2 text-neutral-400 text-sm md:text-base">
                                                                <span>Type: <span class="text-neutral-100">{fish.fish.elusive ? "Elusive" : "Normal"}</span></span>
                                                                <span>•</span>
                                                                <span>Catch Time: <span class="text-neutral-100">{fish.fish.catchTime.toLowerCase()[0].toUpperCase() + fish.fish.catchTime.toLowerCase().slice(1, fish.fish.catchTime.length)}</span></span>
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

                <div class="mt-2 flex flex-col border border-neutral-800 rounded-md">
                    <button onclick={() => { if (expandedSection === "stats") expandedSection = ""; else expandedSection = "stats"; }} class="w-full cursor-pointer flex flex-row justify-between hover:bg-neutral-800/50 duration-100">
                        <div class="flex flex-row gap-x-2 p-3">
                            <img 
                                src="https://cdn.islandstats.xyz/games/fishing/icon.png"
                                alt="Fishing Game Icon" 
                                class="size-8"
                            />
                            <p class="text-lg lg:text-xl font-semibold self-center">Other Fishing Stats</p>
                        </div>
                        <span class="size-6 lg:size-8 text-neutral-500 self-center mr-2"><ChevronUpDown /></span>
                    </button>
                    {#if expandedSection === "stats"}
                        <div transition:slide={{ duration: 400 }} class="flex justify-between text-base md:text-lg p-4 border-t border-neutral-800">
                            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2 w-full justify-between">
                                {#each [
                                    { total: player.statistics?.fishing.fish_caught.total, hasResearch: true, stats: [
                                        { label: "Fish Caught", value: player.statistics?.fishing.fish_caught.total, total: true },
                                        { label: "Average", value: player.statistics?.fishing.fish_caught.average, icon: "https://cdn.islandstats.xyz/fishing/stars/average.png" },
                                        { label: "Large", value: player.statistics?.fishing.fish_caught.large, icon: "https://cdn.islandstats.xyz/fishing/stars/large.png" },
                                        { label: "Massive", value: player.statistics?.fishing.fish_caught.massive, icon: "https://cdn.islandstats.xyz/fishing/stars/massive.png" },
                                        { label: "Gargantuan", value: player.statistics?.fishing.fish_caught.gargantuan, icon: "https://cdn.islandstats.xyz/fishing/stars/gargantuan.png" },
                                    ] },
                                    { total: player.statistics?.fishing.fish_caught.total, hasResearch: true, stats: [
                                        { label: "Fish Caught", value: player.statistics?.fishing.fish_caught.total, total: true },
                                        { label: "Common", value: player.statistics?.fishing.fish_caught.common, icon: "" },
                                        { label: "Uncommon", value: player.statistics?.fishing.fish_caught.uncommon, icon: "" },
                                        { label: "Rare", value: player.statistics?.fishing.fish_caught.rare, icon: "" },
                                        { label: "Epic", value: player.statistics?.fishing.fish_caught.epic, icon: "" },
                                        { label: "Legendary", value: player.statistics?.fishing.fish_caught.legendary, icon: "" },
                                        { label: "Mythic", value: player.statistics?.fishing.fish_caught.mythic, icon: "" }
                                    ] },
                                    { total: player.statistics?.fishing.trash_caught.total, stats: [
                                        { label: "Trash Caught", value: player.statistics?.fishing.trash_caught.total, total: true },
                                        { label: "Rusted Can", value: player.statistics?.fishing.trash_caught.common, icon: "/icons/trash_common.png" },
                                        { label: "Tangled Kelp", value: player.statistics?.fishing.trash_caught.uncommon, icon: "/icons/trash_uncommon.png" },
                                        { label: "Lost Shoe", value: player.statistics?.fishing.trash_caught.rare, icon: "/icons/trash_rare.png" },
                                        { label: "Royal Residue", value: player.statistics?.fishing.trash_caught.epic, icon: "/icons/trash_epic.png" },
                                        { label: "Forgotten Crown", value: player.statistics?.fishing.trash_caught.legendary, icon: "/icons/trash_legendary.png" },
                                    ] },
                                    { total: player.statistics?.fishing.treasure_caught.total, hasResearch: true, stats: [
                                        { label: "Treasure Caught", value: player.statistics?.fishing.treasure_caught.total, total: true },
                                        { label: "Common", value: player.statistics?.fishing.treasure_caught.common, icon: "/icons/common_treasure.png" },
                                        { label: "Uncommon", value: player.statistics?.fishing.treasure_caught.uncommon, icon: "/icons/uncommon_treasure.png" },
                                        { label: "Rare", value: player.statistics?.fishing.treasure_caught.rare, icon: "/icons/rare_treasure.png" },
                                        { label: "Epic", value: player.statistics?.fishing.treasure_caught.epic, icon: "/icons/epic_treasure.png" },
                                        { label: "Legendary", value: player.statistics?.fishing.treasure_caught.legendary, icon: "/icons/legendary_treasure.png" },
                                        { label: "Mythic", value: player.statistics?.fishing.treasure_caught.mythic, icon: "/icons/mythic_treasure.png" }
                                    ] },
                                    { total: player.statistics?.fishing.pearls_caught.total, hasResearch: true, stats: [
                                        { label: "Pearls Caught", value: player.statistics?.fishing.pearls_caught.total, total: true },
                                        { label: "Rough", value: player.statistics?.fishing.pearls_caught.rough, icon: "https://cdn.discordapp.com/emojis/1315385898468376596.webp" },
                                        { label: "Polished", value: player.statistics?.fishing.pearls_caught.polished, icon: "https://cdn.discordapp.com/emojis/1315385899839783112.webp" },
                                        { label: "Pristine", value: player.statistics?.fishing.pearls_caught.pristine, icon: "https://cdn.discordapp.com/emojis/1315386591182848082.webp?animated=true" }
                                    ] },
                                    { total: player.statistics?.fishing.spirits_caught.total, hasResearch: true, stats: [
                                        { label: "Spirits Caught", value: player.statistics?.fishing.spirits_caught.total, total: true },
                                        { label: "Spirit", value: player.statistics?.fishing.spirits_caught.spirit, icon: "https://cdn.discordapp.com/emojis/1317151653165797488.webp" },
                                        { label: "Refined", value: player.statistics?.fishing.spirits_caught.refined, icon: "https://cdn.discordapp.com/emojis/1317151651697655808.webp" },
                                        { label: "Pure", value: player.statistics?.fishing.spirits_caught.pure, icon: "https://cdn.discordapp.com/emojis/1315372015305232414.webp?animated=true" }
                                    ] },
                                    { total: Object.values(player.statistics?.fishing.wayfinder!).reduce((a, b) => b += a, 0), stats: [
                                        { label: "Total Wayfinder Data", value: Object.values(player.statistics?.fishing.wayfinder!).reduce((a, b) => b += a, 0), total: true },
                                        { label: "Temperate", value: player.statistics?.fishing.wayfinder.temperate, icon: "https://cdn.islandstats.xyz/fishing/islands/grotto_temperate.png" },
                                        { label: "Tropical", value: player.statistics?.fishing.wayfinder.tropical, icon: "https://cdn.islandstats.xyz/fishing/islands/grotto_tropical.png" },
                                        { label: "Barren", value: player.statistics?.fishing.wayfinder.barren, icon: "https://cdn.islandstats.xyz/fishing/islands/grotto_barren.png" }
                                    ] }
                                ] as { total: number, hasResearch: boolean | undefined, stats: { label: string, value: number, icon: string, total: boolean | undefined }[] }[] as category}
                                    <div class="flex justify-between bg-neutral-800/50 rounded-md w-full px-3 py-2">
                                        <div class="flex flex-col">
                                            {#each category.stats as stat}
                                                <div class="flex gap-x-2">
                                                    {#if stat.icon}<img src={stat.icon} alt={``} class="size-5 self-center" />{/if}
                                                    <p>{stat.label}: 
                                                        <span class="tabular-nums font-semibold">{stat.value?.toLocaleString()}</span> 
                                                        {#if !stat.total}<span class="tabular-nums text-neutral-500">({calculatePercentage(stat.value, category.total)}%)</span>{/if}
                                                    </p>
                                                </div>
                                            {/each}
                                        </div>
                                        {#if category.hasResearch}
                                            <img src="https://cdn.islandstats.xyz/icons/warnings/yellow.png" alt="Yellow Warning Icon" class="size-8 p-1 cursor-pointer" />
                                            <Tooltip arrow={false} type="custom" class="max-w-1/6 z-10 flex flex-col items-center text-sm border !border-neutral-700 !bg-neutral-900 px-2 py-1 rounded-md">
                                                <span>These values are counted twice whenever Glitched Rod triggers and so are not 100% accurate!</span>
                                            </Tooltip>
                                        {/if}
                                    </div>
                                {/each}
                            </div>
                        </div>
                    {/if}
                </div>
            </div>
        {:else}
            <div class="flex flex-row items-center justify-center py-16 rounded-lg bg-neutral-950/40 text-neutral-400">
                <div class="flex flex-col gap-y-1">
                    <img
                        src="https://cdn.islandstats.xyz/icons/warnings/orange.png"
                        alt="Orange warning icon"
                        class="size-8 self-center"
                    />
                    <p class="text-lg">Collections are disabled!</p>
                </div>
            </div>
        {/if}
    </div>
{/await}