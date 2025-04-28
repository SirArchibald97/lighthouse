<script lang="ts">
	import ChevronLeft from '$lib/icons/ChevronLeft.svelte';
	import ChevronRight from '$lib/icons/ChevronRight.svelte';
    import type { Player } from '$lib/types';
	import { getRankIcon, getStatusIcon, getStatusString } from '$lib/utils';
    import { Tooltip } from 'flowbite-svelte';

    const { player, sectionSize }: { player: Player | undefined, sectionSize: number } = $props();

    let currentIndex = $state(0);
	function selectPage(index: number) {
		if (index < 0) index = Math.ceil(player?.social?.friends.length! / sectionSize) - 1;
		if (index >= Math.ceil(player?.social?.friends.length! / sectionSize)) index = 0;
		currentIndex = index;
	}

    const sizes = (type: "grid" | "flex") => {
        const sizes = {
            8: `${type} md:hidden`,
            10: `hidden md:${type} 2xl:hidden`,
            15: `hidden 2xl:${type}`,
        } as { [key: number]: string };
        return sizes[sectionSize];
    }
</script>

<div class="{sizes("grid")} grow grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 grid-rows-5 gap-2 p-4 border-b border-neutral-800">

    {#each player!.social!.friends.slice(currentIndex * sectionSize, currentIndex * sectionSize + sectionSize) as friend}
        <a
            href="/player/{friend.username}/games"
            class="flex cursor-pointer flex-row justify-between rounded-md border border-neutral-800 p-3 duration-100 hover:bg-neutral-800/50"
        >
            <div class="flex flex-row gap-x-2 self-center">
                <span class="relative">
                    <img
                        src="https://crafatar.com/avatars/{friend.uuid}?overlay"
                        alt="{friend.username}'s Skin'"
                        class="size-7 2xl:size-8 rounded-sm"
                    />
                    {#if friend.status}
                        <span class="absolute right-0 bottom-0 block translate-x-1/2 translate-y-1/2 transform rounded-full border-3 border-neutral-950">
                            <span class="block size-2 rounded-full {friend.status.online ? "bg-green-400" : "bg-red-400"}"></span>
                        </span>
                    {/if}
                </span>
                <img
                    src="https://cdn.islandstats.xyz/ranks/{getRankIcon(friend.ranks)}.png"
                    alt="{getRankIcon(friend.ranks)} Rank Icon"
                    class="size-7 2xl:size-8 rounded-sm bg-neutral-700"
                />
                <p class="self-center text-base 2xl:text-lg">{friend.username}</p>
            </div>
            {#if friend.status}
                {#if friend.status.online}
                    {#if friend.status.server.category === 'GAME'}
                        <img
                            src="https://cdn.islandstats.xyz/games/{getStatusIcon(friend.status.server.associatedGame === "PARKOUR_WARRIOR" ? friend.status.server.subType : friend.status.server.associatedGame)}/icon.png"
                            alt="{friend.status.server.associatedGame} Icon"
                            class="flex size-6 self-center"
                        />
                        <Tooltip arrow={false} type="custom" class="text-sm border !border-neutral-700 !bg-neutral-900 px-2 py-0.5 rounded-md duration-75">
                            {getStatusString(friend.status.server.associatedGame === "PARKOUR_WARRIOR" ? friend.status.server.subType : friend.status.server.associatedGame)}
                        </Tooltip>
                    {:else if friend.status.server.category === 'LOBBY'}
                        <div class="flex flex-row gap-x-2">
                            {#if friend.status.server.subType === 'fishing'}
                                <img
                                    src={`https://cdn.islandstats.xyz/games/fishing/icon.png`}
                                    alt="Fishing Rod Icon"
                                    class="flex size-6 self-center"
                                />
                                <Tooltip arrow={false} type="custom" placement="top" class="text-sm border !border-neutral-700 !bg-neutral-900 px-2 py-0.5 rounded-md duration-75">
                                    Fishing
                                </Tooltip>
                            {:else}
                                <img
                                    src="https://cdn.islandstats.xyz/games/lobby/icon.png"
                                    alt="Main Island Icon"
                                    class="flex size-6 self-center"
                                />
                                <Tooltip arrow={false} type="custom" placement="top" class="text-sm border !border-neutral-700 !bg-neutral-900 px-2 py-0.5 rounded-md duration-75">
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
<div class="{sizes("flex")} grow min-h-12 justify-center gap-x-6">
    <button
        onclick={() => selectPage(currentIndex - 1)}
        class="size-6 cursor-pointer self-center rounded-md border border-neutral-800 p-1 hover:border-transparent hover:bg-neutral-800"
        ><ChevronLeft /></button
    >
    <p class="self-center tabular-nums">
        {currentIndex + 1} / {Math.ceil(player!.social!.friends.length / sectionSize)}
    </p>
    <button
        onclick={() => selectPage(currentIndex + 1)}
        class="size-6 cursor-pointer self-center rounded-md border border-neutral-800 p-1 hover:border-transparent hover:bg-neutral-800"
        ><ChevronRight /></button
    >
</div>