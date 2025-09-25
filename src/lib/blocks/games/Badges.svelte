<script lang="ts">
	import type {
		BattleBoxStatistics,
		DynaballStatistics,
		HitwStatistics,
		IslandBadge,
		ParkourWarriorDojoStatistics,
		ParkourWarriorSurvivorStatistics,
		RocketSpleefStatistics,
		SkyBattleStatistics,
		TgttosStatistics
	} from '$lib/types';

	const {
		stats,
		badges
	}: {
		stats:
			| BattleBoxStatistics
			| SkyBattleStatistics
			| TgttosStatistics
			| HitwStatistics
			| DynaballStatistics
			| ParkourWarriorDojoStatistics
			| ParkourWarriorSurvivorStatistics
			| RocketSpleefStatistics;
		badges: IslandBadge[];
	} = $props();

	function getBadgeStat(stat: string) {
		return stat.startsWith('!') ? stats[stat.slice(1)] : stats.badges[stat];
	}
</script>

{#each badges as badge}
	<div
		class={`flex flex-col gap-y-2 rounded-md border text-base lg:text-lg ${getBadgeStat(badge.stat) > 0 ? 'border-green-800/50 bg-green-800/10' : 'border-neutral-800'}`}>
		<div class="flex flex-row gap-x-2 p-2">
			<div class="flex min-w-full justify-between gap-x-4">
				<div class="flex gap-x-2">
					<img class="size-12 lg:size-16" src={`https://cdn.islandstats.xyz/badges/${badge.icon}.png`} alt={badge.name} />
					<div class="flex flex-col">
						<p class="font-semibold">{badge.name}</p>
						<p class="text-sm text-neutral-500 lg:text-base">{badge.description}</p>
					</div>
				</div>
				<div class={`flex shrink-0 gap-x-1 self-start rounded-full px-2 py-0.5 ${getBadgeStat(badge.stat) > 0 ? 'bg-green-800' : 'bg-neutral-700/50'}`}>
					<img src="https://cdn.islandstats.xyz/icons/trophies/red.png" alt="Trophies Icon" class="size-6 self-center" />
					<p class="flex self-center text-sm lg:text-base">{badge.trophies}</p>
				</div>
			</div>
		</div>
		<div class={`mt-auto flex flex-row rounded-b-md p-2 px-3 text-sm lg:text-base ${getBadgeStat(badge.stat) > 0 ? 'bg-green-800/50' : 'bg-neutral-800'}`}>
			{#if getBadgeStat(badge.stat) > 0}
				<p class="flex gap-x-1 text-green-500">
					<img src="https://cdn.discordapp.com/emojis/1042056406997663844.webp?size=96" alt="Check Icon" class="size-6 self-center" />
					<span class="self-center">
						Completed
						<span class="font-semibold tabular-nums">{getBadgeStat(badge.stat).toLocaleString()}</span>
						time{getBadgeStat(badge.stat) === 1 ? '' : 's'}
					</span>
				</p>
			{:else}
				<p class="flex gap-x-1 text-neutral-400">
					<img src="https://cdn.discordapp.com/emojis/1042056408423739492.webp?size=96" alt="Check Icon" class="size-6 self-center" />
					<span class="self-center"> Not Completed </span>
				</p>
			{/if}
		</div>
	</div>
{/each}
