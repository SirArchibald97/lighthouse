<script lang="ts">
	import type { Cosmetic } from '$lib/types';
	import { getRarityColour } from '$lib/utils';
	import { Popover } from 'bits-ui';

	let {
		cosmetic,
		owned,
		donationsMade,
		chromaPacks
	}: { cosmetic: Cosmetic; owned: boolean; donationsMade: number; chromaPacks: string[] } =
		$props();

	const backgroundStyles = {
		Locked: 'bg-neutral-800/50 hover:bg-neutral-800/70',
		Owned: 'bg-green-800/30 hover:bg-green-800/50',
		Maxed: 'bg-purple-700/30 hover:bg-purple-700/50'
	};
</script>

<Popover.Root>
	<Popover.Trigger>
		<button
			class="flex size-20 items-center justify-center gap-y-2 rounded-md p-2 text-base duration-75 md:size-24 lg:text-lg {cosmetic.royalReputation
				? backgroundStyles[
						donationsMade === cosmetic.royalReputation.donationLimit
							? 'Maxed'
							: owned
								? 'Owned'
								: 'Locked'
					]
				: backgroundStyles[owned ? 'Owned' : 'Locked']}"
		>
			<img
				class="size-12 md:size-16"
				src="https://cdn.islandstats.xyz/cosmetics/{cosmetic.category.toLowerCase()}/{cosmetic.collection
					.toLowerCase()
					.replaceAll(' ', '_')}/{cosmetic.name.replaceAll(' ', '_')}.webp"
				alt={cosmetic.name}
			/>
		</button>
	</Popover.Trigger>
	<Popover.Portal>
		<Popover.Content
			side="right"
			sideOffset={8}
			avoidCollisions={true}
			class="data-[state=open]:animate-in data-[state=open]:zoom-in z-50 duration-75"
		>
			<div
				class="flex w-36 flex-col gap-y-2 rounded-md border-neutral-900 bg-neutral-800 p-4 md:w-52 xl:w-96"
			>
				<div class="flex flex-col gap-y-1">
					<p class="text-md font-bold md:text-lg {getRarityColour(cosmetic.rarity)}">
						{cosmetic.name}
					</p>
					<div class="flex flex-wrap gap-1">
						<img
							src="https://cdn.islandstats.xyz/icons/rarity/{cosmetic.rarity.toLowerCase()}.png"
							alt="{cosmetic.rarity} Icon"
							class="h-3 self-center md:h-4"
						/>
						{#if cosmetic.type !== 'STANDARD'}
							<img
								src="https://cdn.islandstats.xyz/icons/rarity/{cosmetic.type.toLowerCase()}.png"
								alt="{cosmetic.type} Icon"
								class="h-3 self-center md:h-4"
							/>
						{/if}
						<img
							src="https://cdn.islandstats.xyz/icons/tooltip/{cosmetic.category.toLowerCase()}.png"
							alt="{cosmetic.category} Icon"
							class="h-3 self-center md:h-4"
						/>
					</div>
				</div>

				<p class="text-xs text-neutral-500 italic md:text-sm">{cosmetic.obtainmentHint}</p>

				<div class="flex flex-col gap-y-1 text-neutral-100">
					<!-- trophies -->
					<div class="flex gap-x-2 {owned ? 'text-green-500' : 'text-neutral-500'}">
						<img
							src="https://cdn.islandstats.xyz/icons/trophies/{cosmetic.isBonusTrophies
								? 'silver'
								: 'purple'}.png"
							alt="Style Trophy Icon"
							class="size-3 self-center md:size-5 {owned ? 'grayscale-0' : 'grayscale'}"
						/>
						<span class="text-xs tabular-nums md:text-sm">{cosmetic.trophies}</span>
					</div>

					<!-- donations -->
					{#if cosmetic.royalReputation}
						{@const earnedRep = cosmetic.royalReputation.reputationAmount * donationsMade}
						{@const totalRep =
							cosmetic.royalReputation.reputationAmount * cosmetic.royalReputation.donationLimit}

						<div class="flex flex-col gap-x-3 md:flex-row">
							<div class="flex gap-x-2">
								<img
									src="https://cdn.islandstats.xyz/icons/misc/scavenging.png"
									alt="Scavenged"
									class="size-3 self-center md:size-5"
								/>
								<span
									id="donations"
									class="text-xs tabular-nums md:text-sm {earnedRep === totalRep
										? 'text-green-500'
										: ''}"
									>{donationsMade || 0} / {cosmetic.royalReputation?.donationLimit || 10}</span
								>
							</div>
							<div class="flex gap-x-2">
								<img
									src="https://cdn.islandstats.xyz/icons/currency/royal_reputation.png"
									alt="Royal Reputation Icon"
									class="size-3 self-center md:size-5"
								/>
								<span
									class="text-xs tabular-nums md:text-sm {earnedRep === totalRep
										? 'text-green-500'
										: ''}">{earnedRep} / {totalRep}</span
								>
							</div>
						</div>
					{:else}
						<div class="flex gap-x-2">
							<img
								src="https://cdn.islandstats.xyz/icons/misc/scavenging.png"
								alt="Scavenged"
								class="size-3 self-center grayscale md:size-5"
							/>
							<span class="text-xs tabular-nums md:text-sm">Cannot be donated</span>
						</div>
					{/if}

					<!-- global owned -->
					<div class="flex gap-x-2">
						<img
							src="https://cdn.islandstats.xyz/icons/social/friend.png"
							alt="Global Owned"
							class="size-3 self-center md:size-5"
						/>
						<span class="text-xs tabular-nums md:text-sm">{cosmetic.globalNumberOwned} owned</span>
					</div>

					<!-- chroma packs -->
					{#if cosmetic.colorable}
						<div class="flex gap-x-1">
							{#each ['thermal', 'verdant', 'oceanic', 'regal'] as pack}
								<img
									src="https://cdn.islandstats.xyz/icons/chroma_pack/{pack}.png"
									alt="{pack} Chroma Pack"
									class="size-3 md:size-5 {chromaPacks?.includes(pack) ? '' : 'grayscale'}"
								/>
							{/each}
						</div>
					{/if}

					<!-- tradable -->
					{#if cosmetic.type === 'LIMITED'}
						<img
							src="https://cdn.islandstats.xyz/icons/tooltip/tradeable.png"
							alt="Tradeable Icon"
							class="mt-4 h-4 w-24"
						/>
					{/if}
				</div>
			</div>
		</Popover.Content>
	</Popover.Portal>
</Popover.Root>
