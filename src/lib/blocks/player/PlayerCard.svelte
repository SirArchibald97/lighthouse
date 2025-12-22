<script lang="ts">
	import Info from '$lib/icons/Info.svelte';
	import type { Player } from '$lib/types';
	import {
		formatCaughtDate,
		getRankIcon,
		getRankString,
		getStatusIcon,
		getStatusString
	} from '$lib/utils';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import { DateTime } from 'luxon';

	export let player: Player;
</script>

<div class="rounded-lg border border-neutral-800 bg-neutral-900 p-2 shadow-lg md:p-4">
	<div class="flex justify-between">
		<div class="flex gap-x-2 md:gap-x-4">
			<span class="relative inline-block">
				<img
					class="size-12 rounded-md md:size-16"
					src="https://mc-heads.net/avatar/{player.uuid}.png"
					alt={player.username}
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
						<Tooltip>
							{#snippet trigger()}
								<img
									src="https://cdn.islandstats.xyz/ranks/{getRankIcon(player.ranks)}.png"
									alt="{getRankString(player.ranks)} Rank Icon"
									class="size-6 cursor-pointer self-center rounded-sm"
								/>
							{/snippet}
							{#snippet content()}
								{getRankString(player.ranks)}
							{/snippet}
						</Tooltip>

						<span class="text-lg font-semibold md:text-2xl">{player.username}</span>
						{#if player.mccPlusStatus}
							<Tooltip>
								{#snippet trigger()}
									<img
										src="https://cdn.islandstats.xyz/ranks/plus_{player.mccPlusStatus.evolution +
											1}_simple.png"
										alt="MCC Plus Icon"
										class="size-6 cursor-pointer self-center"
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
							Last online: <span class="font-semibold">
								<Tooltip>
									{#snippet trigger()}
										<!-- calculate how long ago the time was relative, e.g. 3 days, 4 weeks, etc. -->
										{DateTime.fromJSDate(new Date(player.status?.lastJoin || '')).toRelative()}
									{/snippet}
									{#snippet content()}
										{DateTime.fromJSDate(new Date(player.status?.lastJoin || '')).toLocaleString(
											DateTime.DATE_FULL
										)}
									{/snippet}
								</Tooltip>
							</span>
						</p>
					{/if}
				{/if}
			</div>
		</div>
		{#if player.status}
			{@const firstJoin = new Date(player.status.firstJoin)}
			<Tooltip>
				{#snippet trigger()}
					<p class="size-6"><Info /></p>
				{/snippet}
				{#snippet content()}
					<p>
						First Joined: <b>{DateTime.fromJSDate(firstJoin).toLocaleString(DateTime.DATE_FULL)}</b>
					</p>
				{/snippet}
			</Tooltip>
		{/if}
	</div>
</div>
