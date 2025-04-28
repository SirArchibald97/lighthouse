<script lang="ts">
    import ChevronLeft from '$lib/icons/ChevronLeft.svelte';
	import ChevronRight from '$lib/icons/ChevronRight.svelte';
	import Star from '$lib/icons/Star.svelte';
	import type { Player } from '$lib/types';
	import { getRankIcon, getStatusIcon, getStatusString } from '$lib/utils';
    import { Tooltip } from "flowbite-svelte";
	import FriendsList from './FriendsList.svelte';

    let { player }: { player: Player | undefined } = $props();

	let activeTab = $state('Friends');

    const friendPageSizes = {
        0: 8,
        768: 10,
        1536: 15,
    };
    function getFriendPageSize() {
        const width = screen.width;
        for (const [breakpoint, size] of Object.entries(friendPageSizes)) {
            if (width < parseInt(breakpoint)) {
                return size;
            }
        }
        return friendPageSizes[1536];
    }
</script>

<div class="flex h-full flex-col rounded-lg border border-neutral-800 shadow-lg">
	{#if player?.social}
        <div class="flex flex-row gap-x-8 px-4 *:duration-75 border-b border-neutral-800">
            {#each [
                { label: "Friends", icon: "friend" },
                { label: "Party", icon: "party" },
            ] as { label: string, icon: string }[] as tab}
                <button onclick={() => activeTab = tab.label} class={`cursor-pointer border-b-3 px-3 pt-3 pb-2 text-md font-medium ${activeTab === tab.label ? "border-neutral-50 text-neutral-50" : "border-transparent text-neutral-400 hover:border-neutral-100 hover:text-neutral-100"}`}>
                    <span class="flex flex-row gap-x-2">
                        <img src="https://cdn.islandstats.xyz/icons/social/{tab.icon}.png" alt="{tab.label} Icon" class="size-6" />
                        <span>{tab.label}</span>
                    </span>
                </button>
            {/each}
        </div>

        <!-- FRIENDS -->  
		{#if activeTab === 'Friends'}
            <FriendsList {player} sectionSize={8} />
            <FriendsList {player} sectionSize={10} />
            <FriendsList {player} sectionSize={15} />

        <!-- PARTY -->    
		{:else if activeTab === 'Party'}
			{#if player.social.party.active}
				<div class="flex flex-col gap-2 p-4">
					{#each player.social.party.members as member}
						<a
							href={`/player/${member.username}/games`}
							class="flex cursor-pointer flex-row justify-between rounded-md border border-neutral-800 p-3 duration-100 hover:bg-neutral-800/50"
						>
							<div class="flex flex-row gap-x-2">
								<span class="relative">
									<img
										src="https://crafatar.com/avatars/{member.uuid}?overlay"
										alt={``}
										class="size-8 rounded-sm"
									/>
                                    {#if member.status}
                                        <span class="absolute right-0 bottom-0 block translate-x-1/2 translate-y-1/2 transform rounded-full border-3 border-neutral-950">
                                            <span class={`block size-2 rounded-full ${member.status.online ? 'bg-green-400' : 'bg-red-400'}`}></span>
                                        </span>
                                    {/if}
								</span>
								<img
									src={`https://cdn.islandstats.xyz/ranks/${getRankIcon(member.ranks)}.png`}
									alt={``}
									class="size-8 rounded-sm bg-neutral-700"
								/>
								<p class="self-center text-lg">{member.username}</p>
								{#if member.username === player.social.party.leader.username}
                                    <span class="size-6 self-center text-amber-300"><Star /></span>
                                {/if}
							</div>
							{#if member.status}
								{#if member.status.online}
									{#if member.status.server.category === 'GAME'}
										<div class="flex flex-col">
                                            <img
                                                class="size-8 self-center"
                                                src={`https://cdn.islandstats.xyz/games/${getStatusIcon(member.status.server.associatedGame === "PARKOUR_WARRIOR" ? member.status.server.subType : member.status.server.associatedGame)}/icon.png`}
                                                alt={`${member.status.server?.associatedGame} Icon`}
                                            />
                                            <Tooltip arrow={false} type="custom" class="text-sm border !border-neutral-700 !bg-neutral-900 px-2 py-0.5 rounded-md duration-75">
                                                {getStatusString(member.status.server.associatedGame === "PARKOUR_WARRIOR" ? member.status.server.subType : member.status.server.associatedGame)}
                                            </Tooltip>
                                        </div>
									{:else if member.status.server?.category === 'LOBBY'}
										<p class="flex flex-row gap-x-2">
											{#if member.status.server.subType === 'fishing'}
												<img
													class="size-8 self-center"
													src={`https://cdn.islandstats.xyz/games/fishing/icon.png`}
													alt="Fishing Rod Icon"
												/>
                                                <Tooltip arrow={false} type="custom" class="text-sm border !border-neutral-700 !bg-neutral-900 px-2 py-0.5 rounded-md duration-75">
                                                    Fishing
                                                </Tooltip>
											{:else}
												<img
													class="size-8 self-center"
													src={`https://cdn.islandstats.xyz/games/${getStatusIcon(member.status.server.associatedGame) || 'lobby'}/icon.png`}
													alt="Main Lobby Icon"
												/>
                                                <Tooltip arrow={false} type="custom" class="text-sm border !border-neutral-700 !bg-neutral-900 px-2 py-0.5 rounded-md duration-75">
                                                    {getStatusString(member.status.server.associatedGame) || "Main"} Lobby
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
				<div class="flex h-full py-8 flex-row items-center justify-center rounded-lg bg-neutral-950/40">
					<div class="flex flex-row gap-x-2">
						<img
							src="https://cdn.islandstats.xyz/icons/warnings/yellow.png"
							alt="Yellow warning icon"
							class="size-6 lg:size-8"
						/>
						<p class="self-center text-md lg:text-lg">Not partied!</p>
					</div>
				</div>
			{/if}
		{/if}
	{:else}
		<div class="flex h-full flex-row items-center justify-center rounded-lg bg-neutral-950/40 text-neutral-400">
			<div class="flex flex-col gap-y-1">
				<img
					src="https://cdn.islandstats.xyz/icons/warnings/orange.png"
					alt="Orange warning icon"
					class="size-8 self-center"
				/>
				<p class="text-lg">Socials disabled!</p>
			</div>
		</div>
	{/if}
</div>
