<script lang="ts">
	import type { Player } from '$lib/types';
	import {
		calculatePercentage,
		caughtWeightsForIsland,
		earnedTrophiesForIsland,
		getCrownColour,
		getCrownColourHex,
		totalTrophiesForIsland
	} from '$lib/lighthouseUtils';

	const {
		player,
		collection
	}: { player: Player; collection: { name: string; climate: string; icon: string; level: number; type: 'fish' | 'crab' | 'grotto' } } = $props();
</script>

<div class="flex w-full flex-col gap-2 lg:grid lg:grid-cols-3">
	<!-- TROPHIES -->
	<div class="bg-darkbg flex gap-x-4 rounded-md p-2">
		<span
			class={`flex size-14 items-center justify-center rounded-full bg-neutral-100 lg:size-18 ${getCrownColour(player.crownLevel.fishingLevelData.level)}`}
			style={`background: conic-gradient(${getCrownColourHex(player.crownLevel.fishingLevelData.level)} ${Math.floor((earnedTrophiesForIsland(player.collections!.fish, collection.name) / totalTrophiesForIsland(player.collections!.fish, collection.name)) * 360)}deg, oklch(0.269 0 0) 0deg)`}>
			<span class="flex size-10 items-center justify-center rounded-full bg-neutral-900 lg:size-14">
				<img src="https://cdn.islandstats.xyz/icons/trophies/blue.png" alt="Angler Trophy Icon" class="size-6 lg:size-8" />
			</span>
		</span>
		<div class="self-center">
			<p class="text-base font-semibold lg:text-lg">Angler Trophies</p>
			<div class="flex gap-x-1 tabular-nums">
				<img src="https://cdn.islandstats.xyz/icons/trophies/blue.png" alt="Skill Trophy Icon" class="size-6 self-center" />
				<p class="text-base">
					<span>{earnedTrophiesForIsland(player.collections!.fish, collection.name).toLocaleString()}</span>
					<span> / </span>
					<span>{totalTrophiesForIsland(player.collections!.fish, collection.name).toLocaleString()}</span>
					<span class="text-neutral-500"
						>({calculatePercentage(
							earnedTrophiesForIsland(player.collections!.fish, collection.name),
							totalTrophiesForIsland(player.collections!.fish, collection.name)
						)}%)</span>
				</p>
			</div>
		</div>
	</div>

	<!-- FISH CAUGHT -->
	<div class="bg-darkbg flex gap-x-4 rounded-md p-2">
		<span
			class={`flex size-14 items-center justify-center rounded-full bg-neutral-100 lg:size-18 ${getCrownColour(player.crownLevel.fishingLevelData.level)}`}
			style={`background: conic-gradient(${getCrownColourHex(player.crownLevel.fishingLevelData.level)} ${Math.floor((player.collections!.fish.filter((f) => f.fish.collection === collection.name && f.weights.length > 0).length / player.collections!.fish.filter((f) => f.fish.collection === collection.name).length) * 360)}deg, oklch(0.269 0 0) 0deg)`}>
			<span class="flex size-10 items-center justify-center rounded-full bg-neutral-900 lg:size-14">
				<img src="https://cdn.islandstats.xyz/games/fishing/icon.png" alt="Fishing Game Icon" class="size-6 lg:size-8" />
			</span>
		</span>
		<div class="self-center">
			<p class="text-base font-semibold lg:text-lg">Fish Caught</p>
			<div class="flex gap-x-2 tabular-nums">
				<p class="text-base">
					<span>{player.collections!.fish.filter((f) => f.fish.collection === collection.name && f.weights.length > 0).length}</span>
					<span> / </span>
					<span>{player.collections!.fish.filter((f) => f.fish.collection === collection.name).length}</span>
					<span class="text-neutral-500"
						>({calculatePercentage(
							player.collections!.fish.filter((f) => f.fish.collection === collection.name && f.weights.length > 0).length,
							player.collections!.fish.filter((f) => f.fish.collection === collection.name).length
						)}%)</span>
				</p>
			</div>
		</div>
	</div>

	<!-- WEIGHTS CAUGHT -->
	<div class="bg-darkbg flex gap-x-4 rounded-md p-2">
		<span
			class={`flex size-14 items-center justify-center rounded-full bg-neutral-100 lg:size-18 ${getCrownColour(player.crownLevel.fishingLevelData.level)}`}
			style={`background: conic-gradient(${getCrownColourHex(player.crownLevel.fishingLevelData.level)} ${Math.round((caughtWeightsForIsland(player.collections!.fish, collection.name) / (player.collections!.fish.filter((f) => f.fish.collection === collection.name).length * (collection.type === 'crab' ? 3 : 4))) * 360)}deg, oklch(0.269 0 0) 0deg)`}>
			<span class="flex size-10 items-center justify-center rounded-full bg-neutral-900 lg:size-14">
				<img src="https://cdn.islandstats.xyz/fishing/stars/gargantuan.png" alt="Gargantuan Red Star Icon" class="size-6 lg:size-8" />
			</span>
		</span>
		<div class="self-center">
			<p class="text-base font-semibold lg:text-lg">Weights Caught</p>
			<div class="flex gap-x-2 tabular-nums">
				<p class="text-base">
					<span>{caughtWeightsForIsland(player.collections!.fish, collection.name)}</span>
					<span> / </span>
					<span>{player.collections!.fish.filter((f) => f.fish.collection === collection.name).length * (collection.type === 'crab' ? 3 : 4)}</span>
					<span class="text-neutral-500"
						>({calculatePercentage(
							caughtWeightsForIsland(player.collections!.fish, collection.name),
							player.collections!.fish.filter((f) => f.fish.collection === collection.name).length * (collection.type === 'crab' ? 3 : 4)
						)}%)</span>
				</p>
			</div>
		</div>
	</div>
</div>
