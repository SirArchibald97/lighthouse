<script lang="ts">
	import { calculateBadgeTier, calculateTotalTrophies } from '$lib/badges';
	import type {
		BattleBoxStatistics,
		DynaballStatistics,
		HitwStatistics,
		IslandTieredBadge,
		ParkourWarriorDojoStatistics,
		ParkourWarriorSurvivorStatistics,
		Player,
		RocketSpleefStatistics,
		SkyBattleStatistics,
		TgttosStatistics
	} from '$lib/types';
	import { roundNumber, shortenNumber } from '$lib/lighthouseUtils';
	import { Tooltip } from 'flowbite-svelte';

	const { player, badges, forNextTier, sortedBy, all }: { player: Player; badges: IslandTieredBadge[]; forNextTier: boolean; sortedBy: string; all: boolean } =
		$props();

	const stats = {
		battle_box: player.statistics?.battle_box,
		sky_battle: player.statistics?.sky_battle.quads,
		tgttos: player.statistics?.tgttos,
		hitw: player.statistics?.hitw,
		dynaball: player.statistics?.dynaball,
		'parkour_warrior/solo': player.statistics?.pkw.dojo,
		parkour_warrior: player.statistics?.pkw.survivor,
		rocket_spleef: player.statistics?.rocket_spleef
	} as {
		[key: string]:
			| BattleBoxStatistics
			| SkyBattleStatistics
			| TgttosStatistics
			| HitwStatistics
			| DynaballStatistics
			| ParkourWarriorDojoStatistics
			| ParkourWarriorSurvivorStatistics
			| RocketSpleefStatistics;
	};

	function calculateStatLeft(badge: IslandTieredBadge) {
		return forNextTier
			? calculateBadgeTier(stats[badge.game][badge.stat], badge.tiers).next.amount - stats[badge.game][badge.stat]
			: badge.tiers[badge.tiers.length - 1].amount - stats[badge.game][badge.stat];
	}

	function totalDojoRotations() {
		const currentTime = new Date().getTime();
		const startTime = new Date('2023-08-20T00:00:00Z').getTime();
		const timeDiff = currentTime - startTime;
		const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
		const monthsDiff = Math.floor(daysDiff / 30);
		return monthsDiff + 3;
	}
</script>

