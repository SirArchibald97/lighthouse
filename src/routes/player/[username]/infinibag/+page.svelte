<script lang="ts">
	import InventoryItem from '$lib/blocks/player/InventoryItem.svelte';
	import { Select } from 'bits-ui';
	import type { PageProps } from './$types';
	import { Rarity } from '$lib/types';
	import { ChevronsUpDown, Check, Info, TriangleAlert } from '@lucide/svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	let { data }: PageProps = $props();

	let search = $state('');
	let rarityFilter = $state<string[]>([]);

	const inventoryOptions = ['All', 'Infinibag', 'Infinivault'];
	let inventoryFilter = $state<string>(inventoryOptions[0]);

	const sortOptions = ['None', 'Name', 'Rarity', 'Amount'];
	let sortBy = $state(sortOptions[0]);
</script>

{#await data.streamed.player then player}
	<div class="flex flex-col rounded-b-md border-x border-b border-neutral-800">
		{#if player?.inventory}
			{@const filteredInventory = (
				inventoryFilter === 'Inifibag'
					? player.inventory.bag
					: inventoryFilter === 'Infinivault'
						? player.inventory.vault
						: player.inventory.bag.concat(player.inventory.vault)
			)
				.filter((i) =>
					search.length > 0 ? i.asset.name.toLowerCase().includes(search.toLowerCase()) : true
				)
				.filter((i) => (rarityFilter.length > 0 ? rarityFilter.includes(i.asset.rarity) : true))
				.sort((a, b) => {
					const rarityOrder = ['COMMON', 'UNCOMMON', 'RARE', 'EPIC', 'LEGENDARY', 'MYTHIC'];
					if (sortBy === 'Name') {
						return a.asset.name.localeCompare(b.asset.name);
					} else if (sortBy === 'Rarity') {
						return rarityOrder.indexOf(b.asset.rarity) - rarityOrder.indexOf(a.asset.rarity);
					} else if (sortBy === 'Amount') {
						return b.amount - a.amount;
					}
					return 0;
				})}

			<div class="flex flex-col gap-6 p-4">
				<div class="flex flex-col gap-2 lg:flex-row">
					<div
						class="flex h-10 w-full cursor-pointer justify-center gap-x-2 rounded-md border border-neutral-800 duration-100 hover:bg-neutral-800/60 md:w-1/5"
					>
						<input
							name="cosmetic"
							type="text"
							class="w-full rounded-md bg-neutral-950 px-3 outline-none placeholder:text-neutral-400 sm:text-sm"
							placeholder="Search an item..."
							role="combobox"
							aria-expanded="false"
							aria-controls="options"
							bind:value={search}
							autocomplete="off"
						/>
					</div>
					<Select.Root
						type="multiple"
						bind:value={rarityFilter}
						items={Object.values(Rarity).map((r) => ({ label: r, value: r }))}
						allowDeselect={false}
					>
						<Select.Trigger
							class="data-placeholder:text-foreground-alt/50 inline-flex w-74 cursor-pointer touch-none items-center gap-x-2 rounded-md border border-neutral-800 px-2.75 py-2 text-base transition-colors select-none hover:bg-neutral-800/50"
							aria-label="Select a theme"
						>
							<p>
								{rarityFilter.length > 0
									? rarityFilter.length === 1
										? `${rarityFilter.length} Rarity Selected`
										: `${rarityFilter.length} Rarities Selected`
									: 'All Rarities'}
							</p>
							<ChevronsUpDown class="ml-auto size-6" />
						</Select.Trigger>
						<Select.Portal>
							<Select.Content
								class="focus-override shadow-popover data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--bits-select-content-available-height) w-(--bits-select-anchor-width) min-w-(--bits-select-anchor-width) rounded-lg border border-neutral-800 bg-neutral-900 px-1 py-3 outline-hidden select-none data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1"
								sideOffset={10}
							>
								<Select.ScrollUpButton class="flex w-full items-center justify-center">
									<ChevronsUpDown class="size-3" />
								</Select.ScrollUpButton>
								<Select.Viewport class="p-1">
									{#each Object.values(Rarity).map((r) => ({ label: r, value: r })) as filter}
										<Select.Item
											class="flex w-full cursor-pointer items-center rounded-md px-3 py-2 text-sm text-neutral-100 capitalize outline-hidden select-none data-disabled:opacity-50 data-highlighted:bg-neutral-700"
											label={filter.label}
											value={filter.value}
										>
											{#snippet children({ selected })}
												<p class="flex gap-x-2">
													{filter.label[0] + filter.label.slice(1).toLowerCase()}
												</p>
												{#if selected}
													<div class="ml-auto">
														<Check class="size-5" />
													</div>
												{/if}
											{/snippet}
										</Select.Item>
									{/each}
								</Select.Viewport>
								<Select.ScrollDownButton class="flex w-full items-center justify-center">
									<ChevronsUpDown class="size-3" />
								</Select.ScrollDownButton>
							</Select.Content>
						</Select.Portal>
					</Select.Root>
					<Select.Root
						type="single"
						bind:value={sortBy}
						items={sortOptions.map((o) => ({ label: o, value: o }))}
						allowDeselect={false}
					>
						<Select.Trigger
							class="data-placeholder:text-foreground-alt/50 inline-flex w-74 cursor-pointer touch-none items-center gap-x-2 rounded-md border border-neutral-800 px-2.75 py-2 text-base transition-colors select-none hover:bg-neutral-800/50"
							aria-label="Select a theme"
						>
							<p>
								Sort By: {sortBy}
							</p>
							<ChevronsUpDown class="ml-auto size-6" />
						</Select.Trigger>
						<Select.Portal>
							<Select.Content
								class="focus-override shadow-popover data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--bits-select-content-available-height) w-(--bits-select-anchor-width) min-w-(--bits-select-anchor-width) rounded-lg border border-neutral-800 bg-neutral-900 px-1 py-3 outline-hidden select-none data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1"
								sideOffset={10}
							>
								<Select.ScrollUpButton class="flex w-full items-center justify-center">
									<ChevronsUpDown class="size-3" />
								</Select.ScrollUpButton>
								<Select.Viewport class="p-1">
									{#each sortOptions.map((o) => ({ label: o, value: o })) as filter}
										<Select.Item
											class="flex w-full cursor-pointer items-center rounded-md px-3 py-2 text-sm text-neutral-100 capitalize outline-hidden select-none data-disabled:opacity-50 data-highlighted:bg-neutral-700"
											label={filter.label}
											value={filter.value}
										>
											{#snippet children({ selected })}
												<p class="flex gap-x-2">
													{filter.label}
												</p>
												{#if selected}
													<div class="ml-auto">
														<Check class="size-5" />
													</div>
												{/if}
											{/snippet}
										</Select.Item>
									{/each}
								</Select.Viewport>
								<Select.ScrollDownButton class="flex w-full items-center justify-center">
									<ChevronsUpDown class="size-3" />
								</Select.ScrollDownButton>
							</Select.Content>
						</Select.Portal>
					</Select.Root>
					<Select.Root
						type="single"
						bind:value={inventoryFilter}
						items={inventoryOptions.map((o) => ({ label: o, value: o }))}
						allowDeselect={false}
					>
						<Select.Trigger
							class="data-placeholder:text-foreground-alt/50 inline-flex w-74 cursor-pointer touch-none items-center gap-x-2 rounded-md border border-neutral-800 px-2.75 py-2 text-base transition-colors select-none hover:bg-neutral-800/50"
							aria-label="Select a theme"
						>
							<p>
								Show From: {inventoryFilter}
							</p>
							<ChevronsUpDown class="ml-auto size-6" />
						</Select.Trigger>
						<Select.Portal>
							<Select.Content
								class="focus-override shadow-popover data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--bits-select-content-available-height) w-(--bits-select-anchor-width) min-w-(--bits-select-anchor-width) rounded-lg border border-neutral-800 bg-neutral-900 px-1 py-3 outline-hidden select-none data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1"
								sideOffset={10}
							>
								<Select.ScrollUpButton class="flex w-full items-center justify-center">
									<ChevronsUpDown class="size-3" />
								</Select.ScrollUpButton>
								<Select.Viewport class="p-1">
									{#each inventoryOptions.map((o) => ({ label: o, value: o })) as filter}
										<Select.Item
											class="flex w-full cursor-pointer items-center rounded-md px-3 py-2 text-sm text-neutral-100 capitalize outline-hidden select-none data-disabled:opacity-50 data-highlighted:bg-neutral-700"
											label={filter.label}
											value={filter.value}
										>
											{#snippet children({ selected })}
												<p class="flex gap-x-2">
													{filter.label}
												</p>
												{#if selected}
													<div class="ml-auto">
														<Check class="size-5" />
													</div>
												{/if}
											{/snippet}
										</Select.Item>
									{/each}
								</Select.Viewport>
								<Select.ScrollDownButton class="flex w-full items-center justify-center">
									<ChevronsUpDown class="size-3" />
								</Select.ScrollDownButton>
							</Select.Content>
						</Select.Portal>
					</Select.Root>
				</div>

				<div class="flex flex-col gap-y-8">
					<p class="flex gap-x-2 text-base tabular-nums">
						<span>
							Showing <b>{filteredInventory.length}</b> items of {inventoryFilter === 'Infinibag'
								? player.inventory.bag.length
								: inventoryFilter === 'Infinivault'
									? player.inventory.vault.length
									: player.inventory.bag.length + player.inventory.vault.length}</span
						>
						<Tooltip>
							{#snippet trigger()}
								<TriangleAlert class="size-6 text-orange-400" />
							{/snippet}
							{#snippet content()}
								<p>Note: Some items are missing textures! These will slowly be fixed over time.</p>
							{/snippet}
						</Tooltip>
					</p>
					<div class="flex w-full flex-wrap justify-start gap-4">
						{#each filteredInventory as item}
							<InventoryItem
								{item}
								inVault={player.inventory.vault.find((i) => i === item) ? true : false}
							/>
						{/each}
					</div>
				</div>
			</div>
		{:else}
			<div
				class="flex flex-row items-center justify-center rounded-lg bg-neutral-950/40 py-16 text-neutral-400"
			>
				<div class="flex flex-col gap-y-1">
					<img
						src="https://cdn.islandstats.xyz/icons/warnings/orange.png"
						alt="Orange warning icon"
						class="size-8 self-center"
					/>
					<p class="text-lg">Infinibag data is disabled!</p>
				</div>
			</div>
		{/if}
	</div>
{/await}
