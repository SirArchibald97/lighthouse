<script lang="ts">
	import Loader from '$lib/blocks/Loader.svelte';
    import Error from '$lib/blocks/Error.svelte';
    
	import type { LayoutProps } from './$types';
	import PlayerCard from '$lib/blocks/player/PlayerCard.svelte';
	import TrophiesCard from '$lib/blocks/player/TrophiesCard.svelte';
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
	<div class="flex justify-center items-center mx-48 my-4">
		{#await data.streamed.player}
			<Loader />
		{:then player}
            {#if !player}
                <p>No player found!</p>
            {:else}
                <div class="w-full animate-fade flex flex-row">
                    <div class="w-1/4 flex flex-col gap-4">
                        <PlayerCard {player} />
                        <TrophiesCard {player} />
                    </div>
                    <div class="w-3/4">
                        {@render children()}
                    </div>
                </div>
            {/if}
		{:catch error}
			<Error />
		{/await}
	</div>
</div>