{#if badges.filter((b) => stats[b.game][b.stat] < b.tiers[b.tiers.length - 1].amount).length === 0}
	<div class="flex gap-x-2 px-1 text-lg">
		<img src="https://cdn.discordapp.com/emojis/1042056406997663844.webp" alt="Trophies Icon" class="size-6 self-center" />
		<p>All badges complete!</p>
	</div>
{:else}
	{#each badges
		.filter((b) => stats[b.game][b.stat] < b.tiers[b.tiers.length - 1].amount)
		.sort((a, b) => {
			if (sortedBy === 'Games Left') {
				return Math.round(calculateStatLeft(a) / (stats[a.game][a.stat] / stats[a.game].games_played)) - Math.round(calculateStatLeft(b) / (stats[b.game][b.stat] / stats[b.game].games_played));
			} else if (sortedBy === 'Stats Left') {
				return calculateStatLeft(a) - calculateStatLeft(b);
			} else if (sortedBy === 'Trophies') {
				return calculateTotalTrophies(stats[b.game], [], [b]) - calculateTotalTrophies(stats[a.game], [], [a]);
			}
			return 0;
		}) as badge}
		<div class="bg-mainbg relative flex flex-col justify-between gap-y-2 rounded-md text-base lg:text-lg">
			<div class="flex justify-between p-2">
				<div class="flex min-w-full justify-between gap-x-4">
					<div class="flex gap-x-2">
						<img class="size-12 lg:size-16" src={`https://cdn.islandstats.xyz/badges/${badge.icon}.png`} alt={badge.name} />
						<div class="flex flex-col">
							<p class="font-semibold">
								{badge.name}
								{calculateBadgeTier(stats[badge.game][badge.stat], badge.tiers).tier.name} -> {forNextTier
									? calculateBadgeTier(stats[badge.game][badge.stat], badge.tiers).next.name
									: badge.tiers[badge.tiers.length - 1].name}
							</p>
							<p class="text-sm text-neutral-500 lg:text-base">
								<span>{badge.description.split('%%')[0]}</span>
								<span class="font-semibold text-neutral-300"> {calculateStatLeft(badge).toLocaleString()} more </span>
								<span>{badge.description.split('%%')[1]}</span>
							</p>
							<p class="mt-2 text-sm text-neutral-300 lg:text-base">
								<span>Estimated {badge.game === 'parkour_warrior/solo' ? 'Completions' : 'Games'} Left:</span>
								<span class="font-semibold">
									{#if badge.game === 'parkour_warrior/solo'}
										{calculateStatLeft(badge)}
									{:else}
										{(Math.ceil(calculateStatLeft(badge) / (stats[badge.game][badge.stat] / stats[badge.game].games_played)) || 'Unknown').toLocaleString()}
									{/if}
								</span>
								<span class="text-neutral-500">
									{#if badge.game === 'parkour_warrior/solo'}
										{!badge.name.includes('Leaper')
											? `(${roundNumber(stats[badge.game][badge.stat] / totalDojoRotations()).toLocaleString()} per rotation)`
											: ''}
									{:else}
										({(roundNumber(stats[badge.game][badge.stat] / stats[badge.game].games_played) || 0).toLocaleString()} per game)
									{/if}
								</span>
							</p>
							<p class="flex gap-x-1 text-sm text-neutral-300 lg:text-base">
								<img src="https://cdn.islandstats.xyz/icons/trophies/red.png" alt="Trophies Icon" class="size-5 self-center" />
								<span class="font-semibold tabular-nums">{calculateBadgeTier(stats[badge.game][badge.stat], badge.tiers).next.trophies}</span>
								<span>for next tier</span>
							</p>
						</div>
					</div>
				</div>
			</div>
			<p
				class={`rounded-b-md px-3 py-2 text-sm tabular-nums lg:text-base ${stats[badge.game][badge.stat]! > badge.tiers[badge.tiers.length - 1].amount ? 'bg-green-800/50' : 'bg-neutral-800'}`}>
				{#each badge.tiers as tier}
					{#if stats[badge.game][badge.stat] >= tier.amount}
						<span class="cursor-pointer text-green-600">{shortenNumber(tier.amount).toLocaleString()}</span>
					{:else if calculateBadgeTier(stats[badge.game][badge.stat], badge.tiers).next.name === tier.name}
						<span class="cursor-pointer">
							<span class="text-orange-400">{stats[badge.game][badge.stat].toLocaleString()}</span>
							<span class="text-neutral-500">
								<span> / </span>
								<span>{shortenNumber(tier.amount).toLocaleString()}</span>
							</span>
						</span>
					{:else}
						<span class="cursor-pointer text-orange-400">{shortenNumber(tier.amount).toLocaleString()}</span>
					{/if}
					<Tooltip arrow={false} type="custom" placement="top" class="rounded-md border !border-neutral-700 !bg-neutral-900 px-2 py-0.5 text-sm">
						<p class="flex gap-x-1">
							<img src="https://cdn.islandstats.xyz/icons/trophies/red.png" alt="Trophies Icon" class="size-4 self-center" />
							<span class="font-semibold tabular-nums {stats[badge.game][badge.stat] >= tier.amount ? 'text-green-600' : 'text-neutral-400'}"
								>{tier.trophies}</span>
						</p>
					</Tooltip>

					{#if badge.tiers.indexOf(tier) !== badge.tiers.length - 1}<span class="px-1 pr-2 text-neutral-600">•</span>{/if}
				{/each}
			</p>

			<div class="absolute -top-2 -right-2 rounded-md bg-neutral-800">
				<img src={`https://cdn.islandstats.xyz/games/${badge.game}/icon.png`} alt={badge.name} class="size-10 p-1" />
			</div>
		</div>
	{/each}
{/if}
