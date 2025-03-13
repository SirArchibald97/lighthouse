<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="text-neutral-50 bg-neutral-900 min-h-screen">
    {@render children()}
</div>