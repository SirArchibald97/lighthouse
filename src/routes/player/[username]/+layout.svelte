<script lang="ts">
    import { page } from '$app/state';
	import Loader from '$lib/blocks/Loader.svelte';
    import Error from '$lib/blocks/Error.svelte';
    import wardrobe from "$lib/images/wardrobe.png";
	import type { LayoutProps } from './$types';
	import PlayerCard from '$lib/blocks/player/PlayerCard.svelte';
	import InfoCard from '$lib/blocks/player/InfoCard.svelte';
	import SocialCard from '$lib/blocks/player/SocialCard.svelte';
	let { data, children }: LayoutProps = $props();
</script>

<svelte:head>
	{#await data.streamed.player}
		<title>Fetching player...</title>
	{:then player}
		<title>{player?.username} • Lighthouse</title>
		<link rel="icon" href={`https://mc-heads.net/avatar/${player?.uuid}/128`} />
	{:catch error}
		<title>Error!</title>
	{/await}
</svelte:head>
<div>
	<div class="flex justify-center items-center mx-4 lg:mx-44 my-4">
		{#await data.streamed.player}
			<Loader />
		{:then player}
            {#if !player}
                <p>No player found!</p>
            {:else}
                <div class="animate-fade w-full flex flex-col">
                    <div class="flex flex-col xl:flex-row gap-4">
                        <div class="w-full xl:w-1/3 flex flex-col gap-y-4">
                            <PlayerCard {player} />
                            <InfoCard {player} />
                        </div>
                        <div class="w-full xl:w-2/3">
                            <SocialCard {player} />
                        </div>
                    </div>

                    <div class="flex flex-row gap-x-8 px-4 mt-4 border border-neutral-800 rounded-t-md *:duration-75">
                        {#each [
                            { label: "Games", href: "games", icon: "emojis/crown", alt: "Crown" },
                            { label: "Trophy Hunting", href: "hunting", icon: "icons/trophies/yellow", alt: "Trophy" },
                            { label: "Fishing", href: "fishing", icon: "games/fishing/icon", alt: "Fishing Rod" },
                            { label: "Wardrobe", href: "wardrobe", icon: wardrobe, alt: "Wardrobe" }
                        ] as { label: string, href: string, icon: string, alt: string }[] as tab}
                            <a
                                href={tab.href}
                                class={`inline-flex items-center border-b-3 px-3 pt-4 pb-3 text-md font-medium ${page.url.pathname.split("/")[3] === tab.href ? "border-neutral-50 text-neutral-50" : "border-transparent text-neutral-400 hover:border-neutral-100 hover:text-neutral-100"}`}
                            >
                                <span class="flex flex-row gap-x-2">
                                    <img src={tab.icon.startsWith("/") ? tab.icon : `https://cdn.islandstats.xyz/${tab.icon}.png`} alt={`${tab.alt} Icon`} class="size-6" />
                                    <span>{tab.label}</span>
                                </span>
                            </a>
                        {/each}
                    </div>
                    <div>
                        {@render children()}
                    </div>
                </div>
            {/if}
		{:catch error}
			<Error />
		{/await}
	</div>
</div>
