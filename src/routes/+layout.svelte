<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import Header from '$lib/blocks/Header.svelte';
	import Footer from '$lib/blocks/Footer.svelte';
	import Announcement from '$lib/blocks/Announcement.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="https://cdn.islandstats.xyz/emojis/crown.png" />
	<title>Lighthouse by SirArchibald</title>
</svelte:head>
<div class="flex min-h-screen flex-col bg-neutral-900 text-neutral-50">
	<Header />

	<div class="flex-1">
		{#if page.url.hostname === 'www.lighthouse.gay' || page.url.hostname === 'localhost'}
			<Announcement colour="green">
				🎉 Thanks to a generous donation from Kezz the goat, lighthouse.gay is back for another
				year!
			</Announcement>
		{/if}

		{@render children()}
	</div>

	<Footer />
</div>
