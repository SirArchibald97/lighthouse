<script lang="ts">
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import type { PlayerFactions } from '$lib/types';
	import { calculatePercentage } from '$lib/utils';
	import { Separator } from 'bits-ui';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();

	const factionNames: { [key: string]: string } = {
		RED_RABBITS: 'Red Rabbits',
		CYAN_COYOTES: 'Cyan Coyotes',
		ORANGE_OCELOTS: 'Orange Ocelots',
		AQUA_AXOLOTLS: 'Aqua Axolotls',
		YELLOW_YAKS: 'Yellow Yaks',
		BLUE_BATS: 'Blue Bats',
		LIME_LLAMAS: 'Lime Llamas',
		PURPLE_PANDAS: 'Purple Pandas',
		GREEN_GECKOS: 'Green Geckos',
		PINK_PARROTS: 'Pink Parrots'
	};

	const factionBackgroundColours: { [key: string]: string } = {
		RED_RABBITS: 'bg-red-600',
		ORANGE_OCELOTS: 'bg-orange-600',
		YELLOW_YAKS: 'bg-yellow-500',
		LIME_LLAMAS: 'bg-lime-500',
		GREEN_GECKOS: 'bg-green-600',
		BLUE_BATS: 'bg-blue-600',
		CYAN_COYOTES: 'bg-cyan-500',
		AQUA_AXOLOTLS: 'bg-teal-400',
		PURPLE_PANDAS: 'bg-purple-600',
		PINK_PARROTS: 'bg-pink-400'
	};

	const factionTextColours: { [key: string]: string } = {
		RED_RABBITS: 'text-red-400',
		ORANGE_OCELOTS: 'text-orange-400',
		YELLOW_YAKS: 'text-yellow-300',
		LIME_LLAMAS: 'text-lime-300',
		GREEN_GECKOS: 'text-green-400',
		BLUE_BATS: 'text-blue-400',
		CYAN_COYOTES: 'text-cyan-300',
		AQUA_AXOLOTLS: 'text-teal-300',
		PURPLE_PANDAS: 'text-purple-400',
		PINK_PARROTS: 'text-pink-300'
	};

	const factionPieColours: { [key: string]: string } = {
		RED_RABBITS: 'oklch(57.7% 0.245 27.325)',
		ORANGE_OCELOTS: 'oklch(64.6% 0.222 41.116)',
		YELLOW_YAKS: 'oklch(79.5% 0.184 86.047)',
		LIME_LLAMAS: 'oklch(76.8% 0.233 130.85)',
		GREEN_GECKOS: 'oklch(62.7% 0.194 149.214)',
		BLUE_BATS: 'oklch(54.6% 0.245 262.881)',
		CYAN_COYOTES: 'oklch(71.5% 0.143 215.221)',
		AQUA_AXOLOTLS: 'oklch(77.7% 0.152 181.912)',
		PURPLE_PANDAS: 'oklch(55.8% 0.288 302.321)',
		PINK_PARROTS: 'oklch(71.8% 0.202 349.761)'
	};

	function createPie(factions: PlayerFactions[]) {
		const totalExperience = factions.reduce((a, b) => (a += b.totalExperience), 0);
		let previousEnd = 0;
		return factions
			.map((faction) => {
				if (faction.totalExperience === 0) return '';
				const start = previousEnd;
				const end = start + Math.round((faction.totalExperience / totalExperience) * 100);
				previousEnd = end;
				return `${factionPieColours[faction.name]} ${start}% ${end}%`;
			})
			.filter((g) => g !== '')
			.join(', ');
	}
</script>

