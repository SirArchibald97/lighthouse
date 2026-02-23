<script lang="ts">
	import { Arc, BarChart, PieChart, Text } from 'layerchart';
	import { scaleBand } from 'd3-scale';
	import * as Chart from '$lib/components/ui/chart/index.js';
	import { cubicInOut } from 'svelte/easing';
	import { ChartBarBig, ChartPie } from '@lucide/svelte';
	import { calculatePercentage, shortenNumber } from '$lib/utils';
	import type { toTitleCase } from 'layerchart/utils/string';
	import type { Snippet } from 'svelte';

	const {
		data,
		total,
		tooltipLabel,
		title,
		subtitle
	}: {
		data: { label: string; amount: number; color: string }[];
		total: number;
		tooltipLabel: string;
		title: Snippet;
		subtitle?: Snippet;
	} = $props();

	let chart = $state('bar');

	// svelte-ignore state_referenced_locally
	const chartConfig = data.reduce(
		(acc, item, index) => {
			acc[item.label] = {
				label: item.label,
				color: `var(--chart-${index + 1})` // +1 to start at 1
			};
			return acc;
		},
		{} as Record<string, { label: string; color: string }>
	);

	console.log(chartConfig);
</script>

<div class="rounded-lg bg-neutral-800 p-4">
	<div class="flex justify-between">
		<div class="flex flex-col gap-y-0.5">
			{@render title()}
			{#if subtitle}
				{@render subtitle()}
			{/if}
		</div>
		<button
			onclick={() => (chart = chart === 'bar' ? 'pie' : 'bar')}
			class="flex size-10 cursor-pointer items-center justify-center rounded-lg border border-neutral-700 duration-100 hover:bg-neutral-700"
		>
			{#if chart === 'bar'}
				<ChartBarBig class="size-5 self-center" />
			{:else}
				<ChartPie class="size-5 self-center" />
			{/if}
		</button>
	</div>

	{#if chart === 'bar'}
		<Chart.Container config={chartConfig} class="mx-auto aspect-square max-h-64 w-full">
			<BarChart
				labels={{
					offset: 12,
					style: 'font-size: 14px; fill: white;',
					format: (d) => `${shortenNumber(d)} (${calculatePercentage(d, total)}%)`
				}}
				{data}
				orientation="horizontal"
				yScale={scaleBand().padding(0.25)}
				y="label"
				x="amount"
				c="color"
				cRange={data.map((c) => c.color)}
				padding={{ left: 72, right: 84 }}
				grid={false}
				rule={false}
				axis="y"
				props={{
					bars: {
						stroke: 'none',
						radius: 5,
						rounded: 'all',
						initialWidth: 0,
						initialX: 0,
						motion: {
							x: { type: 'tween', duration: 500, easing: cubicInOut },
							width: { type: 'tween', duration: 500, easing: cubicInOut }
						}
					},
					highlight: { area: { fill: 'none' } },
					yAxis: {
						format: (d) => chartConfig[d as keyof typeof chartConfig].label,
						tickLabelProps: {
							svgProps: {
								x: -16
							}
						}
					}
				}}
			>
				{#snippet tooltip()}
					<Chart.Tooltip hideLabel nameKey={tooltipLabel} />
				{/snippet}
			</BarChart>
		</Chart.Container>
	{:else}
		<Chart.Container config={chartConfig} class="mx-auto aspect-square max-h-64 w-full">
			<PieChart
				{data}
				key="label"
				value="amount"
				c="color"
				innerRadius={60}
				padding={29}
				props={{ pie: { motion: 'tween', sort: null } }}
			>
				{#snippet tooltip()}
					<Chart.Tooltip nameKey={tooltipLabel} />
				{/snippet}
				{#snippet arc({ props, visibleData, index })}
					<Arc {...props}>
						{#snippet children({ getArcTextProps })}
							<Text
								value={visibleData[index].amount}
								{...getArcTextProps('outer', {
									startOffset: '50%',
									outerPadding: 10
								})}
								class="fill-foreground"
								style="fill: white; font-size: 14px;"
							/>
						{/snippet}
					</Arc>
				{/snippet}
			</PieChart>
		</Chart.Container>
	{/if}
</div>
