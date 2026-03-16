<script lang="ts">
	import type { Player } from '$lib/types';
	import { calculatePercentage, getCrownColour, getCrownColourHex } from '$lib/utils';

	const { player, collection }: { player: Player; collection: string } = $props();

	const cosmetics = $derived(
		player.collections!.cosmetics.filter((c) => c.cosmetic.collection === collection)
	);
	const earnedRep = $derived(
		cosmetics!.reduce(
			(acc, c) => acc + (c.cosmetic.royalReputation?.reputationAmount || 0) * c.donationsMade,
			0
		) || 0
	);
	const totalRep = $derived(
		cosmetics!.reduce(
			(acc, c) =>
				acc +
				(c.cosmetic.royalReputation?.reputationAmount || 0) *
					(c.cosmetic.royalReputation?.donationLimit || 0),
			0
		) || 0
	);
	const earnedFullChromas = $derived(
		cosmetics!.filter((c) => c.owned && c.cosmetic.colorable && c.chromaPacks.length === 4).length
	);
	const totalFullChromas = $derived(cosmetics!.filter((c) => c.cosmetic.colorable).length);
</script>

<div class="flex w-full flex-col gap-2 lg:grid lg:grid-cols-3">
	<!-- TROPHIES -->
	<div class="flex gap-x-4 rounded-md bg-neutral-900 p-2">
		<span
			class="flex size-14 items-center justify-center rounded-full bg-neutral-100 lg:size-18 {getCrownColour(
				player.crownLevel.levelData.level
			)}"
			style="background: conic-gradient({getCrownColourHex(
				player.crownLevel.levelData.level
			)} {Math.floor(
				(cosmetics!.filter((c) => c.owned).reduce((acc, c) => acc + c.cosmetic.trophies, 0) /
					cosmetics!.reduce((acc, c) => acc + c.cosmetic.trophies, 0)) *
					360
			)}deg, oklch(0.269 0 0) 0deg)"
		>
			<span class="flex size-10 items-center justify-center rounded-full bg-neutral-900 lg:size-14">
				<img
					src="https://islandcdn.themysterys.com/icons/trophies/{cosmetics![0]?.cosmetic
						.isBonusTrophies
						? 'silver'
						: 'purple'}.png"
					alt="Style Trophy Icon"
					class="size-6 lg:size-8"
				/>
			</span>
		</span>
		<div class="self-center">
			<p class="text-base font-semibold lg:text-lg">
				{cosmetics![0].cosmetic.isBonusTrophies ? 'Bonus' : 'Style'} Trophies
			</p>
			<div class="flex gap-x-1 tabular-nums">
				<img
					src="https://islandcdn.themysterys.com/icons/trophies/{cosmetics![0]?.cosmetic
						.isBonusTrophies
						? 'silver'
						: 'purple'}.png"
					alt="Style Trophy Icon"
					class="size-6 self-center"
				/>
				<p class="text-base tabular-nums">
					<span
						>{cosmetics!
							.filter((c) => c.owned)
							.reduce((acc, c) => acc + c.cosmetic.trophies, 0)
							.toLocaleString()}</span
					>
					<span> / </span>
					<span>{cosmetics!.reduce((acc, c) => acc + c.cosmetic.trophies, 0).toLocaleString()}</span
					>
					<span class="text-neutral-500"
						>({calculatePercentage(
							cosmetics!.filter((c) => c.owned).reduce((acc, c) => acc + c.cosmetic.trophies, 0),
							cosmetics!.reduce((acc, c) => acc + c.cosmetic.trophies, 0)
						)}%)</span
					>
				</p>
			</div>
		</div>
	</div>

	<!-- ROYAL REP -->
	{#if totalRep > 0}
		<div class="flex gap-x-4 rounded-md bg-neutral-900 p-2">
			<span
				class="flex size-14 items-center justify-center rounded-full bg-neutral-100 lg:size-18 {getCrownColour(
					player.crownLevel.levelData.level
				)}"
				style="background: conic-gradient({getCrownColourHex(
					player.crownLevel.levelData.level
				)} {Math.floor((earnedRep / totalRep) * 360)}deg, oklch(0.269 0 0) 0deg)"
			>
				<span
					class="flex size-10 items-center justify-center rounded-full bg-neutral-900 lg:size-14"
				>
					<img
						src="https://islandcdn.themysterys.com/icons/currency/royal_reputation.png"
						alt="Royal Reputation Icon"
						class="size-6 lg:size-8"
					/>
				</span>
			</span>
			<div class="self-center">
				<p class="text-base font-semibold lg:text-lg">Royal Reputation</p>
				<div class="flex gap-x-1 tabular-nums">
					<img
						src="https://islandcdn.themysterys.com/icons/currency/royal_reputation.png"
						alt="Royal Reputation Icon"
						class="size-6 self-center"
					/>
					<p class="text-base tabular-nums">
						<span>{earnedRep.toLocaleString()}</span>
						<span> / </span>
						<span>{totalRep.toLocaleString()}</span>
						<span class="text-neutral-500"
							>({calculatePercentage(earnedRep, totalRep) || 100}%)</span
						>
					</p>
				</div>
			</div>
		</div>
	{/if}

	<!-- CHROMAS -->
	{#if totalFullChromas > 0}
		<div class="flex gap-x-4 rounded-md bg-neutral-900 p-2">
			<span
				class="flex size-14 items-center justify-center rounded-full bg-neutral-100 lg:size-18 {getCrownColour(
					player.crownLevel.levelData.level
				)}"
				style="background: conic-gradient({getCrownColourHex(
					player.crownLevel.levelData.level
				)} {Math.floor((earnedFullChromas / totalFullChromas) * 360)}deg, oklch(0.269 0 0) 0deg)"
			>
				<span
					class="flex size-10 items-center justify-center rounded-full bg-neutral-900 lg:size-14"
				>
					<img
						src="https://islandcdn.themysterys.com/icons/chroma_pack/prismatic.webp"
						alt="Chroma Icon"
						class="size-6 lg:size-8"
					/>
				</span>
			</span>
			<div class="self-center">
				<p class="text-base font-semibold lg:text-lg">Full Chromas</p>
				<div class="flex gap-x-1 tabular-nums">
					<p class="text-base tabular-nums">
						<span>{earnedFullChromas.toLocaleString()}</span>
						<span> / </span>
						<span>{totalFullChromas.toLocaleString()}</span>
						<span class="text-neutral-500"
							>({calculatePercentage(earnedFullChromas, totalFullChromas)}%)</span
						>
					</p>
				</div>
			</div>
		</div>
	{/if}
</div>