{#await data.streamed.player then player}
	<div class="flex flex-col rounded-b-md border-x border-b border-neutral-800">
		{#if player?.factions}
			<div
				class="flex w-full flex-col items-center gap-12 rounded-md bg-neutral-900 p-6 xl:flex-row"
			>
				<span
					class="flex size-52 items-center justify-center rounded-full bg-neutral-100"
					style="background: conic-gradient({createPie(player.factions)})"
				>
					<span class="flex size-36 items-center justify-center rounded-full bg-neutral-900">
						<img src="https://cdn.islandstats.xyz/icons/misc/factions.png" alt="" class="size-16" />
					</span>
				</span>
				<div class="flex flex-col items-center gap-y-3 self-center md:items-start">
					<p class="text-md font-semibold md:text-lg">Where does your faction XP come from?</p>
					<div class="grid grid-cols-1 gap-x-8 gap-y-2 tabular-nums md:grid-cols-2">
						{#each Object.entries(factionNames) as [id, name]}
							{@const faction = player.factions.find((f) => f.name === id) || player.factions[0]}
							<p class="text-md flex gap-x-2">
								<span class="size-4 rounded-sm md:size-6 {factionBackgroundColours[faction.name]}"
								></span>
								<span class="self-center"
									>{factionNames[faction.name]}: {faction.totalExperience.toLocaleString()}
									<span class="text-neutral-500"
										>({calculatePercentage(
											faction.totalExperience,
											player.factions.reduce((a, b) => (a += b.totalExperience), 0)
										)}%)</span
									></span
								>
							</p>
						{/each}
					</div>
					<p class="text-mg tabular-nums">
						Total XP: <span class="font-semibold">
							{player.factions.reduce((a, b) => (a += b.totalExperience), 0).toLocaleString()}
						</span>
					</p>
				</div>
			</div>
			<Separator.Root class="mx-4 border border-neutral-800" />
			<div class="grid grid-cols-1 gap-4 p-4 lg:grid-cols-2">
				{#each player.factions as faction}
					<div
						class="flex flex-col gap-y-2 rounded-md p-3 {faction.selected
							? 'bg-neutral-800/50'
							: ''}"
					>
						<p class="text-lg font-semibold {factionTextColours[faction.name]}">
							{factionNames[faction.name]}
							{#if faction.selected}
								<span class="text-md ml-1 font-normal text-neutral-500">(Selected)</span>
							{/if}
						</p>
						<Tooltip>
							{#snippet trigger()}
								<ProgressBar
									value={(faction.levelData.nextLevelProgress.obtained /
										faction.levelData.nextLevelProgress.obtainable) *
										100}
									min={0}
									max={100}
									colour={factionBackgroundColours[faction.name] || 'bg-neutral-500'}
								>
									{#snippet startElement()}
										<div class="flex gap-x-2">
											<img
												src="https://cdn.islandstats.xyz/factions/{faction.name
													.split('_')[0]
													.toLowerCase()}/{faction.levelData.evolution}.png"
												alt="{factionNames[faction.name]} Icon"
												class="h-6 w-8 self-center"
											/>
											<span class="text-md font-semibold tabular-nums"
												>{faction.levelData.level}</span
											>
										</div>
									{/snippet}
								</ProgressBar>
							{/snippet}
							{#snippet content()}
								<p>
									{faction.levelData.nextLevelProgress.obtained.toLocaleString()} / {faction.levelData.nextLevelProgress.obtainable.toLocaleString()}
									<span>
										({calculatePercentage(
											faction.levelData.nextLevelProgress.obtained,
											faction.levelData.nextLevelProgress.obtainable
										)}%)
									</span>
								</p>
							{/snippet}
						</Tooltip>
					</div>
				{/each}
			</div>
		{:else}
			<div
				class="mx-4 mb-4 flex flex-row items-center justify-center rounded-lg bg-neutral-950/40 py-16 text-neutral-400"
			>
				<div class="flex flex-col gap-y-1">
					<img
						src="https://cdn.islandstats.xyz/icons/warnings/orange.png"
						alt="Orange warning icon"
						class="size-8 self-center"
					/>
					<p class="text-lg">No faction data!</p>
				</div>
			</div>
		{/if}
	</div>
{/await}
