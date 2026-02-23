<script lang="ts">
	import { badges } from '$lib/badges';
	import { miscStat } from '$lib/components/Snippets.svelte';
	import StatBarChart from '$lib/components/StatBarChart.svelte';
	import type { ParkourWarriorDojoStatistics } from '$lib/types';
	import TieredBadges from './TieredBadges.svelte';

	let { stats }: { stats: ParkourWarriorDojoStatistics } = $props();
</script>

<div
	class="flex flex-col divide-y divide-neutral-800 border-t border-neutral-800 px-4 text-base lg:text-lg"
>
	<!-- STATS -->
	<div class="grid grid-cols-1 gap-4 py-4 md:grid-cols-2 xl:grid-cols-3">
		<!-- TOTAL COMPLETIONS -->
		<StatBarChart
			data={[
				{ label: 'Standard', amount: stats.total_standard, color: '#ffd230' },
				{ label: 'Advanced', amount: stats.total_advanced, color: '#ffdc66' },
				{ label: 'Expert', amount: stats.total_expert, color: '#ffe699' }
			]}
			total={stats.total_standard + stats.total_advanced + stats.total_expert}
			tooltipLabel="Completions"
		>
			{#snippet title()}
				<p class="text-lg font-semibold">Course Completions</p>
			{/snippet}
			{#snippet subtitle()}
				<p class="text-sm">
					Total Completions: <span class="font-semibold tabular-nums"
						>{(
							stats.total_standard +
							stats.total_advanced +
							stats.total_expert
						).toLocaleString()}</span
					>
				</p>
			{/snippet}
		</StatBarChart>

		<!-- UNIQUE COMPLETIONS -->
		<StatBarChart
			data={[
				{ label: 'Standard', amount: stats.unique_standard, color: '#ffd230' },
				{ label: 'Advanced', amount: stats.unique_advanced, color: '#ffdc66' },
				{ label: 'Expert', amount: stats.unique_expert, color: '#ffe699' }
			]}
			total={stats.unique_standard + stats.unique_advanced + stats.unique_expert}
			tooltipLabel="Completions"
		>
			{#snippet title()}
				<p class="text-lg font-semibold">Unique Course Completions</p>
			{/snippet}
			{#snippet subtitle()}
				<p class="text-sm">
					Total Completions: <span class="font-semibold tabular-nums"
						>{(
							stats.unique_standard +
							stats.unique_advanced +
							stats.unique_expert
						).toLocaleString()}</span
					>
				</p>
			{/snippet}
		</StatBarChart>

		<!-- UNIQUE ROTATIONS -->
		<StatBarChart
			data={[
				{ label: 'Standard', amount: stats.unique_rot_standard, color: '#ffd230' },
				{ label: 'Advanced', amount: stats.unique_rot_advanced, color: '#ffdc66' },
				{ label: 'Expert', amount: stats.unique_rot_expert, color: '#ffe699' }
			]}
			total={stats.unique_rot_standard + stats.unique_rot_advanced + stats.unique_rot_expert}
			tooltipLabel="Completions"
		>
			{#snippet title()}
				<p class="text-lg font-semibold">Unique Rotation Completions</p>
			{/snippet}
			{#snippet subtitle()}
				<p class="text-sm">
					Total Completions: <span class="font-semibold tabular-nums"
						>{(
							stats.unique_rot_standard +
							stats.unique_rot_advanced +
							stats.unique_rot_expert
						).toLocaleString()}</span
					>
				</p>
			{/snippet}
		</StatBarChart>

		<!-- MISC STATS -->
		<div class="rounded-lg bg-neutral-800 p-4">
			<p class="text-lg font-semibold">Misc Stats</p>
			<div class="flex flex-col gap-y-3 pt-2">
				<div>
					{@render miscStat('Total Medals', stats.total_medals)}
					{@render miscStat('Unique Medals', stats.unique_medals)}
				</div>
			</div>
		</div>
	</div>

	<!-- TIERED BADGES -->
	<div class="text-md grid grid-cols-1 gap-4 py-4 *:rounded-lg md:grid-cols-2">
		<TieredBadges {stats} badges={badges.dojo_tiered} />
	</div>
</div>
