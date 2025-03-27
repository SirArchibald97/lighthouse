<script lang="ts">
	import { badges  } from "$lib/badges";
	import type { ParkourWarriorDojoStatistics } from "$lib/types";
	import TieredBadges from "./TieredBadges.svelte";

    let { stats }: { stats: ParkourWarriorDojoStatistics } = $props();
</script>

<div class="flex flex-col border-t border-neutral-800 px-4 divide-y divide-neutral-800 text-base lg:text-lg">
    <div class="flex flex-col lg:flex-row gap-y-4 gap-x-20 py-4">
        <div class="flex flex-col gap-x-8 gap-y-4 justify-between">
            <div>
                <p>Unique Medals: <span class="tabular-nums font-semibold">{stats.unique_medals.toLocaleString()}</span></p>
                <p>Total Medals: <span class="tabular-nums font-semibold">{stats.total_medals.toLocaleString()}</span></p>
            </div>
        </div>
        <div class="flex flex-col gap-y-4 justify-between">
            <div>
                <p>Unique Standard Completions: <span class="tabular-nums font-semibold">{stats.unique_standard.toLocaleString()}</span></p>
                <p>Unique Advanced Completions: <span class="tabular-nums font-semibold">{stats.unique_advanced.toLocaleString()}</span></p>
                <p>Unique Expert Completions: <span class="tabular-nums font-semibold">{stats.unique_expert.toLocaleString()}</span></p>
            </div>
        </div>
        <div class="flex flex-col gap-y-4 justify-between">
            <div>
                <p>Total Standard Completions: <span class="tabular-nums font-semibold">{stats.total_standard.toLocaleString()}</span></p>
                <p>Total Advanced Completions: <span class="tabular-nums font-semibold">{stats.total_advanced.toLocaleString()}</span></p>
                <p>Total Expert Completions: <span class="tabular-nums font-semibold">{stats.total_expert.toLocaleString()}</span></p>
            </div>
        </div>
    </div>

    <!-- TIERED BADGES -->
    <div class="py-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 *:rounded-lg text-md">
        <TieredBadges stats={stats} badges={badges.dojo_tiered} />
    </div>  
</div>