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
		{#if page.url.hostname === 'lighthouse.gay' || page.url.hostname === 'localhost'}
			<Announcement>
				The domain <b>lighthouse.gay</b> will be unsupported after Dec 30th 2025. Please switch back
				to
				<b
					><a class="text-blue-200 underline" href="https://stats.sirarchibald.dev"
						>stats.sirarchibald.dev</a
					></b
				> to continue using Lighthouse. We apologise for the inconvenience.
			</Announcement>
		{/if}

		{@render children()}
	</div>

	<Footer />
</div>
