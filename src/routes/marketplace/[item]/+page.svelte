<script lang="ts">
	import * as Chart from '$lib/components/ui/chart/index.js';
	import { AreaChart, LineChart } from 'layerchart';
	import { scaleUtc } from 'd3-scale';
	import { curveLinear, curveNatural } from 'd3-shape';

	import { page } from '$app/state';
	import type { IslandAuctionListing } from '$lib/types.js';
	import { calculateTimeAgo, calculateTimeUntil, isSameDate } from '$lib/lighthouseUtils.js';
	import { items } from '$lib/items.js';
	import ChevronLeft from '$lib/icons/ChevronLeft.svelte';
	import ChevronRight from '$lib/icons/ChevronRight.svelte';
	let { data } = $props();

	const chartConfig = {
		averagePrice: { label: 'Average Price', color: '#ffffff' },
		sales: { label: 'Sales', color: '#ffffff' }
	} satisfies Chart.ChartConfig;

	function calculateMedianPrice(listings: IslandAuctionListing[]) {
		const prices = listings.map((l) => l.cost / l.amount).sort((a, b) => a - b);
		return prices.length % 2 === 0 ? (prices[prices.length / 2 - 1] + prices[prices.length / 2]) / 2 : prices[Math.floor(prices.length / 2)];
	}

	function createChartData(listings: IslandAuctionListing[]) {
		const data: { date: Date; averagePrice: number; sales: number }[] = [];
		let checkedDates: string[] = [];
		for (const listing of listings) {
			const dateObject = new Date(listing.endTime);
			const formattedDay = `${dateObject.getFullYear()}-${dateObject.getMonth() + 1}-${dateObject.getDate()}`;

			if (!checkedDates.includes(formattedDay)) {
				checkedDates.push(formattedDay);
				const listingsOnThatDay = listings.filter((l) => isSameDate(listing.endTime, l.endTime));
				const totalSpent = listingsOnThatDay.reduce((a, b) => (a += b.cost), 0);
				const amountSold = listingsOnThatDay.reduce((a, b) => (a += b.amount), 0);
				const averagePrice = totalSpent / amountSold;
				data.push({ date: new Date(formattedDay), averagePrice: Math.round(averagePrice), sales: amountSold });
			}
		}
		return data;
	}

	let activePage = $state(0);
	function cycleActivePage(listings: IslandAuctionListing[], direction: 'left' | 'right') {
		let pages = Math.ceil(listings.length / 10);
		if (direction === 'left') {
			if (activePage === 0) {
				activePage = pages - 1;
			} else {
				activePage -= 1;
			}
		} else {
			if (activePage === pages - 1) {
				activePage = 0;
			} else {
				activePage += 1;
			}
		}
	}
	let activeSort = $state('Time');
	function toggleActiveSort() {
		if (activeSort === 'Time') activeSort = 'Price';
		else activeSort = 'Time';
	}

	let inactivePage = $state(0);
	function cycleInactivePage(listings: IslandAuctionListing[], direction: 'left' | 'right') {
		let pages = Math.ceil(listings.length / 10);
		if (direction === 'left') {
			if (inactivePage === 0) {
				inactivePage = pages - 1;
			} else {
				inactivePage -= 1;
			}
		} else {
			if (inactivePage === pages - 1) {
				inactivePage = 0;
			} else {
				inactivePage += 1;
			}
		}
	}
</script>

