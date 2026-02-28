<script lang="ts">
	import Tooltip from '$lib/components/Tooltip.svelte';
	import type { PlayerBasics } from '$lib/types';
	import { getStatusIcon, getStatusString } from '$lib/utils';
	import { TriangleAlert } from '@lucide/svelte';

	const { player }: { player: PlayerBasics } = $props();
</script>

<a
	href="/player/{player.username}/games"
	class="flex justify-between rounded-md bg-neutral-800 p-2 duration-100 hover:bg-neutral-700/50"
>
	<div class="flex gap-x-3">
		<span class="relative">
			<img
				src="https://mc-heads.net/avatar/{player.uuid}.png"
				alt="{player.username}'s Skin"
				class="size-7 rounded-sm 2xl:size-8"
			/>
			{#if player.status}
				<span
					class="absolute right-0 bottom-0 block translate-x-1/2 translate-y-1/2 transform rounded-full border-3 border-neutral-800"
				>
					<span
						class="block size-2 rounded-full {player.status.online ? 'bg-green-400' : 'bg-red-400'}"
					></span>
				</span>
			{/if}
		</span>
		<p class="self-center font-semibold">{player.username}</p>
	</div>
	{#if player.status && player.status.online}
		{#if player.status.server?.category === 'GAME'}
			<Tooltip>
				{#snippet trigger()}
					<img
						src="https://cdn.islandstats.xyz/games/{getStatusIcon(
							player.status!.server?.associatedGame === 'PARKOUR_WARRIOR'
								? player.status!.server?.subType
								: player.status!.server?.associatedGame
						)}/icon.png"
						alt="{player.status!.server?.associatedGame} Icon"
						class="flex size-6 self-center"
					/>
				{/snippet}
				{#snippet content()}
					<p>
						Playing {getStatusString(
							player.status!.server?.associatedGame === 'PARKOUR_WARRIOR'
								? player.status!.server?.subType
								: player.status!.server?.associatedGame
						)}
					</p>
				{/snippet}
			</Tooltip>
		{:else if player.status.server?.category === 'LOBBY'}
			<div class="flex flex-row gap-x-2">
				{#if player.status.server?.subType === 'fishing'}
					<Tooltip>
						{#snippet trigger()}
							<img
								src={`https://cdn.islandstats.xyz/games/fishing/icon.png`}
								alt="Fishing Rod Icon"
								class="flex size-6 self-center"
							/>
						{/snippet}
						{#snippet content()}
							<p>On a Fishing Island</p>
						{/snippet}
					</Tooltip>
				{:else}
					<Tooltip>
						{#snippet trigger()}
							<img
								src="https://cdn.islandstats.xyz/games/lobby/icon.png"
								alt="Main Island Icon"
								class="flex size-6 self-center"
							/>
						{/snippet}
						{#snippet content()}
							<p>On the Main Island</p>
						{/snippet}
					</Tooltip>
				{/if}
			</div>
		{:else}
			<Tooltip>
				{#snippet trigger()}
					<TriangleAlert class="size-5 self-center text-orange-400" />
				{/snippet}
				{#snippet content()}
					<p>Unknown</p>
				{/snippet}
			</Tooltip>
		{/if}
	{/if}
</a>
