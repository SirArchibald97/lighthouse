<script lang="ts">
	import type { Player } from "$lib/types";
	import { calculatePercentage, getCrownColour, getCrownColourHex } from "$lib/utils";

    const { player, collection }: { player: Player, collection: string } = $props();
    const cosmetics = player.collections!.cosmetics.filter(c => c.cosmetic.collection === collection);
    const earnedRep = cosmetics!.reduce((acc, c) => acc + ((c.cosmetic.royalReputation?.reputationAmount || 0) * c.donationsMade), 0) || 0;
    const totalRep = cosmetics!.reduce((acc, c) => acc + ((c.cosmetic.royalReputation?.reputationAmount || 0) * (c.cosmetic.royalReputation?.donationLimit || 10)), 0) || 0;
</script>

<div class="w-full flex flex-col lg:grid lg:grid-cols-3 gap-2">
    <!-- TROPHIES -->
    <div class="flex gap-x-4 bg-neutral-900 rounded-md p-2">
        <span 
            class="flex justify-center items-center size-14 lg:size-18 bg-neutral-100 rounded-full {getCrownColour(player.crownLevel.levelData.level)}"  
            style="background: conic-gradient({getCrownColourHex(player.crownLevel.levelData.level)} {Math.floor((cosmetics!.filter(c => c.owned).reduce((acc, c) => acc + c.cosmetic.trophies, 0) / cosmetics!.reduce((acc, c) => acc + c.cosmetic.trophies, 0)) * 360)}deg, oklch(0.269 0 0) 0deg)"
        >
            <span class="flex justify-center items-center size-10 lg:size-14 bg-neutral-900 rounded-full">
                <img src="https://cdn.islandstats.xyz/icons/trophies/{cosmetics![0].cosmetic.isBonusTrophies ? "silver" : "purple"}.png" alt="Style Trophy Icon" class="size-6 lg:size-8" />
            </span>
        </span>
        <div class="self-center">
            <p class="text-base lg:text-lg font-semibold">{cosmetics![0].cosmetic.isBonusTrophies ? "Bonus" : "Style"} Trophies</p>
            <div class="flex gap-x-1 tabular-nums">
                <img src="https://cdn.islandstats.xyz/icons/trophies/{cosmetics![0].cosmetic.isBonusTrophies ? "silver" : "purple"}.png" alt="Style Trophy Icon" class="size-6 self-center" />
                <p class="text-base tabular-nums">
                    <span>{cosmetics!.filter(c => c.owned).reduce((acc, c) => acc + c.cosmetic.trophies, 0).toLocaleString()}</span>
                    <span> / </span>
                    <span>{cosmetics!.reduce((acc, c) => acc + c.cosmetic.trophies, 0).toLocaleString()}</span>
                    <span class="text-neutral-500">({calculatePercentage(
                        cosmetics!.filter(c => c.owned).reduce((acc, c) => acc + c.cosmetic.trophies, 0),
                        cosmetics!.reduce((acc, c) => acc + c.cosmetic.trophies, 0)
                    )}%)</span>
                </p>
            </div>
        </div>
    </div>

    <!-- ROYAL REP -->
    <div class="flex gap-x-4 bg-neutral-900 rounded-md p-2">
        <span 
            class="flex justify-center items-center size-14 lg:size-18 bg-neutral-100 rounded-full {getCrownColour(player.crownLevel.levelData.level)}"  
            style="background: conic-gradient({getCrownColourHex(player.crownLevel.levelData.level)} {Math.floor((earnedRep / totalRep) * 360)}deg, oklch(0.269 0 0) 0deg)"
        >
            <span class="flex justify-center items-center size-10 lg:size-14 bg-neutral-900 rounded-full">
                <img src="https://cdn.islandstats.xyz/icons/currency/royal_reputation.png" alt="Royal Reputation Icon" class="size-6 lg:size-8" />
            </span>
        </span>
        <div class="self-center">
            <p class="text-base lg:text-lg font-semibold">Royal Reputation</p>
            <div class="flex gap-x-1 tabular-nums">
                <img src="https://cdn.islandstats.xyz/icons/currency/royal_reputation.png" alt="Royal Reputation Icon" class="size-6 self-center" />
                <p class="text-base tabular-nums">
                    <span>{earnedRep.toLocaleString()}</span>
                    <span> / </span>
                    <span>{totalRep.toLocaleString()}</span>
                    <span class="text-neutral-500">({calculatePercentage(earnedRep, totalRep) || 100}%)</span>
                </p>
            </div>
        </div>
    </div>

    <!-- CHROMAS -->
    <div class="flex gap-x-4 bg-neutral-900 rounded-md p-2">
        <span 
            class="flex justify-center items-center size-14 lg:size-18 bg-neutral-100 rounded-full {getCrownColour(player.crownLevel.levelData.level)}"  
            style="background: conic-gradient({getCrownColourHex(player.crownLevel.levelData.level)} {Math.floor((cosmetics!.filter(c => c.owned && c.cosmetic.colorable && c.chromaPacks.length === 4).length / cosmetics!.filter(c => c.cosmetic.colorable).length) * 360)}deg, oklch(0.269 0 0) 0deg)"
        >
            <span class="flex justify-center items-center size-10 lg:size-14 bg-neutral-900 rounded-full">
                <img src="https://cdn.islandstats.xyz/icons/chroma_pack/prismatic.webp" alt="Chroma Icon" class="size-6 lg:size-8" />
            </span>
        </span>
        <div class="self-center">
            <p class="text-base lg:text-lg font-semibold">Full Chromas</p>
            <div class="flex gap-x-1 tabular-nums">
                <p class="text-base tabular-nums">
                    <span>{cosmetics!.filter(c => c.owned && c.cosmetic.colorable && c.chromaPacks.length === 4).length.toLocaleString()}</span>
                    <span> / </span>
                    <span>{(cosmetics!.filter(c => c.cosmetic.colorable).length).toLocaleString()}</span>
                    <span class="text-neutral-500">({calculatePercentage(
                        cosmetics!.filter(c => c.owned && c.cosmetic.colorable && c.chromaPacks.length === 4).length,
                        cosmetics!.filter(c => c.cosmetic.colorable).length
                    ) || 100}%)</span>
                </p>
            </div>
        </div>
    </div>
</div>