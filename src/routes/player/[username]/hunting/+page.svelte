<script lang="ts">
	import { badges } from '$lib/badges';
	import ChevronUpDown from '$lib/icons/ChevronUpDown.svelte';
    import type { PageProps } from './$types';
	import HuntingBadges from '$lib/blocks/games/HuntingBadges.svelte';
	import ChevronRight from '$lib/icons/ChevronRight.svelte';
	import ChevronDoubleRight from '$lib/icons/ChevronDoubleRight.svelte';
	import AllHuntingBadges from '$lib/blocks/games/AllHuntingBadges.svelte';
	import ChartBar from '$lib/icons/ChartBar.svelte';
	let { data }: PageProps = $props();

    const games = [
        { label: "All Games", icon: "lobby" },
        { label: "Battle Box", icon: "battle_box" },
        { label: "Sky Battle", icon: "sky_battle" },
        { label: "TGTTOS", icon: "tgttos" },
        { label: "HITW", icon: "hitw" },
        { label: "Dynaball", icon: "dynaball" },
        { label: "PKW Dojo", icon: "parkour_warrior/solo" },
        { label: "PKW Survivor", icon: "parkour_warrior" },
        { label: "Rocket Spleef", icon: "rocket_spleef" }
    ] as { label: string, icon: string }[];

    let gameFilter = $state(games[0]);
    let showFilterDropdown = $state(false);

    let forNextTier = $state(true);

    const orders = ["Games Left", "Stats Left", "Trophies"];
    let order = $state(orders[0]);
    function cycleOrder() {
        const currentIndex = orders.indexOf(order);
        const nextIndex = (currentIndex + 1) % orders.length;
        order = orders[nextIndex];
    }
</script>

