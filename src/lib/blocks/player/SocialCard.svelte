<script lang="ts">
	import ChevronLeft from '$lib/icons/ChevronLeft.svelte';
	import ChevronRight from '$lib/icons/ChevronRight.svelte';
	import Star from '$lib/icons/Star.svelte';
	import type { Player } from '$lib/types';
	import { getRankIcon, getStatusIcon, getStatusString } from '$lib/lighthouseUtils';
	import { Tooltip } from 'flowbite-svelte';

	let { player }: { player: Player | undefined } = $props();

	let activeTab = $state('Friends');

	const sizes = {
		0: 8,
		768: 10,
		1536: 15
	};
	function getSizeFromWidth(width: number) {
		if (width < 768) return sizes[0];
		else if (width < 1536) return sizes[768];
		else return sizes[1536];
	}

	let currentIndex = $state(0);
	function selectPage(index: number) {
		if (index < 0) index = Math.ceil(player?.social?.friends.length! / getSizeFromWidth(screen.width)) - 1;
		if (index >= Math.ceil(player?.social?.friends.length! / getSizeFromWidth(screen.width))) index = 0;
		currentIndex = index;
	}
</script>

<div class="flex h-full flex-col rounded-lg border border-neutral-800 shadow-lg">
	{#if player?.social}
		<div class="flex flex-row gap-x-8 border-b border-neutral-800 px-4 *:duration-75">
			{#each [{ label: 'Friends', icon: 'friend' }, { label: 'Party', icon: 'party' }] as { label: string; icon: string }[] as tab}
				<button
					onclick={() => (activeTab = tab.label)}
					class={`text-md cursor-pointer border-b-3 px-3 pt-3 pb-2 font-medium ${activeTab === tab.label ? 'border-neutral-50 text-neutral-50' : 'border-transparent text-neutral-400 hover:border-neutral-100 hover:text-neutral-100'}`}>
					<span class="flex flex-row gap-x-2">
						<img src="https://cdn.islandstats.xyz/icons/social/{tab.icon}.png" alt="{tab.label} Icon" class="size-6" />
						<span>{tab.label}</span>
					</span>
				</button>
			{/each}
		</div>

		<!-- FRIENDS -->
		{#if activeTab === 'Friends'}
			<div class="grid grow grid-cols-1 grid-rows-5 gap-2 border-b border-neutral-800 p-3 md:grid-cols-2 2xl:grid-cols-3">
				{#each player!.social!.friends.slice(currentIndex * getSizeFromWidth(screen.width), currentIndex * getSizeFromWidth(screen.width) + getSizeFromWidth(screen.width)) as friend}
					<a
						href="/player/{friend.username}/games"
						class="flex cursor-pointer flex-row justify-between rounded-md border border-neutral-800 p-3 duration-100 hover:bg-neutral-800/50">
						<div class="flex flex-row gap-x-2 self-center">
							<span class="relative">
								<img src="https://crafatar.com/avatars/{friend.uuid}?overlay" alt="{friend.username}'s Skin" class="size-7 rounded-sm 2xl:size-8" />
								{#if friend.status}
									<span class="absolute right-0 bottom-0 block translate-x-1/2 translate-y-1/2 transform rounded-full border-3 border-neutral-950">
										<span class="block size-2 rounded-full {friend.status.online ? 'bg-green-400' : 'bg-red-400'}"></span>
									</span>
								{/if}
							</span>
							<img
								src="https://cdn.islandstats.xyz/ranks/{getRankIcon(friend.ranks)}.png"
								alt="{getRankIcon(friend.ranks)} Rank Icon"
								class="size-7 rounded-sm bg-neutral-700 2xl:size-8" />
							<p class="self-center text-base 2xl:text-lg">{friend.username}</p>
						</div>
						{#if friend.status}
							{#if friend.status.online}
								{#if friend.status.server?.category === 'GAME'}
									<img
										src="https://cdn.islandstats.xyz/games/{getStatusIcon(
											friend.status.server?.associatedGame === 'PARKOUR_WARRIOR' ? friend.status.server?.subType : friend.status.server?.associatedGame
										)}/icon.png"
										alt="{friend.status.server?.associatedGame} Icon"
										class="flex size-6 self-center" />
									<Tooltip arrow={false} type="custom" class="rounded-md border !border-neutral-700 !bg-neutral-900 px-2 py-0.5 text-sm duration-75">
										{getStatusString(
											friend.status.server?.associatedGame === 'PARKOUR_WARRIOR' ? friend.status.server?.subType : friend.status.server?.associatedGame
										)}
									</Tooltip>
								{:else if friend.status.server?.category === 'LOBBY'}
									<div class="flex flex-row gap-x-2">
										{#if friend.status.server?.subType === 'fishing'}
											<img src={`https://cdn.islandstats.xyz/games/fishing/icon.png`} alt="Fishing Rod Icon" class="flex size-6 self-center" />
											<Tooltip
												arrow={false}
												type="custom"
												placement="top"
												class="rounded-md border !border-neutral-700 !bg-neutral-900 px-2 py-0.5 text-sm duration-75">
												Fishing
											</Tooltip>
										{:else}
											<img src="https://cdn.islandstats.xyz/games/lobby/icon.png" alt="Main Island Icon" class="flex size-6 self-center" />
											<Tooltip
												arrow={false}
												type="custom"
												placement="top"
												class="rounded-md border !border-neutral-700 !bg-neutral-900 px-2 py-0.5 text-sm duration-75">
												Main Island
											</Tooltip>
										{/if}
									</div>
								{/if}
							{/if}
						{/if}
					</a>
				{/each}
			</div>
			<div class="flex h-12 justify-center gap-x-6">
				<button
					onclick={() => selectPage(currentIndex - 1)}
					class="size-6 cursor-pointer self-center rounded-md border border-neutral-800 p-1 hover:border-transparent hover:bg-neutral-800"
					><ChevronLeft /></button>
				<p class="self-center tabular-nums">
					{currentIndex + 1} / {Math.ceil(player!.social!.friends.length / getSizeFromWidth(screen.width))}
				</p>
				<button
					onclick={() => selectPage(currentIndex + 1)}
					class="size-6 cursor-pointer self-center rounded-md border border-neutral-800 p-1 hover:border-transparent hover:bg-neutral-800"
					><ChevronRight /></button>
			</div>

			<!-- PARTY -->
		{:else if activeTab === 'Party'}
			{#if player.social.party.active}
				<div class="flex flex-col gap-2 p-4">
					{#each player.social.party.members as member}
						<a
							href={`/player/${member.username}/games`}
							class="flex cursor-pointer flex-row justify-between rounded-md border border-neutral-800 p-3 duration-100 hover:bg-neutral-800/50">
							<div class="flex flex-row gap-x-2">
								<span class="relative">
									<img src="https://crafatar.com/avatars/{member.uuid}?overlay" alt={``} class="size-8 rounded-sm" />
									{#if member.status}
										<span class="absolute right-0 bottom-0 block translate-x-1/2 translate-y-1/2 transform rounded-full border-3 border-neutral-950">
											<span class={`block size-2 rounded-full ${member.status.online ? 'bg-green-400' : 'bg-red-400'}`}></span>
										</span>
									{/if}
								</span>
								<img src={`https://cdn.islandstats.xyz/ranks/${getRankIcon(member.ranks)}.png`} alt={``} class="size-8 rounded-sm bg-neutral-700" />
								<p class="self-center text-lg">{member.username}</p>
								{#if member.username === player.social.party.leader.username}
									<span class="size-6 self-center text-amber-300"><Star /></span>
								{/if}
							</div>
							{#if member.status}
								{#if member.status.online}
									{#if member.status.server?.category === 'GAME'}
										<div class="flex flex-col">
											<img
												class="size-8 self-center"
												src={`https://cdn.islandstats.xyz/games/${getStatusIcon(member.status.server?.associatedGame === 'PARKOUR_WARRIOR' ? member.status.server?.subType : member.status.server?.associatedGame)}/icon.png`}
												alt={`${member.status.server?.associatedGame} Icon`} />
											<Tooltip arrow={false} type="custom" class="rounded-md border !border-neutral-700 !bg-neutral-900 px-2 py-0.5 text-sm duration-75">
												{getStatusString(
													member.status.server?.associatedGame === 'PARKOUR_WARRIOR' ? member.status.server?.subType : member.status.server?.associatedGame
												)}
											</Tooltip>
										</div>
									{:else if member.status.server?.category === 'LOBBY'}
										<p class="flex flex-row gap-x-2">
											{#if member.status.server?.subType === 'fishing'}
												<img class="size-8 self-center" src={`https://cdn.islandstats.xyz/games/fishing/icon.png`} alt="Fishing Rod Icon" />
												<Tooltip arrow={false} type="custom" class="rounded-md border !border-neutral-700 !bg-neutral-900 px-2 py-0.5 text-sm duration-75">
													Fishing
												</Tooltip>
											{:else}
												<img
													class="size-8 self-center"
													src={`https://cdn.islandstats.xyz/games/${getStatusIcon(member.status.server?.associatedGame) || 'lobby'}/icon.png`}
													alt="Main Lobby Icon" />
												<Tooltip arrow={false} type="custom" class="rounded-md border !border-neutral-700 !bg-neutral-900 px-2 py-0.5 text-sm duration-75">
													{getStatusString(member.status.server?.associatedGame) || 'Main'} Lobby
												</Tooltip>
											{/if}
										</p>
									{/if}
								{/if}
							{/if}
						</a>
					{/each}
				</div>
			{:else}
				<div class="flex h-full flex-row items-center justify-center rounded-lg bg-neutral-950/40 py-8">
					<div class="flex flex-row gap-x-2">
						<img src="https://cdn.islandstats.xyz/icons/warnings/yellow.png" alt="Yellow warning icon" class="size-6 lg:size-8" />
						<p class="text-md self-center lg:text-lg">Not partied!</p>
					</div>
				</div>
			{/if}
		{/if}
	{:else}
		<div class="flex h-full flex-row items-center justify-center rounded-lg bg-neutral-950/40 text-neutral-400">
			<div class="flex flex-col gap-y-1">
				<img src="https://cdn.islandstats.xyz/icons/warnings/orange.png" alt="Orange warning icon" class="size-8 self-center" />
				<p class="text-lg">Socials are disabled!</p>
			</div>
		</div>
	{/if}
</div>
