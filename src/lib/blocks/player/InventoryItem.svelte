<script lang="ts">
	import { Rarity, type InventoryItem } from '$lib/types';
	import { getRarityColour } from '$lib/utils';
	import { Popover } from 'bits-ui';

	const { item, inVault }: { item: InventoryItem; inVault?: boolean } = $props();

	const cores = [
		'standard',
		'exclusive',
		'mythic',
		'arcane',
		'temperate',
		'tropical',
		'barren',
		'bronze',
		'silver',
		'golden'
	];
	const fishingSpirits = ['Strong', 'Wise', 'Glimmering', 'Greedy', 'Lucky'];
	const fishingPearls = ['Rough', 'Polished', 'Pristine'];
	const fishingTrash = [
		'Rusted Can',
		'Tangled Kelp',
		'Lost Shoe',
		'Royal Residue',
		'Forgotten Crown'
	];

	const materials = {
		'Foggy Crystal': 'magical',
		'Iron Bolt': 'mechanical',
		'Pale Bloom': 'nature',
		'Bland Water': 'oceanic',
		'Jade Eye': 'magical',
		'Copper Chunk': 'mechanical',
		'Verdant Moss': 'nature',
		'Seaweed Goo': 'oceanic',
		'Friggid Sapphire': 'magical',
		'Cobalt Rod': 'mechanical',
		'Sky Poppy': 'nature',
		'Deep Brine': 'oceanic',
		'Amethyst Tablet': 'magical',
		'Titanium Plate': 'mechanical',
		'Nightshade Lily': 'nature',
		'Virulent Vial': 'oceanic',
		'Crystallized Sunset': 'magical',
		'Solarflame Bar': 'mechanical',
		'Sparkling Sunflower': 'nature',
		'Bottled Sunrise': 'oceanic'
	} as { [material: string]: string };

	function getItemIcon(item: InventoryItem) {
		// CORES
		if (item.asset.name.includes('Core')) {
			const coreType = cores.find((c) => item.asset.name.toLowerCase().includes(c));
			return coreType
				? item.asset.name.includes('Weapon')
					? `icons/core/weapon_${coreType}.png`
					: `icons/core/${coreType}.png`
				: 'icons/misc/legacy.png';

			// BLUEPRINTS
		} else if (item.asset.name.includes('Blueprint')) {
			return `icons/blueprint/cosmetic_${item.asset.rarity.toLowerCase()}.png`;

			// QUEST SCROLLS
		} else if (item.asset.name.includes('Quest Scroll')) {
			return `icons/quest_scroll/${item.asset.rarity.toLowerCase()}.png`;

			// REFRESH TOKENS
		} else if (item.asset.name === 'Quest Refresh Token') {
			return `icons/quest_token/refresh.png`;

			// REROLL TOKENS
		} else if (item.asset.name === 'Task Reroll Token') {
			return `icons/quest_token/reroll.png`;

			// MATERIALS
		} else if (Object.keys(materials).includes(item.asset.name)) {
			return `icons/material/${materials[item.asset.name]}_${item.asset.rarity.toLowerCase()}.png`;

			// MATERIAL CLUSTERS
		} else if (item.asset.name.includes('Material Cluster')) {
			return `icons/material/cluster_${item.asset.rarity.toLowerCase()}.png`;

			// POWER SHARDS
		} else if (item.asset.name.includes('Power Shard')) {
			return `icons/material/power_shard_${item.asset.rarity.toLowerCase()}.png`;

			// STYLE SHARDS
		} else if (item.asset.name.includes('Style Shard')) {
			return `icons/material/${item.asset.name.toLowerCase().replaceAll(' ', '_')}.webp`;

			// STYLE SOUL
		} else if (item.asset.name === 'Style Soul') {
			return `icons/material/style_soul.png`;

			// FISHING SPIRITS
		} else if (
			item.asset.name.includes(' Spirit') &&
			fishingSpirits.find((s) => item.asset.name.includes(s)) &&
			!item.asset.cosmetic
		) {
			const spiritType = fishingSpirits.find((s) => item.asset.name.includes(s))?.toLowerCase();

			if (item.asset.name.includes('Pure')) {
				return `fishing/icons/spirits/pure_${spiritType}.webp`;
			} else if (item.asset.name.includes('Refined')) {
				return `fishing/icons/spirits/refined_${spiritType}.png`;
			} else {
				return `fishing/icons/spirits/${spiritType}.png`;
			}

			// FISHING PEARLS
		} else if (
			item.asset.name.includes(' Pearl') &&
			fishingPearls.find((p) => item.asset.name.includes(p)) &&
			!item.asset.cosmetic
		) {
			const pearlType = fishingPearls.find((p) => item.asset.name.includes(p))!;
			return `fishing/icons/pearls/${pearlType.toLowerCase()}.${pearlType === 'Pristine' ? 'webp' : 'png'}`;

			// FISHING TREASURE
		} else if (
			item.asset.name.includes(' Treasure') &&
			!item.asset.name.includes('A.N.G.L.R') &&
			!item.asset.cosmetic
		) {
			return `fishing/icons/treasure/${item.asset.rarity.toLowerCase()}.png`;

			// FISHING TRASH
		} else if (fishingTrash.includes(item.asset.name) && !item.asset.cosmetic) {
			return `fishing/icons/trash/${item.asset.rarity.toLowerCase()}.png`;

			// FISH
		} else if (item.asset.fishingIsland) {
			return `fishing/fish/${item.asset.fishingIsland.toLowerCase().replaceAll(' ', '_')}/${item.asset.name.toLowerCase().replaceAll(' ', '_')}.png`;

			// BAIT
		} else if (item.asset.name.includes('Bait') && !item.asset.cosmetic) {
			return `fishing/perks/baits/${item.asset.rarity.toLowerCase()}.png`;

			// LINES
		} else if (item.asset.name.includes('Line') && !item.asset.cosmetic) {
			return `fishing/perks/lines/${item.asset.rarity.toLowerCase()}.png`;

			// AUGMENTS
		} else if (item.asset.name.includes('Augment') && !item.asset.cosmetic) {
			if (item.asset.name.includes('Hook')) {
				return `fishing/perks/hooks/${item.asset.name.split(' ')[0].toLowerCase()}.png`;
			} else if (item.asset.name.includes('Magnet')) {
				return `fishing/perks/magnets/${item.asset.name.split(' ')[0].toLowerCase()}.png`;
			} else if (item.asset.name.includes('Rod')) {
				return `fishing/perks/rods/${item.asset.name.split(' ')[0].toLowerCase()}.png`;
			} else if (item.asset.name.includes('Pot')) {
				return `fishing/perks/pots/${item.asset.name.split(' ')[0].toLowerCase()}.png`;
			} else if (item.asset.name.includes('Lure') || item.asset.name.includes('Ultralure')) {
				const lures = {
					Elusive: 'strong',
					Wayfinder: 'wise',
					Pearl: 'glimmering',
					Treasure: 'greedy',
					Spirit: 'lucky'
				} as { [lure: string]: string };
				const isUl = item.asset.name.includes('Ultralure');
				return `fishing/perks/lures/${isUl ? 'ultralure_' : ''}${Object.entries(lures).find(([key]) => item.asset.name.includes(key))?.[1]}.${isUl ? 'webp' : 'png'}`;
			}

			// COSMETICS
		} else if (item.asset.cosmetic) {
			return `cosmetics/${item.asset.cosmetic.category.toLowerCase()}/${item.asset.cosmetic.collection
				.toLowerCase()
				.replaceAll(
					' ',
					'_'
				)}/${item.asset.cosmetic.name.replaceAll(' ', '_').replaceAll('Token', '')}.webp`;
		}

		return 'icons/misc/legacy.png';
	}

	function getItemTooltipIcon(item: InventoryItem) {
		const consumables = ['Bait', 'Line', 'A.N.G.L.R', 'Augment', 'Token', 'Quest Scroll'];

		if (item.asset.name.includes('Blueprint')) {
			return 'blueprint';
		} else if (item.asset.name.includes('Core')) {
			return 'material';
		} else if (consumables.find((c) => item.asset.name.includes(c))) {
			return 'consumable';
		} else if (item.asset.fishingIsland) {
			return 'fish';
		}
	}

	const rarityBackgroundColours = {
		[Rarity.COMMON]: 'bg-neutral-200/50',
		[Rarity.UNCOMMON]: 'bg-green-500/50',
		[Rarity.RARE]: '',
		[Rarity.EPIC]: '',
		[Rarity.LEGENDARY]: '',
		[Rarity.MYTHIC]: ''
	};
