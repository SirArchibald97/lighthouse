<script lang="ts">
    import '../app.css';
    import Header from '$lib/blocks/Header.svelte';
	import Footer from '$lib/blocks/Footer.svelte';

	let { children } = $props();
</script>

<div class="flex flex-col min-h-screen text-neutral-50 bg-neutral-900">
    <Header />

    <div class="flex-1">
        {@render children()}
    </div>

    <Footer />
</div>
