<script lang="ts">
	import Tooltip from '$lib/components/Tooltip.svelte';
	import type { IslandFish, IslandFishWeight } from '$lib/types';
	import { formatCaughtDate, getRarityColour } from '$lib/utils';
	import { Popover } from 'bits-ui';

	const { fish, weights }: { fish: IslandFish; weights: IslandFishWeight[] } = $props();

	const backgroundStyles = {
		Locked: 'bg-neutral-800/50 hover:bg-neutral-800/70',
		Owned: 'bg-green-800/30 hover:bg-green-800/50',
		Maxed: 'bg-purple-700/30 hover:bg-purple-700/50'
	};

	function earnedTrophiesForFish() {
		let total = 0;
		for (const weight of [
			{ name: 'AVERAGE', trophies: fish.averageTrophies },
			{ name: 'LARGE', trophies: fish.largeTrophies },
			{ name: 'MASSIVE', trophies: fish.massiveTrophies },
			{ name: 'GARGANTUAN', trophies: fish.gargantuanTrophies },
			{ name: 'COLOSSAL', trophies: fish.colossalTrophies }
		]) {
			if (weights.find((w) => w.weight === weight.name) && weight.trophies) {
				total += weight.trophies;
			}
		}
		return total;
	}

	function totalTrophiesForFish() {
		return (
			fish.averageTrophies +
			fish.largeTrophies +
			(fish.massiveTrophies ?? 0) +
			(fish.gargantuanTrophies ?? 0) +
			(fish.colossalTrophies ?? 0)
		);
	}
</script>

<Popover.Root>
	<Popover.Trigger>
		<button
			class="flex size-20 cursor-pointer items-center justify-center gap-y-2 rounded-md border border-neutral-800 p-2 text-base duration-75 md:size-24 lg:text-lg {weights.length ===
			4
				? backgroundStyles.Maxed
				: weights.length === 0
					? backgroundStyles.Locked
					: backgroundStyles.Owned}"
		>
			<img
				class="size-12 self-center md:size-14 {weights.length === 0 ? 'grayscale' : ''}"
				src="https://cdn.islandstats.xyz/fishing/fish/{fish.collection.includes('Crab')
					? 'crab_collection'
					: fish.collection.toLowerCase().replaceAll(' ', '_')}/{fish.name
					.toLowerCase()
					.replaceAll(' ', '_')}.png"
				alt="{fish.name} Icon"
			/>
		</button>
	</Popover.Trigger>
	<Popover.Portal>
		<Popover.Content
			side="right"
			sideOffset={8}
			avoidCollisions={true}
			onOpenAutoFocus={(e) => e.preventDefault()}
			class="data-[state=open]:animate-in data-[state=open]:zoom-in z-50 duration-100"
		>
			<div
				class="flex w-32 flex-col gap-y-2 rounded-md border-neutral-900 bg-neutral-800 p-4 text-neutral-100 md:w-52 xl:w-64"
			>
				<p class="text-md font-bold md:text-lg {getRarityColour(fish.rarity)}">
					{fish.name}
				</p>
				<div class="flex flex-wrap gap-1">
					<img
						src="https://cdn.islandstats.xyz/icons/rarity/{fish.rarity.toLowerCase()}.png"
						alt="{fish.rarity} Icon"
						class="h-3 self-center md:h-4"
					/>
					<img
						src="/icons/{fish.elusive
							? 'tooltip_elusive'
							: fish.catchTime === 'DAY'
								? 'tooltip_day'
								: 'tooltip_night'}.png"
						alt="{fish.elusive ? 'Elusive' : fish.catchTime === 'DAY' ? 'Day' : 'Night'} Icon"
						class="h-3 self-center md:h-4"
					/>
				</div>
				<div class="flex gap-x-2">
					<img
						src="https://cdn.islandstats.xyz/icons/trophies/blue.png"
						alt="Angler Trophy Icon"
						class="size-6 self-center"
					/>
					<p>
						{earnedTrophiesForFish().toLocaleString()} / {totalTrophiesForFish().toLocaleString()}
					</p>
				</div>
				<div class="flex gap-x-2">
					{#each fish.collection.includes('Crab') ? ['average', 'large', 'colossal'] : ['average', 'large', 'massive', 'gargantuan'] as weight}
						<Tooltip>
							{#snippet trigger()}
								<img
									src={`https://cdn.islandstats.xyz/fishing/stars/${weights.find((w) => w.weight === weight.toUpperCase()) ? (weight === 'colossal' ? 'gargantuan' : weight) : `${weight === 'colossal' ? 'gargantuan' : weight}_empty`}.png`}
									alt={``}
									class="size-6 cursor-pointer"
								/>
							{/snippet}
							{#snippet content()}
								<p class="flex flex-col items-center gap-y-1">
									<span class="font-semibold">{weight[0].toUpperCase() + weight.slice(1)}</span>
									<span
										>{weights.find((w) => w.weight === weight.toUpperCase())
											? `Caught: ${formatCaughtDate(weights.find((w) => w.weight === weight.toUpperCase())?.firstCaught!)}`
											: 'Not Caught'}</span
									>
								</p>
							{/snippet}
						</Tooltip>
					{/each}
				</div>
			</div>
		</Popover.Content>
	</Popover.Portal>
</Popover.Root>
