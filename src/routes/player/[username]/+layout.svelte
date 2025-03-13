<script lang="ts">
    import Header from '$lib/blocks/Header.svelte';
	import Loader from '$lib/blocks/Loader.svelte';
    import Error from '$lib/blocks/Error.svelte';
    
	import type { LayoutProps } from './$types';
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
	<Header />

	<div class="flex justify-center items-center">
		{#await data.streamed.player}
			<Loader />
		{:then player}
			<p class="animate-fade">{player?.username}</p>
		{:catch error}
			<Error />
		{/await}
	</div>

	{@render children()}
</div>
