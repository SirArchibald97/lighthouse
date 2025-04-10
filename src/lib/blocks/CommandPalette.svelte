<script lang="ts">
    import MagnifyingGlass from "$lib/icons/MagnifyingGlass.svelte";
	import { onMount } from "svelte";
    import { getOS } from "$lib/utils";

    let username = $state("");

    let showCommandPalette = $state(false);
    function onKeyPress(event: KeyboardEvent) {
        if ((event.ctrlKey || event.metaKey) && event.code === "KeyK") {        
            event.preventDefault();
            showCommandPalette = true;
        } else if (event.code === "Escape") {
            event.preventDefault();
            showCommandPalette = false;
        }
    }

    let os = $state("PC");
    let recentSearches: string[] = $state([]);
    onMount(async () => {
        os = getOS(navigator.userAgent);
        recentSearches = localStorage.getItem("searches")?.split(",") || [];
    });
</script>

<svelte:window onkeydown={onKeyPress} />
<div>
    <button type="button" onclick={() => showCommandPalette = true} class="flex flex-row gap-x-2 border-2 border-neutral-800 rounded-full px-4 py-1 text-sm font-semibold text-neutral-50 shadow-xs hover:bg-neutral-700 hover:cursor-pointer duration-100">
        <span class="w-4 h-4 self-center"><MagnifyingGlass /></span>
        <span class="self-center">{os === "macOS" ? "⌘ K" : (os === "mobile" ? "Tap" : "Ctrl K")}</span>
    </button>

    {#if showCommandPalette}
        <div id="command-menu" class="relative z-10" role="dialog" aria-modal="true">
            <div class="fixed inset-0 bg-gray-500/15 transition-opacity" aria-hidden="true"></div>

            <div class="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20 text-neutral-100 animate-fade">
                <div class="mx-auto max-w-xl transform bg-neutral-950 divide-y divide-neutral-800 overflow-hidden rounded-xl shadow-2xl ring-1 ring-black/5 transition-all">
                    <div class="grid grid-cols-1">
                        <form method="POST" action="?/getPlayer" class="col-start-1 row-start-1">
                            <!-- svelte-ignore a11y_autofocus -->
                            <input
                                name="username"
                                type="text"
                                class="h-12 w-full pr-4 pl-11 outline-none bg-neutral-950 placeholder:text-neutral-400 sm:text-sm"
                                placeholder="Search a username..."
                                role="combobox"
                                aria-expanded="false"
                                aria-controls="options"
                                bind:value={username}
                                autofocus
                            />
                        </form>
                            <svg
                            class="pointer-events-none col-start-1 row-start-1 ml-4 size-5 self-center text-gray-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            data-slot="icon"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </div>
                    <div class="flex flex-col gap-y-2 p-2">
                        {#each [
                            { label: "View the leaderboards", href: "/leaderboards", icon: "emojis/crown" },
                            { label: "Compare players", href: "/compare", icon: "icons/trophies/yellow" },
                            { label: "Let's go gamlbing!", href: "/simulator", icon: "emojis/sunglasses" }
                        ] as { label: string, href: string, icon: string }[] as link}
                            <a onclick={() => showCommandPalette = false} class="flex gap-x-2 hover:bg-neutral-800/50 duration-100 p-2 rounded-md" href={link.href}>
                                <img src={`https://cdn.islandstats.xyz/${link.icon}.png`} alt={link.icon} class="size-6 self-center" />
                                <span>{link.label}</span>
                            </a>
                        {/each}
                    </div>

                    {#if recentSearches.length > 0}
                        <ul class="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm" id="options" role="listbox">
                            {#each recentSearches as search, index}
                                <li class="px-4 py-2 select-none hover:bg-neutral-700/50 hover:cursor-pointer" id={`option-${index + 1}`} role="option" aria-selected="false" tabindex="-1">
                                    {search}
                                </li>
                            {/each}
                        </ul>
                    {/if}
                </div>
            </div>
        </div>
    {/if}
</div>
