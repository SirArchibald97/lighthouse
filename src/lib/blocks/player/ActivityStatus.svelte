<script lang="ts">
	import Tooltip from '$lib/components/Tooltip.svelte';
	import type { Player } from '$lib/types';
	import { getStatusIcon, getStatusString } from '$lib/utils';
	import { Clock10, TriangleAlert } from '@lucide/svelte';
	import { DateTime } from 'luxon';

	const { player }: { player: Player } = $props<{ player: Player }>();
</script>

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
		{:else}
			<Tooltip>
				{#snippet trigger()}
					<p class="flex gap-x-1">
						<span class="flex flex-row gap-x-2 text-base text-orange-400 lg:text-lg">
							<TriangleAlert class="size-4 self-center lg:size-5" />
							Unknown Activity
						</span>
					</p>
				{/snippet}
				{#snippet content()}
					<p><b>API Error:</b> This player is online but their activity is unknown!</p>
				{/snippet}
			</Tooltip>
		{/if}
	{:else}
		<p class="flex gap-x-1 lg:gap-x-2">
			<span class="flex flex-row gap-x-2 text-neutral-400">
				<Clock10 class="size-4 self-center lg:size-5" />
				<span class="hidden lg:flex">Last joined:</span>
			</span>
			<span class="font-semibold">
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
{:else}
	<p>Status hidden!</p>
{/if}