{#await data.streamed.player then player}
    <div class="border-b border-x border-neutral-800 rounded-b-md">
        {#if player?.statistics}
            <div class="flex flex-col gap-y-2 p-4">
                <div class="flex flex-col md:flex-row justify-between pb-4">
                    <div class="pl-1">
                        <p class="text-xl font-semibold">Recommended Badges</p>
                        <p class="text-base text-neutral-400">Which tiered badges are you closest to completing?</p>
                    </div>

                    <div class="mt-4 md:mt-0 w-full md:w-auto flex flex-col md:flex-row gap-y-2 gap-x-4 self-start">
                        <div class="flex gap-x-2">
                            <!-- tier -->
                            <button onclick={() => forNextTier = !forNextTier} class="w-1/2 md:w-auto flex justify-center gap-x-2 px-2 py-2 border border-neutral-800 rounded-md hover:bg-neutral-800/60 duration-100 cursor-pointer">
                                <span class="size-5 self-center">{#if forNextTier}<ChevronRight />{:else}<ChevronDoubleRight />{/if}</span>
                                <p class="self-center">{forNextTier ? "Next" : "Final"} Tier</p>
                            </button>

                            <!-- order -->
                            <button onclick={cycleOrder} class="w-1/2 md:w-auto flex justify-center gap-x-2 px-2 py-2 border border-neutral-800 rounded-md hover:bg-neutral-800/60 duration-100 cursor-pointer">
                                <span class="size-5 self-center">
                                    {#if order === "Games Left"}
                                        <ChartBar />
                                    {:else if order === "Stats Left"}
                                        <ChartBar />
                                    {:else if order === "Trophies"}
                                        <img src="https://cdn.islandstats.xyz/icons/trophies/red.png" alt="Trophies Icon" class="size-5 self-center" />
                                    {/if}
                                </span>
                                <p class="self-center">{order}</p>
                            </button>
                        </div>

                        <!-- game filter -->
                        <div class={`w-full md:w-64 relative z-10 border border-neutral-800 ${showFilterDropdown ? "rounded-t-md" : "rounded-md"}`}>
                            <button onclick={() => showFilterDropdown = !showFilterDropdown } class="w-full h-full flex gap-x-12 justify-between px-1 py-2 cursor-pointer hover:bg-neutral-800/50 duration-100">
                                <div class="flex gap-x-2 pl-2">
                                    <img src={`https://cdn.islandstats.xyz/games/${gameFilter.icon}/icon.png`} alt={`${gameFilter.label} Icon`} class="size-6 self-center" />
                                    <span class="text-base font-semibold self-center">{gameFilter.label}</span>
                                </div>
                                <span class="text-neutral-500 size-6 self-center"><ChevronUpDown /></span>
                            </button>
                            {#if showFilterDropdown}
                                <div class="absolute grid grid-cols-3 items-center justify-center p-2 gap-2 w-full bg-neutral-900 border border-neutral-800 rounded-b-md">
                                    {#each games as game}
                                        <button onclick={() => { gameFilter = game; showFilterDropdown = false; }} class="flex justify-center rounded-md py-2 items-center border border-neutral-800 hover:bg-neutral-800/50 duration-100 cursor-pointer">
                                            <img src={`https://cdn.islandstats.xyz/games/${game.icon}/icon.png`} alt={`${game.label} Icon`} class="size-6 self-center" />
                                        </button>
                                    {/each}
                                </div>
                            {/if}
                        </div>
                    </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {#if gameFilter.label === "All Games"}
                        <AllHuntingBadges player={player} {forNextTier} sortedBy={order} all={true} 
                            badges={
                                badges.battle_box_tiered
                                .concat(badges.sky_battle_tiered)
                                .concat(badges.tgttos_tiered)
                                .concat(badges.hitw_tiered)
                                .concat(badges.dynaball_tiered)
                                .concat(badges.dojo_tiered)
                                .concat(badges.survivor_tiered)
                                .concat(badges.rocket_spleef_tiered)
                            }
                        />

                    {:else if gameFilter.label === "Battle Box"}
                        <HuntingBadges stats={player.statistics.battle_box} badges={badges.battle_box_tiered} gameIcon="battle_box" {forNextTier} sortedBy={order} all={false} />
                    {:else if gameFilter.label === "Sky Battle"}
                        <HuntingBadges stats={player.statistics.sky_battle.quads} badges={badges.sky_battle_tiered} gameIcon="sky_battle" {forNextTier} sortedBy={order} all={false} />
                    {:else if gameFilter.label === "TGTTOS"}
                        <HuntingBadges stats={player.statistics.tgttos} badges={badges.tgttos_tiered} gameIcon="tgttos" {forNextTier} sortedBy={order} all={false} />
                    {:else if gameFilter.label === "HITW"}
                        <HuntingBadges stats={player.statistics.hitw} badges={badges.hitw_tiered} gameIcon="hitw" {forNextTier} sortedBy={order} all={false} />
                    {:else if gameFilter.label === "Dynaball"}
                        <HuntingBadges stats={player.statistics.dynaball} badges={badges.dynaball_tiered} gameIcon="dynaball" {forNextTier} sortedBy={order} all={false} />
                    {:else if gameFilter.label === "PKW Dojo"}
                        <HuntingBadges stats={player.statistics.pkw.dojo} badges={badges.dojo_tiered} gameIcon="parkour_warrior/solo" {forNextTier} sortedBy={order} all={false} />
                    {:else if gameFilter.label === "PKW Survivor"}
                        <HuntingBadges stats={player.statistics.pkw.survivor} badges={badges.survivor_tiered} gameIcon="parkour_warrior" {forNextTier} sortedBy={order} all={false} />
                    {:else if gameFilter.label === "Rocket Spleef"}
                        <HuntingBadges stats={player.statistics.rocket_spleef} badges={badges.rocket_spleef_tiered} gameIcon="rocket_spleef" {forNextTier} sortedBy={order} all={false} />
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
                    <p class="text-lg">Statistics are disabled!</p>
                </div>
            </div>
        {/if}
    </div>
{/await}