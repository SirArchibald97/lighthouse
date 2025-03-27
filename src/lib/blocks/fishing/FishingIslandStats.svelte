<script lang="ts">
	import type { Player } from "$lib/types";
	import { calculatePercentage, caughtWeightsForIsland, earnedTrophiesForIsland, getCrownColour, getCrownColourHex, totalTrophiesForIsland } from "$lib/utils";

    const { player, collection }: { player: Player, collection: { name: string, climate: string, icon: string, level: number, type: "fish" | "crab" } } = $props();
</script>

<div class="w-full flex flex-col lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-4 pb-4">
    <!-- TROPHIES -->
    <div class="flex gap-x-4 border border-neutral-800 rounded-md p-2">
        <span 
            class={`flex justify-center items-center size-14 lg:size-18 bg-neutral-100 rounded-full ${getCrownColour(player.crownLevel.fishingLevelData.level)}`}  
            style={`background: conic-gradient(${getCrownColourHex(player.crownLevel.fishingLevelData.level)} ${Math.floor((earnedTrophiesForIsland(player.collections!.fish, collection.name) / totalTrophiesForIsland(player.collections!.fish, collection.name)) * 360)}deg, oklch(0.269 0 0) 0deg)`}
        >
            <span class="flex justify-center items-center size-10 lg:size-14 bg-neutral-900 rounded-full">
                <img src="https://cdn.islandstats.xyz/icons/trophies/blue.png" alt="Angler Trophy Icon" class="size-6 lg:size-8" />
            </span>
        </span>
        <div class="self-center">
            <p class="text-base lg:text-lg font-semibold">Angler Trophies</p>
            <div class="flex gap-x-1 tabular-nums">
                <img src="https://cdn.islandstats.xyz/icons/trophies/blue.png" alt="Skill Trophy Icon" class="size-6 self-center" />
                <p class="text-base">
                    <span>{earnedTrophiesForIsland(player.collections!.fish, collection.name).toLocaleString()}</span>
                    <span> / </span>
                    <span>{totalTrophiesForIsland(player.collections!.fish, collection.name).toLocaleString()}</span>
                    <span class="text-neutral-500">({calculatePercentage(
                        earnedTrophiesForIsland(player.collections!.fish, collection.name),
                        totalTrophiesForIsland(player.collections!.fish, collection.name)
                    )}%)</span>
                </p>
            </div>
        </div>
    </div>

    <!-- FISH CAUGHT -->
    <div class="flex gap-x-4 border border-neutral-800 rounded-md p-2">
        <span 
            class={`flex justify-center items-center size-14 lg:size-18 bg-neutral-100 rounded-full ${getCrownColour(player.crownLevel.fishingLevelData.level)}`}  
            style={`background: conic-gradient(${getCrownColourHex(player.crownLevel.fishingLevelData.level)} ${Math.floor((player.collections!.fish.filter(f => f.fish.collection === collection.name && f.weights.length > 0).length / player.collections!.fish.filter(f => f.fish.collection === collection.name).length) * 360)}deg, oklch(0.269 0 0) 0deg)`}
        >
            <span class="flex justify-center items-center size-10 lg:size-14 bg-neutral-900 rounded-full">
                <img src="https://cdn.islandstats.xyz/games/fishing/icon.png" alt="Fishing Game Icon" class="size-6 lg:size-8" />
            </span>
        </span>
        <div class="self-center">
            <p class="text-base lg:text-lg font-semibold">Fish Caught</p>
            <div class="flex gap-x-2 tabular-nums">
                <p class="text-base">
                    <span>{player.collections!.fish.filter(f => f.fish.collection === collection.name && f.weights.length > 0).length}</span>
                    <span> / </span>
                    <span>{player.collections!.fish.filter(f => f.fish.collection === collection.name).length}</span>
                    <span class="text-neutral-500">({calculatePercentage(
                        player.collections!.fish.filter(f => f.fish.collection === collection.name && f.weights.length > 0).length,
                        player.collections!.fish.filter(f => f.fish.collection === collection.name).length
                    )}%)</span>
                </p>
            </div>
        </div>
    </div>

    <!-- WEIGHTS CAUGHT -->
    <div class="flex gap-x-4 border border-neutral-800 rounded-md p-2">
        <span 
            class={`flex justify-center items-center size-14 lg:size-18 bg-neutral-100 rounded-full ${getCrownColour(player.crownLevel.fishingLevelData.level)}`}  
            style={`background: conic-gradient(${getCrownColourHex(player.crownLevel.fishingLevelData.level)} ${Math.round(caughtWeightsForIsland(player.collections!.fish, collection.name) / (player.collections!.fish.filter(f => f.fish.collection === collection.name).length * (collection.type === "crab" ? 3 : 4)) * 360)}deg, oklch(0.269 0 0) 0deg)`}
        >
            <span class="flex justify-center items-center size-10 lg:size-14 bg-neutral-900 rounded-full">
                <img src="https://cdn.islandstats.xyz/fishing/stars/gargantuan.png" alt="Gargantuan Red Star Icon" class="size-6 lg:size-8" />
            </span>
        </span>
        <div class="self-center">
            <p class="text-base lg:text-lg font-semibold">Weights Caught</p>
            <div class="flex gap-x-2 tabular-nums">
                <p class="text-base">
                    <span>{caughtWeightsForIsland(player.collections!.fish, collection.name)}</span>
                    <span> / </span>
                    <span>{player.collections!.fish.filter(f => f.fish.collection === collection.name).length * (collection.type === "fish" ? 4 : 3)}</span>
                    <span class="text-neutral-500">({calculatePercentage(
                        caughtWeightsForIsland(player.collections!.fish, collection.name),
                        player.collections!.fish.filter(f => f.fish.collection === collection.name).length * (collection.type === "fish" ? 4 : 3)
                    )}%)</span>
                </p>
            </div>
        </div>
    </div>
</div>