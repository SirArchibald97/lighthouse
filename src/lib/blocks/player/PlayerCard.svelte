<script lang="ts">
	import type { Player } from '$lib/types';
	import { daysSince, formatCaughtDate, getRankIcon, getStatusIcon, getStatusString } from '$lib/utils';
	import { Tooltip } from 'flowbite-svelte';
    import { DateTime } from "luxon";

	export let player: Player;

    function calculateTimeAgo(time: string) {
        const lastJoinDate = DateTime.fromISO(time);
            const diff = DateTime.now().diff(lastJoinDate, ["months", "weeks", "days", "hours", "minutes", "seconds"]);
            if (diff.months > 0) return `${diff.months} month${diff.months === 1 ? "" : "s"} ago`;
            if (diff.weeks > 0) return `${diff.days} week${diff.days === 1 ? "" : "s"} ago`;
            if (diff.days > 0) return `${diff.days} day${diff.days === 1 ? "" : "s"} ago`;
            if (diff.hours > 0) return `${diff.hours} hour${diff.hours === 1 ? "" : "s"} ago`;
            if (diff.minutes > 0) return `${diff.minutes} minute${diff.minutes === 1 ? "" : "s"} ago`;
            if (diff.seconds > 0) return `${diff.seconds} second${diff.seconds === 1 ? "" : "s"} ago`;
    }
</script>

<div class="rounded-lg border border-neutral-800 bg-neutral-900 p-2 md:p-4 shadow-lg">
	<div class="flex flex-row gap-x-2 md:gap-x-4">
		<span class="relative inline-block">
			<img
				class="size-12 md:size-16 rounded-md"
				src="https://crafatar.com/avatars/{player.uuid}?overlay"
				alt={`${player.username}'s Skin`}
			/>
            {#if player.status}
                <span class="absolute right-0 md:right-1 bottom-2 md:bottom-1 block translate-x-1/2 translate-y-1/2 transform rounded-full border-4 border-neutral-950">
                    <span class={`block size-2 md:size-3 rounded-full ${player.status.online ? "bg-green-400" : "bg-red-400"}`}></span>
                </span>
            {/if}
		</span>
		<div class="self-center flex flex-col gap-y-1 text-sm md:text-base">
			<div class="flex flex-row gap-x-2">
                <img class="size-7 md:size-8 bg-neutral-700 rounded-sm" src={`https://cdn.islandstats.xyz/ranks/${getRankIcon(player?.ranks || [])}.png`} alt={`${getRankIcon(player.ranks || [])} Rank Icon`} />
                <span class="text-lg md:text-2xl font-semibold">{player.username}</span>
                {#if player.mccPlusStatus}
                    <img src="/icons/plus_{player.mccPlusStatus.evolution}.png" alt="MCC Plus Icon" class="size-6 self-center cursor-pointer" />
                    <Tooltip arrow={false} type="custom" placement="top" class="flex flex-col items-center text-sm border !border-neutral-700 !bg-neutral-900 px-2 py-0.5 rounded-md duration-75">
                        <p>
                            <span class="font-semibold"><span class="tabular-nums">{daysSince(player.mccPlusStatus.streakStart)}</span> day streak</span>
                            (<span class="tabular-nums">{player.mccPlusStatus.totalDays}</span> days total)
                        </p>
                        <p>Subscribed since <span class="font-semibold">{formatCaughtDate(player.mccPlusStatus.streakStart)}</span></p>
                    </Tooltip>
                {/if}
            </div>
            {#if player.status}
                {#if player.status.online}
                    {#if player.status.server.category === "GAME"}
                        <p class="flex flex-row gap-x-2">
                            <span>Playing</span>
                            <img class="size-6 self-center" src={`https://cdn.islandstats.xyz/games/${getStatusIcon(player.status.server.associatedGame === "PARKOUR_WARRIOR" ? player.status.server.subType : player.status.server.associatedGame)}/icon.png`} alt={`${player.status.server?.associatedGame} Icon`} />
                            <span class="font-semibold">{getStatusString(player.status.server.associatedGame === "PARKOUR_WARRIOR" ? player.status.server.subType : player.status.server.associatedGame)}</span>
                        </p>
                    {:else if player.status.server?.category === "LOBBY"}
                        <p class="flex flex-row gap-x-2">
                            {#if player.status.server.subType === "fishing"}
                                <span>On a</span>
                                <img class="size-6 self-center" src="https://cdn.islandstats.xyz/games/fishing/icon.png" alt="Fishing Game Icon" />
                                <span class="font-semibold">Fishing Island</span>
                            {:else}
                                <span>On the</span>
                                <img class="size-6 self-center" src="https://cdn.islandstats.xyz/games/lobby/icon.png" alt="Main Island Icon" />
                                <span class="font-semibold">Main Island</span>
                            {/if}
                        </p>
                    {/if}
                {:else}
                    <p>Last online: <span class="font-semibold">{calculateTimeAgo(player.status?.lastJoin || "")}</span></p>
                {/if}
            {/if}
		</div>
	</div>
</div>
