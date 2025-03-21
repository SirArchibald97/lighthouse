<script lang="ts">
    import '../app.css';
    import Header from '$lib/blocks/Header.svelte';
	import Footer from '$lib/blocks/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href="https://cdn.islandstats.xyz/emojis/crown.png" />
    <title>Lighthouse by SirArchibald</title>
</svelte:head>
<div class="flex flex-col min-h-screen text-neutral-50 bg-neutral-900">
    <Header />

    <div class="flex-1">
        {@render children()}
    </div>

    <Footer />
</div>