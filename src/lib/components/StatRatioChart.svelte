<script lang="ts">
	import { calculatePercentage } from '$lib/utils';
	import { Percent, Slash } from '@lucide/svelte';
	import { PieChart } from 'layerchart';
	import * as Chart from '$lib/components/ui/chart/index.js';
	import { Text } from 'layerchart';
	import type { Snippet } from 'svelte';

	let {
		firstStat,
		secondStat,
		max = 2,
		colour,
		title,
		subtitle,
		legend,
		usePercentageOption = false
	}: {
		firstStat: number;
		secondStat: number;
		max?: number;
		colour: string;
		title: Snippet<[boolean]>;
		subtitle?: Snippet;
		legend?: Snippet<[boolean, string]>;
		usePercentageOption?: boolean;
	} = $props();

	let useRatio = $state(true);

	// svelte-ignore state_referenced_locally
	const ratio = firstStat / Math.max(1, secondStat);
	// svelte-ignore state_referenced_locally
	const clamped = Math.min(ratio, max);

	// svelte-ignore state_referenced_locally
	const chartData = [
		{
			key: 'value',
			value: clamped,
			color: colour
		},
		{
			key: 'rest',
			value: max - clamped,
			color: '#333333'
		}
	];
</script>

<div class="rounded-lg bg-neutral-800 p-4">
	<div class="flex justify-between">
		<div class="flex flex-col gap-y-0.5">
			{@render title(useRatio)}
			{#if subtitle}
				{@render subtitle()}
			{/if}
		</div>
		{#if usePercentageOption}
			<button
				onclick={() => (useRatio = !useRatio)}
				class="flex size-10 cursor-pointer items-center justify-center rounded-lg border border-neutral-700 duration-100 hover:bg-neutral-700"
			>
				{#if useRatio}
					<Slash class="size-5 self-center" />
				{:else}
					<Percent class="size-5 self-center" />
				{/if}
			</button>
		{/if}
	</div>

	{#if useRatio}
		<div class="mx-auto w-full max-w-sm">
			<div class="aspect-2/1">
				<PieChart
					data={chartData}
					key="key"
					value="value"
					c="color"
					outerRadius={130}
					innerRadius={100}
					props={{
						pie: { startAngle: -Math.PI / 2, endAngle: Math.PI / 2, padAngle: 0.02, sort: null }
					}}
					padding={{ top: 120, left: 0, right: 0, bottom: 0 }}
				>
					{#snippet aboveMarks()}
						<Text
							textAnchor="middle"
							style="font-size: 30px; font-weight: 600; fill: white;"
							value={`${ratio.toFixed(2)}`}
						/>
					{/snippet}
					{#snippet tooltip()}
						<Chart.Tooltip hideLabel />
					{/snippet}
				</PieChart>
			</div>
			{#if legend}
				{@render legend(useRatio, ratio.toFixed(2).toString())}
			{/if}
		</div>
	{:else}
		<div class="mx-auto w-full max-w-sm">
			<div class="aspect-2/1">
				<PieChart
					data={chartData}
					key="key"
					value="value"
					c="color"
					outerRadius={130}
					innerRadius={100}
					props={{
						pie: { startAngle: -Math.PI / 2, endAngle: Math.PI / 2, padAngle: 0.02, sort: null }
					}}
					padding={{ top: 120, left: 0, right: 0, bottom: 0 }}
				>
					{#snippet aboveMarks()}
						<Text
							textAnchor="middle"
							style="font-size: 30px; font-weight: 600; fill: white;"
							value={`${calculatePercentage(firstStat, firstStat + secondStat)}%`}
						/>
					{/snippet}
				</PieChart>
			</div>
			{#if legend}
				{@render legend(
					useRatio,
					calculatePercentage(firstStat, firstStat + secondStat).toString() + '%'
				)}
			{/if}
		</div>
	{/if}
</div>
