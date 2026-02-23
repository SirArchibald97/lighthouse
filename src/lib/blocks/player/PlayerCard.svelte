<script lang="ts">
	import type { Player } from '$lib/types';
	import { formatCaughtDate, getRankIcon, getRankString } from '$lib/utils';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import { DateTime } from 'luxon';
	import ActivityStatus from './ActivityStatus.svelte';
	import { TicketCheck, TriangleAlert } from '@lucide/svelte';

	export let player: Player;
</script>

<div
	class="relative overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900 p-2 shadow-lg md:p-4"
>
	<div class="absolute top-1/2 right-4 hidden sm:flex">
		<img
			src="https://cdn.islandstats.xyz/icons/crowns/{player.crownLevel.levelData.evolution}.png"
			alt=""
			class="pointer-events-none top-1/2 right-4 size-32 -translate-y-1/2 -rotate-12 opacity-20 blur-[1px] lg:size-44"
		/>
	</div>

	<div class="flex flex-col sm:flex-row sm:justify-between">
		<div class="flex gap-x-4">
			<span class="relative">
				<img
					class="size-16 rounded-md lg:size-28"
					src="https://mc-heads.net/avatar/{player.uuid}.png"
					alt={player.username}
				/>
				{#if player.status}
					<span
						class="absolute right-0 bottom-2 translate-x-1/2 translate-y-1/2 transform rounded-full border-4 border-neutral-950 lg:right-1 lg:bottom-1"
					>
						<span
							class={`block size-3 rounded-full lg:size-4 ${player.status.online ? 'bg-green-400' : 'bg-red-400'}`}
						></span>
					</span>
				{/if}
			</span>
			<div class="flex flex-col gap-y-1 py-2 text-sm lg:text-base">
				<div class="flex w-full justify-between">
					<div class="flex gap-x-1.5 lg:gap-x-3">
						<Tooltip>
							{#snippet trigger()}
								<img
									src="https://cdn.islandstats.xyz/ranks/{getRankIcon(player.ranks)}.png"
									alt="{getRankString(player.ranks)} Rank Icon"
									class="size-7 cursor-pointer self-center rounded-sm bg-neutral-600 lg:size-10"
								/>
							{/snippet}
							{#snippet content()}
								{getRankString(player.ranks)}
							{/snippet}
						</Tooltip>

						<span class="text-xl font-semibold lg:text-4xl">{player.username}</span>

						{#if player.mccPlusStatus}
							<Tooltip>
								{#snippet trigger()}
									<img
										src="https://cdn.islandstats.xyz/ranks/plus_{player.mccPlusStatus.evolution +
											1}_simple.png"
										alt="MCC Plus Icon"
										class="size-5 cursor-pointer self-center lg:size-6"
									/>
								{/snippet}
								{#snippet content()}
									<div class="flex flex-col gap-y-1 text-center">
										<span
											>Subscribed for <b class="tabular-nums">{player.mccPlusStatus.totalDays}</b> days</span
										>
										<span
											>Streak started <b>{formatCaughtDate(player.mccPlusStatus.streakStart)}</b
											></span
										>
									</div>
								{/snippet}
							</Tooltip>
						{/if}
					</div>
				</div>
				{#if player.status}
					<div class="flex gap-x-2.5 text-sm lg:gap-x-4 lg:text-lg">
						<ActivityStatus {player} />

						<!-- first joined -->
						<p class="flex gap-x-1 lg:gap-x-2">
							<span class="flex flex-row gap-x-2 text-neutral-400">
								<TicketCheck class="size-4 self-center lg:size-5" />
								<span class="hidden lg:flex">First Joined:</span>
							</span>
							<span class="font-semibold">
								<Tooltip>
									{#snippet trigger()}
										{DateTime.fromJSDate(new Date(player.status?.firstJoin || '')).toRelative()}
									{/snippet}
									{#snippet content()}
										{DateTime.fromJSDate(new Date(player.status?.firstJoin || '')).toLocaleString(
											DateTime.DATE_FULL
										)}
									{/snippet}
								</Tooltip>
							</span>
						</p>
					</div>
				{:else}
					<p class="flex gap-x-2 text-neutral-400">
						<TriangleAlert class="size-5 self-center" />
						<span class="self-center">Status Hidden</span>
					</p>
				{/if}
			</div>
		</div>
		<div class="mr-8 hidden self-center sm:flex lg:mr-14">
			<img
				src="https://cdn.islandstats.xyz/icons/crowns/{player.crownLevel.levelData.evolution}.png"
				alt="Crown Level Icon"
				class="mr-2 size-8 self-center"
			/>
			<p class="text-2xl font-semibold tabular-nums">{player.crownLevel.levelData.level}</p>
		</div>
	</div>
</div>
