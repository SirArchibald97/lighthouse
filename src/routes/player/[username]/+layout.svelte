<script lang="ts">
	import { page } from '$app/state';
	import Loader from '$lib/blocks/Loader.svelte';
	import Error from '$lib/blocks/Error.svelte';
	import type { LayoutProps } from './$types';
	import PlayerCard from '$lib/blocks/player/PlayerCard.svelte';
	import ChevronUpDown from '$lib/icons/ChevronUpDown.svelte';
	import { slide } from 'svelte/transition';
	import { onMount } from 'svelte';
	import OverviewCard from '$lib/blocks/player/OverviewCard.svelte';
	let { data, children }: LayoutProps = $props();

	const tabs = [
		{ label: 'Games', href: 'games', icon: 'emojis/crown', alt: 'Crown' },
		{ label: 'Trophy Hunting', href: 'hunting', icon: 'icons/trophies/yellow', alt: 'Trophy' },
		{ label: 'Fishing', href: 'fishing', icon: 'games/fishing/icon', alt: 'Fishing Rod' },
		{ label: 'Wardrobe', href: 'wardrobe', icon: 'icons/style_level/9', alt: 'Wardrobe' },
		{
			label: 'Infinibag',
			href: 'infinibag',
			icon: 'icons/blueprint/cosmetic_common',
			alt: 'Infinibag'
		},
		{ label: 'Factions', href: 'factions', icon: 'icons/misc/factions', alt: 'Factions' },
		{ label: 'Socials', href: 'social', icon: 'icons/social/friend', alt: 'Socials' }
	];

	let selectMenuOpen = $state(false);
	let currentTab = $state(tabs[0]);

	onMount(async () => {
		const currentUrlUsername = page.url.pathname.split('/')[2];
		const player = await data.streamed.player;

		if (currentUrlUsername !== player?.username && player) {
			window.history.replaceState(window.history.state, '', `/player/${player?.username}/games`);
		}
	});
</script>

<svelte:head>
	{#await data.streamed.player}
		<title>Fetching player...</title>
	{:then player}
		<title>{player?.username} • Lighthouse</title>
		<link rel="icon" href="https://mc-heads.net/avatar/{player?.uuid}.png" />
	{:catch error}
		<title>Error!</title>
	{/await}
</svelte:head>
<div>
	<div class="mx-4 my-4 flex items-center justify-center md:mx-24 xl:mx-44">
		{#await data.streamed.player}
			<Loader />
		{:then player}
			{#if !player}
				<p>No player found!</p>
			{:else}
				<div class="flex w-full flex-col">
					<div class="flex flex-col gap-4">
						<PlayerCard {player} />
						<OverviewCard {player} />
					</div>

					<div
						class="mt-4 hidden gap-x-8 rounded-t-md border border-neutral-800 *:duration-75 lg:flex lg:px-4"
					>
						{#each tabs as tab}
							<a
								href={tab.href}
								class={`text-md items-center border-b-3 px-3 pt-4 pb-3 font-medium ${page.url.pathname.split('/')[3] === tab.href ? 'border-neutral-50 text-neutral-50' : 'border-transparent text-neutral-400 hover:border-neutral-100 hover:text-neutral-100'}`}
							>
								<span class="flex flex-row gap-x-2">
									<img
										src={tab.icon.startsWith('/')
											? tab.icon
											: `https://cdn.islandstats.xyz/${tab.icon}.png`}
										alt={`${tab.alt} Icon`}
										class="size-6"
									/>
									<span>{tab.label}</span>
								</span>
							</a>
						{/each}
					</div>

					<!-- DROP DOWN FOR MOBILE -->
					<div
						class="mt-4 flex flex-col divide-y divide-neutral-800 rounded-t-md border border-neutral-800 lg:hidden"
					>
						<button
							type="button"
							onclick={() => (selectMenuOpen = !selectMenuOpen)}
							class="flex w-full cursor-pointer justify-between p-4 text-neutral-200"
						>
							<div>
								<p class="flex gap-x-2">
									<img
										src={currentTab?.icon.startsWith('/')
											? currentTab.icon
											: `https://cdn.islandstats.xyz/${currentTab?.icon}.png`}
										alt={`${currentTab?.alt} Icon`}
										class="size-6"
									/>
									<span class="self-center text-lg">{currentTab?.label}</span>
								</p>
							</div>
							<span class="size-6 text-neutral-500"><ChevronUpDown /></span>
						</button>
						{#if selectMenuOpen}
							<div
								transition:slide={{ duration: 100 }}
								class="flex flex-col justify-center gap-y-3 p-4"
							>
								{#each tabs as tab}
									<a
										onclick={() => {
											selectMenuOpen = false;
											currentTab = tab;
										}}
										href={tab.href}
										class="text-lg"
										aria-current="page"
									>
										<p class="flex gap-x-2">
											<img
												src={`https://cdn.islandstats.xyz/${tab.icon}.png`}
												alt={`${tab.alt} Icon`}
												class="size-6"
											/>
											<span class="self-center">{tab.label}</span>
										</p>
									</a>
								{/each}
							</div>
						{/if}
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
