<script lang="ts">
    import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>


{#await data.streamed.player then player}
    <div class="border-b border-x border-neutral-800 rounded-b-md">
        <div class="flex flex-row items-center justify-center py-16 rounded-lg bg-neutral-950/40 text-neutral-400">
            <div class="flex flex-col gap-y-1">
                <img
                    src="https://cdn.islandstats.xyz/icons/warnings/yellow.png"
                    alt="Orange warning icon"
                    class="size-8 self-center"
                />
                <p class="text-lg">Feature coming soon!</p>
            </div>
        </div>
    </div>
{/await}