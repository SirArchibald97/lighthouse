<script lang="ts">
	import ChevronDown from '$lib/icons/ChevronDown.svelte';
	import ChevronUp from '$lib/icons/ChevronUp.svelte';
	import { items } from '$lib/items';
	import { calculatePercentage } from '$lib/lighthouseUtils.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';

	let itemName = $state('');
	let { data } = $props();
</script>

<svelte:head>
	<title>Marketplace</title>
	<link rel="icon" href="/icons/market.webp" />
</svelte:head>
<div class="flex min-h-full flex-col items-center justify-center">
	<div class="my-20 flex flex-col items-center justify-center gap-y-6">
		<div class="flex items-center justify-center gap-x-4 gap-y-2">
			<img src="/icons/market.webp" alt="Marketplace Icon" class="size-16 self-center" />
			<p class="text-5xl font-semibold">Marketplace</p>
		</div>
		<div class="mx-auto transform divide-y divide-neutral-800 overflow-hidden rounded-xl bg-neutral-950 ring-1 ring-black/5 transition-all">
			<div class="grid w-xl grid-cols-1">
				<form method="POST" action="?/getItem" class="col-start-1 row-start-1">
					<input
						name="item"
						type="text"
						class="h-12 w-full bg-neutral-950 pr-4 pl-11 outline-none placeholder:text-neutral-400 sm:text-sm"
						placeholder="Search for an item..."
						role="combobox"
						aria-expanded="false"
						aria-controls="options"
						bind:value={itemName}
						autocomplete="off" />
				</form>
				<svg
					class="pointer-events-none col-start-1 row-start-1 ml-4 size-5 self-center text-gray-400"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
					data-slot="icon">
					<path
						fill-rule="evenodd"
						d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
						clip-rule="evenodd" />
				</svg>
			</div>
			{#if itemName.length > 0}
				{@const filteredItems = items.filter((i) => i.name.replaceAll(' ', '').toLowerCase().includes(itemName.replaceAll(' ', '').toLowerCase()))}
				{#if filteredItems.length > 0}
					<div class="flex flex-col gap-y-2 p-2">
						<div class="max-h-72 scroll-py-2 overflow-y-auto">
							{#each filteredItems as item}
								<a class="flex gap-x-2 rounded-md p-2 duration-100 hover:bg-neutral-800/50" href={`/marketplace/${item.id}`}>
									<img src={`https://cdn.islandstats.xyz/${item.icon}`} alt={item.icon} class="size-6 self-center" />
									<span class="self-center text-base">{item.name}</span>
								</a>
							{/each}
						</div>
					</div>
				{:else}
					<p class="p-3">Search for <b>{itemName}</b></p>
				{/if}
			{/if}
		</div>
	</div>

	<div class="flex w-full flex-1 flex-col items-center justify-center bg-neutral-950 p-4 pb-6">
		{#await data.streamed?.listings}
			<div class="flex flex-col items-center justify-center gap-y-4">
				<p class="text-xl font-semibold">Finding listings...</p>
			</div>
		{:then listings}
			<div class="flex flex-col items-center justify-center gap-y-4">
				<p class="text-xl font-semibold">Most Recent Listings</p>
				<div class="flex flex-col gap-y-4">
					<div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
						{#each listings.sort((a, b) => new Date(b.creationTime).getTime() - new Date(a.creationTime).getTime()).slice(0, 8) as listing}
							{@const itemInfo = items.find((i) => i.id === listing.asset.uniqueIdentifier)}
							{@const averagePrice = Math.round(
								listings.filter((l) => l.asset.uniqueIdentifier === itemInfo?.id).reduce((a, b) => a + b.cost, 0) /
									listings.filter((l) => l.asset.uniqueIdentifier === itemInfo?.id).length
							)}
							<a
								class="flex gap-x-4 rounded-md bg-neutral-800 p-4 duration-100 hover:scale-105 hover:bg-neutral-800/50"
								href="/marketplace/{listing.asset.uniqueIdentifier}">
								<img src="https://cdn.islandstats.xyz/{itemInfo?.icon}" alt={itemInfo?.name} class="size-12 self-center" />
								<div class="flex flex-col gap-y-1">
									<p class="font-semibold">{itemInfo?.name || listing.asset.name}</p>
									<p class="flex gap-x-1">
										<span class="flex gap-x-1">
											<img src="https://cdn.islandstats.xyz/icons/currency/coin.png" alt="Coins" class="size-6 self-center" />
											<span class="tabular-nums">{listing.cost.toLocaleString()}</span>
										</span>
										<span class="flex gap-x-1 text-neutral-500">
											{#if averagePrice > listing.cost}
												<span class="size-6 self-center text-green-500"><ChevronDown /></span>
												<span class="tabular-nums">{calculatePercentage(averagePrice - listing.cost, averagePrice)}%</span>
											{:else if averagePrice < listing.cost}
												<span class="size-6 self-center text-red-500"><ChevronUp /></span>
												<span class="tabular-nums">{calculatePercentage(listing.cost - averagePrice, listing.cost)}%</span>
											{/if}
										</span>
									</p>
								</div>
							</a>
						{/each}
					</div>
				</div>
			</div>
		{:catch error}
			<p class="text-red-500">Error: {error.message}</p>
		{/await}
	</div>
</div>
