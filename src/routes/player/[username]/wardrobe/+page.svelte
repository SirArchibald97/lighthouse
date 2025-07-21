<script lang="ts">
	import { calculatePercentage, calculateStyleLevel, getCrownColour, getRarityColour, trophiesForStyleLevel } from '$lib/utils';
    import type { PageProps } from './$types';
	import { slide } from 'svelte/transition';
	import ChevronUpDown from '$lib/icons/ChevronUpDown.svelte';
	import { Tooltip } from 'flowbite-svelte';
	let { data }: PageProps = $props();

    let cosmeticName = $state("");
    
    const sorts = ["Name", "Rarity", "Trophies"];
    let sortBy = $state(sorts[0]);
    let includeLocked = $state(true)

    function toggleLocked() { includeLocked = !includeLocked }

    const collections = [
        "Natural",
        "Oceanic",
        "Mechanical",
        "Magical",
        "Fishing",
        "Mythic",
        "Arena",
        "Cloudy",
        "Cuckoo",
        "Slimy",
        "Explosive",
        "Ninja",
        "Pose",
        "Hidden",
        "Arcane Gate",
        "Seasonal Variety",
        "Limited Seasonal",
        "Mystical Aquatic",
        "Neon Galaxy",
        "Candy Factory",
        "Ancient Jungle",
        "Cyber Surge",
        "Flex",
        "Special",
        "Limited Special",
        "Particle"
    ];
    let openCollection = $state("");

    const stackedCosmetics = [
        "Faction Flag - Wooden",
        "Faction Flag - Solidified"
    ];
    let hasBeenStacked: string[] = [];
</script>

