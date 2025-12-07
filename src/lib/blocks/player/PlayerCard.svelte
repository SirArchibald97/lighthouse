<script lang="ts">
	import Info from '$lib/icons/Info.svelte';
	import type { Player } from '$lib/types';
	import {
		daysSince,
		formatCaughtDate,
		getRankIcon,
		getStatusIcon,
		getStatusString
	} from '$lib/utils';
	import { Tooltip } from 'flowbite-svelte';
	import { DateTime } from 'luxon';

	export let player: Player;

	function calculateTimeAgo(time: string) {
		const lastJoinDate = DateTime.fromISO(time);
		const diff = DateTime.now().diff(lastJoinDate, [
			'months',
			'weeks',
			'days',
			'hours',
			'minutes',
			'seconds'
		]);
		if (diff.months > 0) return `${diff.months} month${diff.months === 1 ? '' : 's'} ago`;
		if (diff.weeks > 0) return `${diff.days} week${diff.days === 1 ? '' : 's'} ago`;
		if (diff.days > 0) return `${diff.days} day${diff.days === 1 ? '' : 's'} ago`;
		if (diff.hours > 0) return `${diff.hours} hour${diff.hours === 1 ? '' : 's'} ago`;
		if (diff.minutes > 0) return `${diff.minutes} minute${diff.minutes === 1 ? '' : 's'} ago`;
		if (diff.seconds > 0) return `${diff.seconds} second${diff.seconds === 1 ? '' : 's'} ago`;
	}
</script>

<div class="rounded-lg border border-neutral-800 bg-neutral-900 p-2 shadow-lg md:p-4">
	<div class="flex justify-between">
		<div class="flex gap-x-2 md:gap-x-4">
			<span class="relative inline-block">
				<img
					class="size-12 rounded-md md:size-16"
					src="https://mc-heads.net/avatar/{player.uuid}.png"
					alt={`${player.username}'s Skin`}
				/>
				{#if player.status}
					<span
						class="absolute right-0 bottom-2 block translate-x-1/2 translate-y-1/2 transform rounded-full border-4 border-neutral-950 md:right-1 md:bottom-1"
					>
						<span
							class={`block size-2 rounded-full md:size-3 ${player.status.online ? 'bg-green-400' : 'bg-red-400'}`}
						></span>
					</span>
				{/if}
			</span>
			<div class="flex flex-col gap-y-1 self-center text-sm md:text-base">
				<div class="flex w-full justify-between">
					<div class="flex gap-x-2">
						<img
							class="size-7 rounded-sm bg-neutral-700 md:size-8"
							src={`https://cdn.islandstats.xyz/ranks/${getRankIcon(player?.ranks || [])}.png`}
							alt={`${getRankIcon(player.ranks || [])} Rank Icon`}
						/>
						<span class="text-lg font-semibold md:text-2xl">{player.username}</span>
						{#if player.mccPlusStatus}
							<img
								src="https://cdn.islandstats.xyz/ranks/plus_{player.mccPlusStatus.evolution +
									1}_simple.png"
								alt="MCC Plus Icon"
								class="size-6 cursor-pointer self-center"
							/>
							<Tooltip
								arrow={false}
								type="custom"
								placement="top"
								class="flex flex-col items-center rounded-md border !border-neutral-700 !bg-neutral-900 px-2 py-0.5 text-sm duration-75"
							>
								<p>
									<span class="font-semibold"
										><span class="tabular-nums">{daysSince(player.mccPlusStatus.streakStart)}</span>
										day streak</span
									>
									(<span class="tabular-nums">{player.mccPlusStatus.totalDays}</span> days total)
								</p>
								<p>
									Subscribed since <span class="font-semibold"
										>{formatCaughtDate(player.mccPlusStatus.streakStart)}</span
									>
								</p>
							</Tooltip>
						{/if}
					</div>
				</div>
				{#if player.status}
					{#if player.status.online}
						{#if player.status.server?.category === 'GAME'}
							<p class="flex flex-row gap-x-2">
								<span>Playing</span>
								<img
									class="size-6 self-center"
									src={`https://cdn.islandstats.xyz/games/${getStatusIcon(player.status.server?.associatedGame === 'PARKOUR_WARRIOR' ? player.status.server?.subType : player.status.server?.associatedGame)}/icon.png`}
									alt={`${player.status.server?.associatedGame} Icon`}
								/>
								<span class="font-semibold"
									>{getStatusString(
										player.status.server?.associatedGame === 'PARKOUR_WARRIOR'
											? player.status.server?.subType
											: player.status.server?.associatedGame
									)}</span
								>
							</p>
						{:else if player.status.server?.category === 'LOBBY'}
							<p class="flex flex-row gap-x-2">
								{#if player.status.server?.subType === 'fishing'}
									<span>On a</span>
									<img
										class="size-6 self-center"
										src="https://cdn.islandstats.xyz/games/fishing/icon.png"
										alt="Fishing Game Icon"
									/>
									<span class="font-semibold">Fishing Island</span>
								{:else}
									<span>On the</span>
									<img
										class="size-6 self-center"
										src="https://cdn.islandstats.xyz/games/lobby/icon.png"
										alt="Main Island Icon"
									/>
									<span class="font-semibold">Main Island</span>
								{/if}
							</p>
						{/if}
					{:else}
						<p>
							Last online: <span class="font-semibold"
								>{calculateTimeAgo(player.status?.lastJoin || '')}</span
							>
						</p>
					{/if}
				{/if}
			</div>
		</div>
		{#if player.status}
			{@const firstJoin = new Date(player.status.firstJoin)}
			<p
				class="size-7 cursor-pointer self-start rounded-md border border-neutral-800 p-0.5 duration-100 hover:bg-neutral-800"
			>
				<Info />
			</p>
			<Tooltip
				arrow={false}
				type="custom"
				placement="top"
				class="flex flex-col items-center rounded-md border !border-neutral-700 !bg-neutral-900 px-2 py-0.5 text-sm"
			>
				<p>
					First joined: {firstJoin.getHours() < 10
						? `0${firstJoin.getHours()}`
						: firstJoin.getHours()}:{firstJoin.getMinutes() < 10
						? `0${firstJoin.getMinutes()}`
						: firstJoin.getMinutes()}
					{firstJoin.getDate()}/{firstJoin.getMonth() + 1}/{firstJoin.getFullYear()}
				</p>
			</Tooltip>
		{/if}
	</div>
</div>
