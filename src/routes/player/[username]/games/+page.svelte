<script lang="ts">
    import ChevronUpDown from '$lib/icons/ChevronUpDown.svelte';
	import { slide } from 'svelte/transition';
    import type { PageProps } from './$types';
	import General from '$lib/blocks/games/General.svelte';
	import BattleBox from '$lib/blocks/games/BattleBox.svelte';
	import SkyBattle from '$lib/blocks/games/SkyBattle.svelte';
	import Tgttos from '$lib/blocks/games/Tgttos.svelte';
	import Hitw from '$lib/blocks/games/Hitw.svelte';
	import Dynaball from '$lib/blocks/games/Dynaball.svelte';
	import Dojo from '$lib/blocks/games/Dojo.svelte';
	import Survivor from '$lib/blocks/games/Survivor.svelte';
	import RocketSpleef from '$lib/blocks/games/RocketSpleef.svelte';
	import { onMount } from 'svelte';
	let { data }: PageProps = $props();

    let expandedSection: string | null = $state(null);

    onMount(async () => {
        const player = await data.streamed.player;
        const recentSearches = localStorage.getItem("searches")?.split(",") || [];

        if (!recentSearches.includes(`${player?.username}:${player?.uuid}`)) {
            if (recentSearches.length >= 5) {
                recentSearches.pop();
            }
            recentSearches.unshift(`${player?.username}:${player?.uuid}`);
        } else {
            recentSearches.splice(recentSearches.indexOf(`${player?.username}:${player?.uuid}`), 1);
            recentSearches.unshift(`${player?.username}:${player?.uuid}`);
        }
        localStorage.setItem("searches", recentSearches.join(","));
    });
</script>

{#await data.streamed.player then player}
    <div class="border-b border-x border-neutral-800 rounded-b-md">
        {#if player?.statistics}
            <div class="flex flex-col gap-y-2 p-4">
                {#each [
                    { label: "General", icon: "games/lobby/icon" },
                    { label: "Battle Box", icon: "games/battle_box/icon" },
                    { label: "Sky Battle", icon: "games/sky_battle/icon" },
                    { label: "To Get To The Other Side", icon: "games/tgttos/icon" },
                    { label: "Hole in the Wall", icon: "games/hitw/icon" },
                    { label: "Dynaball", icon: "games/dynaball/icon" },
                    { label: "Parkour Warrior Dojo", icon: "games/parkour_warrior/solo/icon" },
                    { label: "Parkour Warrior Survivor", icon: "games/parkour_warrior/icon" },
                    { label: "Rocket Spleef Rush", icon: "games/rocket_spleef/icon" }
                ] as { label: string, icon: string, component: any }[] as game}
                    <div class="border border-neutral-800 rounded-md">
                        <button onclick={() => { if (expandedSection === game.label) expandedSection = null; else expandedSection = game.label; }} class="w-full cursor-pointer flex flex-row justify-between hover:bg-neutral-800/50 duration-100">
                            <div class="flex flex-row gap-x-2 p-3">
                                <img src={`https://cdn.islandstats.xyz/${game.icon}.png`} alt={``} class="size-6 lg:size-8"/>
                                <p class="text-base lg:text-xl font-semibold self-center">{game.label}</p>
                            </div>
                            <span class="size-8 text-neutral-500 self-center mr-2"><ChevronUpDown /></span>
                        </button>
                        {#if expandedSection === game.label}
                            <div transition:slide={{ duration: 200 }}>
                                {#if expandedSection === "General"}
                                    <General {player} />
                                {:else if expandedSection === "Battle Box"}
                                    <BattleBox stats={player.statistics.battle_box} />
                                {:else if expandedSection === "Sky Battle"}
                                    <SkyBattle stats={player.statistics.sky_battle.quads} />
                                {:else if expandedSection === "To Get To The Other Side"}
                                    <Tgttos stats={player.statistics.tgttos} />
                                {:else if expandedSection === "Hole in the Wall"}
                                    <Hitw stats={player.statistics.hitw} />
                                {:else if expandedSection === "Dynaball"}
                                    <Dynaball stats={player.statistics.dynaball} />
                                {:else if expandedSection === "Parkour Warrior Dojo"}
                                    <Dojo stats={player.statistics.pkw.dojo} />
                                {:else if expandedSection === "Parkour Warrior Survivor"}
                                    <Survivor stats={player.statistics.pkw.survivor} />
                                {:else if expandedSection === "Rocket Spleef Rush"}
                                    <RocketSpleef stats={player.statistics.rocket_spleef} />
                                {/if}
                            </div>
                        {/if}
                    </div>
                {/each}
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