</script>

<Popover.Root>
	<Popover.Trigger>
		<button
			class="relative flex size-20 cursor-pointer items-center justify-center gap-y-2 rounded-md border border-neutral-800 p-2 text-base duration-100 hover:bg-neutral-800 md:size-24 lg:text-lg {getRarityColour(
				item.asset.rarity
			)}"
		>
			<img
				class="size-12 self-center md:size-14"
				src="https://cdn.islandstats.xyz/{getItemIcon(item)}"
				alt="{item.asset.name} Icon"
			/>
			<p
				class="absolute -top-3 -right-3 rounded-lg border border-neutral-700 bg-neutral-800 px-2 py-0.5 text-sm font-semibold tabular-nums"
			>
				x{item.amount.toLocaleString()}
			</p>
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
				class="flex w-36 flex-col gap-y-2 rounded-md border-neutral-900 bg-neutral-800 p-4 md:w-52 xl:w-96"
			>
				<div class="flex flex-col gap-y-1">
					<p class="text-md font-bold md:text-lg {getRarityColour(item.asset.rarity)}">
						{item.asset.name}
					</p>
					<div class="flex flex-wrap gap-1">
						<img
							src="https://cdn.islandstats.xyz/icons/rarity/{item.asset.rarity.toLowerCase()}.png"
							alt="{item.asset.rarity} Icon"
							class="h-3 self-center md:h-4"
						/>
						{#if getItemTooltipIcon(item)}
							<img
								src="https://cdn.islandstats.xyz/icons/tooltip/{getItemTooltipIcon(item)}.png"
								alt="{getItemTooltipIcon(item)} Icon"
								class="h-3 self-center md:h-4"
							/>
						{/if}
					</div>
					<p class="pt-4 text-sm text-neutral-500 italic">
						Found in the {inVault ? 'Infinivault' : 'Infinibag'}
					</p>
				</div>
			</div>
		</Popover.Content>
	</Popover.Portal>
</Popover.Root>
