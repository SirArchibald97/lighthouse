<script lang="ts">
    import { page } from "$app/state";
	import { slide } from "svelte/transition";
	import CommandPalette from "./CommandPalette.svelte";

    let active = $state(page.url.pathname);
    const pages = [
        { label: "Leaderboards", href: "/leaderboards" },
        { label: "Compare", href: "/compare" },
        { label: "Openable Simulator", href: "/simulator" }
    ];

    let mobileMenuOpen = $state(false);
</script>

<nav class="bg-neutral-950 shadow-xs">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 justify-between">
			<div class="flex flex-row justify-between">
                <div class="flex shrink-0 items-center">
                    <a href="/">
                        <img src="https://cdn.islandstats.xyz/emojis/crown.png" alt="Crown Emoji Icon" class="size-8" />
                    </a>
                </div>
                <div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8 *:duration-75">
                    {#each pages as page}
                        <a
                            href={page.href}
                            class={`inline-flex items-center border-b-4 px-1 pt-1 text-sm font-medium ${active === page.href ? "border-neutral-50 text-neutral-50" : "border-transparent text-neutral-400 hover:border-neutral-100 hover:text-neutral-100"}`}
                            aria-current="page"
                        >
                            {page.label}
                        </a>
                    {/each}
                </div>
            </div>
            <div class="self-center">
                <CommandPalette />
            </div>
            
			<div class="-mr-2 flex items-center sm:hidden">
				<button
					type="button"
                    onclick={() => mobileMenuOpen = !mobileMenuOpen}
					class="relative inline-flex items-center justify-center rounded-md bg-neutral-800 p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
					aria-controls="mobile-menu"
					aria-expanded="false"
				>
					<span class="absolute -inset-0.5"></span>
					<span class="sr-only">Open main menu</span>
					<svg
						class={`${mobileMenuOpen ? "hidden" : "block"} size-6`}
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						aria-hidden="true"
						data-slot="icon"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
						/>
					</svg>
					<svg
						class={`${mobileMenuOpen ? "block" : "hidden"} size-6`}
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						aria-hidden="true"
						data-slot="icon"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
		</div>
	</div>

	{#if mobileMenuOpen}
        <div class="sm:hidden" transition:slide={{ duration: 100 }} id="mobile-menu">
            <div class="flex flex-col justify-center gap-y-1 pt-2 pb-3">
                {#each pages as page}
                    <a
                        onclick={() => mobileMenuOpen = false}
                        href={page.href}
                        class={`border-b-4 px-4 pt-1 text-sm font-medium ${active === page.href ? "border-neutral-50 text-neutral-50" : "border-transparent text-neutral-400 hover:border-neutral-100 hover:text-neutral-100"}`}
                        aria-current="page"
                    >
                        {page.label}
                    </a>
                {/each}
            </div>
        </div>
    {/if}
</nav>