<svelte:head>
	{#await data.streamed.listings}
		<title>Loading asset...</title>
	{:then listings}
		{@const filteredListings = listings
			.filter((l) => l.asset.uniqueIdentifier === page.url.pathname.split('/')[2])
			.sort((a, b) => new Date(b.endTime).getTime() - new Date(a.endTime).getTime())}
		{@const assetInfo = items.find((i) => i.id === filteredListings[0]?.asset?.uniqueIdentifier)}
		<link rel="icon" href="https://cdn.islandstats.xyz/{assetInfo?.icon}" />
		<title>{assetInfo?.name}</title>
	{:catch}
		<title>Unknown Asset</title>
	{/await}
</svelte:head>

{#await data.streamed.listings}
	<p>Loading...</p>
{:then listings}
	{@const filteredListings = listings
		.filter((l) => l.asset.uniqueIdentifier === page.url.pathname.split('/')[2])
		.sort((a, b) => new Date(b.endTime).getTime() - new Date(a.endTime).getTime())}
	{@const listingsThisMonth = filteredListings.filter((l) => new Date(l.endTime).getTime() >= Date.now() - 60 * 60 * 24 * 30)}
	{@const assetInfo = items.find((i) => i.id === filteredListings[0]?.asset?.uniqueIdentifier)}

	{#if assetInfo}
		<div class="mx-22 flex flex-col items-center justify-center gap-y-4 p-4">
			<div class="flex gap-x-2">
				<img src="https://cdn.islandstats.xyz/{assetInfo.icon}" alt={assetInfo.name} class="size-12 self-center" />
				<h1 class="self-center text-2xl font-semibold">{assetInfo.name}</h1>
			</div>
			<Chart.Container config={chartConfig} class="h-[250px] w-full">
				<AreaChart
					data={createChartData(filteredListings)}
					x="date"
					xScale={scaleUtc()}
					axis="x"
					series={[
						{
							key: 'averagePrice',
							label: 'Average Price',
							color: chartConfig.averagePrice.color
						},
						{
							key: 'sales',
							label: 'sales',
							color: chartConfig.sales.color
						}
					]}
					seriesLayout="stack"
					props={{
						xAxis: {
							format: (v: Date) => v.toLocaleDateString('en-US', { month: 'short', day: '2-digit' })
						},
						highlight: { points: { r: 4 } }
					}}>
					{#snippet tooltip(props)}
						<Chart.Tooltip
							indicator="dot"
							labelFormatter={(v: Date) => {
								return v.toLocaleDateString('en-US', {
									month: 'long',
									day: '2-digit'
								});
							}} />
					{/snippet}
				</AreaChart>
			</Chart.Container>
			<div class="flex w-full flex-row gap-x-4">
				<!-- OVERVIEW -->
				<div class="flex w-1/4 flex-col gap-2">
					<div class="rounded-md bg-neutral-950/80 p-4">
						<p class="text-xl font-semibold">Last 30 Days</p>
						<p class="flex gap-x-1">
							Average Price:
							<span class="flex gap-x-1">
								<img src="https://cdn.islandstats.xyz/icons/currency/coin.png" alt="Coin" class="size-5 self-center" />
								<span class="tabular-nums"
									>{Math.round(
										listingsThisMonth.reduce((a, b) => (a += b.cost), 0) / listingsThisMonth.reduce((a, b) => (a += b.amount), 0)
									).toLocaleString()}</span>
							</span>
						</p>
						<p class="flex gap-x-1">
							Median Price:
							<span class="flex gap-x-1">
								<img src="https://cdn.islandstats.xyz/icons/currency/coin.png" alt="Coin" class="size-5 self-center" />
								<span class="tabular-nums">{Math.round(calculateMedianPrice(listingsThisMonth)).toLocaleString()}</span>
							</span>
						</p>
						<p>Total Sold: <span class="tabular-nums">{listingsThisMonth.reduce((a, b) => (a += b.amount), 0).toLocaleString()}</span></p>
					</div>
					<div class="rounded-md bg-neutral-950/80 p-4">
						<p class="text-xl font-semibold">Lifetime</p>
						<p class="flex gap-x-1">
							Average Price:
							<span class="flex gap-x-1">
								<img src="https://cdn.islandstats.xyz/icons/currency/coin.png" alt="Coin" class="size-5 self-center" />
								<span class="tabular-nums"
									>{Math.round(
										filteredListings.reduce((a, b) => (a += b.cost), 0) / filteredListings.reduce((a, b) => (a += b.amount), 0)
									).toLocaleString()}</span>
							</span>
						</p>
						<p class="flex gap-x-1">
							Median Price:
							<span class="flex gap-x-1">
								<img src="https://cdn.islandstats.xyz/icons/currency/coin.png" alt="Coin" class="size-5 self-center" />
								<span class="tabular-nums">{Math.round(calculateMedianPrice(filteredListings)).toLocaleString()}</span>
							</span>
						</p>
						<p>Total Sold: <span class="tabular-nums">{filteredListings.reduce((a, b) => (a += b.amount), 0).toLocaleString()}</span></p>
					</div>
				</div>

				<!-- ACTIVE LISTINGS -->
				<div class="flex w-3/4 flex-col gap-y-4">
					<div class="flex flex-col gap-y-4 rounded-md bg-neutral-950/80 p-4">
						<div class="flex justify-between">
							<p class="text-xl font-semibold">Active Listings: {filteredListings.filter((l) => new Date(l.endTime).getTime() >= Date.now()).length}</p>
							<button onclick={toggleActiveSort} class="cursor-pointer rounded-md border border-neutral-800 px-4 py-1 duration-100 hover:bg-neutral-800"
								>{activeSort === 'Time' ? 'Time Listed' : 'Price'}</button>
						</div>
						<div class="grid grid-cols-1 gap-2 md:grid-cols-2">
							{#each filteredListings
								.filter((l) => new Date(l.endTime).getTime() >= Date.now())
								.sort((a, b) => {
									if (activeSort === 'Time') {
										return new Date(b.creationTime).getTime() - new Date(a.creationTime).getTime();
									} else {
										return Math.round(a.cost / a.amount) - Math.round(b.cost / b.amount);
									}
								})
								.slice(activePage * 10, activePage * 10 + 10) as listing}
								<div class="rounded-md bg-neutral-900 p-3">
									<p class="text-xl font-semibold tabular-nums">{listing.amount.toLocaleString()}x {listing.asset.name}</p>
									<p class="flex gap-x-1 tabular-nums">
										Price:
										<img src="https://cdn.islandstats.xyz/icons/currency/coin.png" alt="Coin" class="size-5 self-center" />
										<span>{listing.cost.toLocaleString()}</span>
										<span class="text-neutral-500">({Math.round(listing.cost / listing.amount).toLocaleString()} each)</span>
									</p>
									<p>Ends in: {calculateTimeUntil(listing.endTime)}</p>
								</div>
							{/each}
							<div class="col-span-2 flex items-center justify-center gap-x-6 py-2">
								<button
									onclick={() =>
										cycleActivePage(
											filteredListings.filter((l) => new Date(l.endTime).getTime() >= Date.now()),
											'left'
										)}
									class="size-6 cursor-pointer self-center rounded-md border border-neutral-800 p-1 hover:border-transparent hover:bg-neutral-800"
									><ChevronLeft /></button>
								<p class="self-center tabular-nums">
									{activePage + 1} / {Math.ceil(filteredListings.filter((l) => new Date(l.endTime).getTime() >= Date.now()).length / 10)}
								</p>
								<button
									onclick={() =>
										cycleActivePage(
											filteredListings.filter((l) => new Date(l.endTime).getTime() >= Date.now()),
											'right'
										)}
									class="size-6 cursor-pointer self-center rounded-md border border-neutral-800 p-1 hover:border-transparent hover:bg-neutral-800"
									><ChevronRight /></button>
							</div>
						</div>
					</div>

					<!-- INACTIVE LISTINGS -->
					<div class="flex flex-col gap-y-4 rounded-md bg-neutral-950/80 p-4">
						<p class="text-xl font-semibold">Expired Listings: {filteredListings.filter((l) => new Date(l.endTime).getTime() < Date.now()).length}</p>
						<div class="grid grid-cols-1 gap-2 md:grid-cols-2">
							{#each filteredListings.filter((l) => new Date(l.endTime).getTime() < Date.now()).slice(inactivePage * 10, inactivePage * 10 + 10) as listing}
								<div class="rounded-md bg-neutral-900 p-3">
									<p class="text-xl font-semibold tabular-nums">{listing.amount.toLocaleString()}x {listing.asset.name}</p>
									<p class="flex gap-x-1 tabular-nums">
										Sold for
										<img src="https://cdn.islandstats.xyz/icons/currency/coin.png" alt="Coin" class="size-5 self-center" />
										<span>{listing.cost.toLocaleString()}</span>
										<span class="text-neutral-500">({Math.round(listing.cost / listing.amount).toLocaleString()} each)</span>
									</p>
									<p>Ended: {calculateTimeAgo(listing.endTime)}</p>
								</div>
							{/each}
							<div class="col-span-2 flex items-center justify-center gap-x-6 py-2">
								<button
									onclick={() =>
										cycleInactivePage(
											filteredListings.filter((l) => new Date(l.endTime).getTime() < Date.now()),
											'left'
										)}
									class="size-6 cursor-pointer self-center rounded-md border border-neutral-800 p-1 hover:border-transparent hover:bg-neutral-800"
									><ChevronLeft /></button>
								<p class="self-center tabular-nums">
									{inactivePage + 1} / {Math.ceil(filteredListings.filter((l) => new Date(l.endTime).getTime() < Date.now()).length / 10)}
								</p>
								<button
									onclick={() =>
										cycleInactivePage(
											filteredListings.filter((l) => new Date(l.endTime).getTime() < Date.now()),
											'right'
										)}
									class="size-6 cursor-pointer self-center rounded-md border border-neutral-800 p-1 hover:border-transparent hover:bg-neutral-800"
									><ChevronRight /></button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	{:else}
		<p>Unknown asset!</p>
	{/if}
{/await}
