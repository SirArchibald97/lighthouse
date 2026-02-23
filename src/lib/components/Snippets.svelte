<script lang="ts" module>
	import { calculatePercentage } from '$lib/utils';

	export { miscStat };
</script>

{#snippet miscStat(label: string, stat: number, outOf?: number)}
	<p class="text-base">
		{label}:
		<span class="font-semibold tabular-nums">{stat.toLocaleString()}</span>
		{#if outOf}
			<span class="text-neutral-500">({calculatePercentage(stat, outOf)}%)</span>
		{/if}
	</p>
{/snippet}