{#await data.streamed.player then player}
    <div class="border-b border-x border-neutral-800 rounded-b-md">
        {#if player?.collections?.cosmetics}
            {@const styleLevel: { level: number, progressThroughLevel: number, totalForLevel: number } = calculateStyleLevel(player.trophies.style.total) || { level: 0, progressThroughLevel: 0, totalForLevel: 0 }}

            <div class="flex flex-col gap-y-2 p-4">
                <div class="flex justify-center">
                    <div class="w-7/12 flex flex-col items-center p-4">
                        <div class="flex flex-row justify-between w-full">
                            <img src="https://cdn.islandstats.xyz/icons/style_level/{Math.floor(styleLevel.level / 10)}.png" alt={``} class="size-8" />
                            <span class="pl-2 text-xl font-bold self-center">{styleLevel.level}</span>
                    
                            <div class="overflow-hidden rounded-full w-full mx-4 bg-neutral-800 self-center">
                                <div 
                                    class={`h-4 rounded-l-full ${getCrownColour(styleLevel.level)}`} 
                                    style={`width: ${styleLevel.progressThroughLevel / styleLevel.totalForLevel * 100}%`}
                                ></div>
                            </div>
                    
                            <span class="text-xl font-bold self-center">{styleLevel.level + 1}</span>
                        </div>
                        <div class="flex justify-between gap-x-2 text-neutral-500 mt-2 gap-y-1 text-base">
                            <p class="self-center">
                                <span class="text-neutral-300 tabular-nums">
                                    {Math.round((styleLevel.progressThroughLevel / styleLevel.totalForLevel * 100) * 10) / 10}%
                                </span>
                                <span class="text-neutral-300 tabular-nums">
                                    ({styleLevel.progressThroughLevel.toLocaleString()}/{styleLevel.totalForLevel.toLocaleString()})
                                </span>
                            </p>
                            <p> / </p>
                            <p class="flex flex-row gap-x-1.5 items-center">
                                <span class="flex flex-row gap-x-1 text-neutral-300">
                                    <img src={`https://cdn.islandstats.xyz/icons/style_level/${Math.floor(styleLevel.level / 10) + 1}.png`} alt={`Style Level ${Math.floor(styleLevel.level / 10) + 1} Icon`} class="size-5 self-center" />
                                    <span class="font-semibold tabular-nums">{Math.ceil(styleLevel.level / 10) * 10}</span>
                                </span>
                                <span>in</span>
                                <span class="flex flex-row gap-x-1 text-neutral-300">
                                    <img src={`https://cdn.islandstats.xyz/icons/trophies/purple.png`} alt="Trophy Icon" class="size-5 self-center" />
                                    <span class="font-semibold tabular-nums">{(trophiesForStyleLevel(Math.ceil(styleLevel.level / 10) * 10) - player.trophies.style.total).toLocaleString()}</span>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col md:flex-row gap-x-2">
                    <!-- search filter -->
                    <div class="w-1/2 md:w-1/6 flex justify-center gap-x-2 border border-neutral-800 rounded-md hover:bg-neutral-800/60 duration-100 cursor-pointer">
                        <input
                            name="cosmetic"
                            type="text"
                            class="w-full outline-none bg-neutral-950 rounded-md placeholder:text-neutral-400 sm:text-sm"
                            placeholder="Search a cosmetic..."
                            role="combobox"
                            aria-expanded="false"
                            aria-controls="options"
                            bind:value={cosmeticName}
                            autocomplete="off"
                        />
                    </div>

                    <button class="w-1/2 md:w-1/8 border border-neutral-800 rounded-md hover:bg-neutral-800/60 duration-100 cursor-pointer" onclick={toggleLocked}>{includeLocked ? "Show All" : "Show Owned"}</button>
                </div>

                
                {#if cosmeticName.length > 0}
                    <div class="grid grid-col-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
                        {#each player.collections.cosmetics.sort((a: any, b: any) => {
                            if (sortBy === "Name") {
                                return a.cosmetic.name - b.cosmetic.name
                            } else if (sortBy === "Rarity") {
                                return 0
                            } else {
                                return 0
                            }
                        }).filter(c => { 
                            if (cosmeticName.length > 0) { return c.cosmetic.name.toLowerCase().includes(cosmeticName) } else { return true } 
                        }).filter(c => {
                            if (includeLocked) {
                                return true
                            } else {
                                return c.owned
                            }
                        }) as { cosmetic, owned, chromaPacks, donationsMade }}
                            <div class={`flex flex-col gap-y-2 text-base lg:text-lg rounded-md border ${owned ? "bg-green-800/30 border-green-800/80" : "border-neutral-800"}`}>
                                <div class="flex flex-row gap-x-2 p-2">
                                    <div class="flex gap-x-4 min-w-full justify-between">
                                        <div class="flex gap-x-2 text-sm lg:text-base">
                                            <img class="size-12 lg:size-16 self-center" src="https://cdn.islandstats.xyz/cosmetics/{cosmetic.category.toLowerCase()}/{cosmetic.collection.toLowerCase().replaceAll(" ", "_")}/{cosmetic.name.replaceAll(" ", "_")}.png" alt={cosmetic.name} />
                                            <div class="flex flex-col">
                                                <p class="flex gap-x-1 mb-1">
                                                    <span class="font-semibold {getRarityColour(cosmetic.rarity)}">{cosmetic.name}</span>
                                                    <span class="text-neutral-500">•</span>
                                                    <span class="text-neutral-500">{cosmetic.category[0] + cosmetic.category.toLowerCase().slice(1)}</span>
                                                </p>
                                                {#if owned}
                                                    {#if cosmetic.canBeDonated}
                                                        <div class="flex gap-x-1">
                                                            <img src="https://cdn.islandstats.xyz/icons/misc/scavenging.png" alt="Scavenged" class="size-3 md:size-5 self-center" />
                                                            <span class="tabular-nums">{donationsMade || 0} / 10</span>
                                                        </div>
                                                    {:else}
                                                        <div class="flex gap-x-1">
                                                            <img src="https://cdn.islandstats.xyz/icons/misc/scavenging.png" alt="Scavenged" class="size-3 md:size-5 self-center grayscale" />
                                                            <span class="tabular-nums">Cannot be donated</span>
                                                        </div>
                                                    {/if}
                                                {:else}
                                                    <div class="flex gap-x-1">
                                                        <img src="https://cdn.discordapp.com/emojis/1042056408423739492.webp" alt="Scavenged" class="size-3 md:size-5 self-center" />
                                                        <span class="tabular-nums">Not owned</span>
                                                    </div>
                                                {/if}
                                                {#if cosmetic.globalNumberOwned}
                                                    <div class="flex gap-x-1">
                                                        <img src="https://cdn.islandstats.xyz/icons/social/friend.png" alt="Scavenged" class="size-3 md:size-5 self-center" />
                                                        <span class="tabular-nums">{cosmetic.globalNumberOwned.toLocaleString()} owned</span>
                                                    </div>
                                                {/if}
                                            </div>
                                        </div>
                                        <div class="flex flex-col gap-y-1 shrink-0 gap-x-1 self-start">
                                            <div class="flex gap-x-1 {owned ? "bg-green-800" : "bg-neutral-700/50"} rounded-full px-2 py-0.5">
                                                <img src="https://cdn.islandstats.xyz/icons/trophies/{cosmetic.isBonusTrophies ? "silver" : "purple"}.png" alt="Trophies Icon" class="size-6 self-center" />
                                                <p class="text-sm lg:text-base flex self-center">{cosmetic.trophies}</p>
                                            </div>

                                            <div class="grid grid-cols-2 gap-1 self-center">
                                                {#each ["thermal", "verdant", "oceanic", "regal"] as pack}
                                                    <img src="https://cdn.islandstats.xyz/icons/chroma_pack/{pack}.png" alt="{pack} Chroma Pack" class="size-3 lg:size-5 {chromaPacks?.includes(pack) ? "visible" : "invisible"}" />
                                                {/each}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {/each}
                    </div>
                {:else}
                    <div class="flex flex-col gap-y-2">
                        {#each collections as collection}
                            <div class="border {calculatePercentage(
                                player.collections.cosmetics.filter(c => c.cosmetic.collection === collection && c.owned).reduce((acc, c) => acc + c.cosmetic.trophies, 0),
                                player.collections.cosmetics.filter(c => c.cosmetic.collection === collection).reduce((acc, c) => acc + c.cosmetic.trophies, 0)
                            ) === 100 ? "bg-green-800/30 border-green-800/80" : "border-neutral-800"} rounded-md">
                                <button class="w-full cursor-pointer flex justify-between py-3 hover:bg-neutral-800/50 duration-100" onclick={() => {
                                    if (openCollection === collection) {
                                        openCollection = "";
                                    } else {
                                        openCollection = collection;
                                    }
                                }}>
                                    <div class="flex gap-x-2 px-3">
                                        <img src="https://cdn.islandstats.xyz/icons/wardrobe/{collection.toLowerCase().replaceAll(" ", "_")}.png" alt="" class="size-8 self-center" />
                                        <p class="text-lg lg:text-xl font-semibold self-center">{collection}</p>
                                    </div>
                                    <div class="flex gap-x-4 px-3">
                                        <div class="flex gap-x-1 tabular-nums self-center">
                                            <img src="https://cdn.islandstats.xyz/icons/trophies/{player.collections.cosmetics.filter(c => c.cosmetic.collection === collection)[0].cosmetic.isBonusTrophies ? "silver" : "purple"}.png" alt="Cosmetic Trophy Icon" class="size-6 self-center" />
                                            <p class="text-base">
                                                <span>{player.collections.cosmetics.filter(c => c.cosmetic.collection === collection && c.owned).reduce((acc, c) => acc + c.cosmetic.trophies, 0).toLocaleString()}</span>
                                                <span> / </span>
                                                <span>{player.collections.cosmetics.filter(c => c.cosmetic.collection === collection).reduce((acc, c) => acc + c.cosmetic.trophies, 0).toLocaleString()}</span>
                                                <span class="text-neutral-500">({calculatePercentage(
                                                    player.collections.cosmetics.filter(c => c.cosmetic.collection === collection && c.owned).reduce((acc, c) => acc + c.cosmetic.trophies, 0),
                                                    player.collections.cosmetics.filter(c => c.cosmetic.collection === collection).reduce((acc, c) => acc + c.cosmetic.trophies, 0)
                                                )}%)</span>
                                            </p>
                                        </div>
                                        <span class="size-6 lg:size-8 text-neutral-500 self-center mr-2"><ChevronUpDown /></span>
                                    </div>

                                </button>
                                {#if collection === openCollection}
                                    <div transition:slide={{ duration: 200 }} class="text-base lg:text-lg rounded-md border-t border-neutral-800 bg-neutral-900 p-4">
                                        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
                                            {#each player.collections.cosmetics.filter(c =>
                                                // filter by collection
                                                c.cosmetic.collection === collection
                                            ).sort((a, b) => {
                                                // sort by rarity
                                                const rarityOrder = ["COMMON", "UNCOMMON", "RARE", "EPIC", "LEGENDARY"];
                                                return rarityOrder.indexOf(a.cosmetic.rarity) - rarityOrder.indexOf(b.cosmetic.rarity);
                                            }).filter(c => {
                                                // filter by owned
                                                if (includeLocked) {
                                                    return true
                                                } else {
                                                    return c.owned
                                                }
                                            }) as { cosmetic, owned, chromaPacks, donationsMade }}
                                                <div class={`flex flex-col gap-y-2 text-base lg:text-lg rounded-md border ${owned ? "bg-green-800/30 border-green-800/80" : "border-neutral-800"}`}>
                                                    <div class="flex flex-row gap-x-2 p-2">
                                                        <div class="flex gap-x-4 min-w-full justify-between">
                                                            <div class="flex gap-x-2 text-sm lg:text-base">
                                                                <img class="size-12 lg:size-16 self-center" src="https://cdn.islandstats.xyz/cosmetics/{cosmetic.category.toLowerCase()}/{cosmetic.collection.toLowerCase().replaceAll(" ", "_")}/{cosmetic.name.replaceAll(" ", "_")}.png" alt={cosmetic.name} />
                                                                <div class="flex flex-col">
                                                                    <p class="flex gap-x-1 mb-1">
                                                                        <span class="font-semibold {getRarityColour(cosmetic.rarity)}">{cosmetic.name}</span>
                                                                        <span class="text-neutral-500">•</span>
                                                                        <span class="text-neutral-500">{cosmetic.category[0] + cosmetic.category.toLowerCase().slice(1)}</span>
                                                                    </p>
                                                                    {#if owned}
                                                                        {#if cosmetic.canBeDonated}
                                                                            <div class="flex gap-x-1">
                                                                                <img src="https://cdn.islandstats.xyz/icons/misc/scavenging.png" alt="Scavenged" class="size-3 md:size-5 self-center" />
                                                                                <span class="tabular-nums">{donationsMade || 0} / 10</span>
                                                                            </div>
                                                                        {:else}
                                                                            <div class="flex gap-x-1">
                                                                                <img src="https://cdn.islandstats.xyz/icons/misc/scavenging.png" alt="Scavenged" class="size-3 md:size-5 self-center grayscale" />
                                                                                <span class="tabular-nums">Cannot be donated</span>
                                                                            </div>
                                                                        {/if}
                                                                    {:else}
                                                                        <div class="flex gap-x-1">
                                                                            <img src="https://cdn.discordapp.com/emojis/1042056408423739492.webp" alt="Scavenged" class="size-3 md:size-5 self-center" />
                                                                            <span class="tabular-nums">Not owned</span>
                                                                        </div>
                                                                    {/if}
                                                                    {#if cosmetic.globalNumberOwned}
                                                                        <div class="flex gap-x-1">
                                                                            <img src="https://cdn.islandstats.xyz/icons/social/friend.png" alt="Scavenged" class="size-3 md:size-5 self-center" />
                                                                            <span class="tabular-nums">{cosmetic.globalNumberOwned.toLocaleString()} owned</span>
                                                                        </div>
                                                                    {/if}
                                                                </div>
                                                            </div>
                                                            <div class="flex flex-col gap-y-1 shrink-0 gap-x-1 self-start">
                                                                <div class="flex gap-x-1 {owned ? "bg-green-800" : "bg-neutral-700/50"} rounded-full px-2 py-0.5">
                                                                    <img src="https://cdn.islandstats.xyz/icons/trophies/{cosmetic.isBonusTrophies ? "silver" : "purple"}.png" alt="Trophies Icon" class="size-6 self-center" />
                                                                    <p class="text-sm lg:text-base flex self-center">{cosmetic.trophies}</p>
                                                                </div>

                                                                <div class="grid grid-cols-2 gap-1 self-center">
                                                                    {#each ["thermal", "verdant", "oceanic", "regal"] as pack}
                                                                        <img src="https://cdn.islandstats.xyz/icons/chroma_pack/{pack}.png" alt="{pack} Chroma Pack" class="size-3 lg:size-5 cursor-pointer {chromaPacks?.includes(pack) ? "" : "grayscale"}" />
                                                                        <Tooltip arrow={false} type="custom" placement="top" class="text-sm border {chromaPacks?.includes(pack) ? "text-green-600 border-green-800" : "!border-neutral-700"} !bg-neutral-900 px-2 py-0.5 rounded-md">
                                                                            {pack[0].toUpperCase() + pack.slice(1) + " Chroma"}
                                                                        </Tooltip>
                                                                    {/each}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            {/each}
                                        </div>
                                    </div>
                                {/if}
                            </div>
                        {/each}
                    </div>
                {/if}
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