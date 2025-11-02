<script lang="ts">
	import MagnifyingGlass from '$lib/icons/MagnifyingGlass.svelte';
	import { onMount } from 'svelte';
	import { getOS } from '$lib/utils';

	let username = $state('');

	let showCommandPalette = $state(false);
	let recentSearches: string[] = $state([]);

	function onKeyPress(event: KeyboardEvent) {
		if ((event.ctrlKey || event.metaKey) && event.code === 'KeyK') {
			event.preventDefault();
			showCommandPalette = true;
			recentSearches = localStorage.getItem('searches')?.split(',') || [];
		} else if (event.code === 'Escape') {
			event.preventDefault();
			showCommandPalette = false;
		}
	}

	function onClick(event: MouseEvent) {
		if ((event.target! as Element).id === 'open-palette') {
			if (!showCommandPalette) {
				showCommandPalette = true;
				recentSearches = localStorage.getItem('searches')?.split(',') || [];
			}
		} else if ((event.target! as Element).id === 'command-palette') {
			showCommandPalette = false;
		}
	}

	let os = $state('PC');
	onMount(async () => {
		os = getOS(navigator.userAgent);
	});
</script>

<svelte:window onkeydown={onKeyPress} onclick={onClick} />
<div>
	<button
		id="open-palette"
		type="button"
		class="flex flex-row gap-x-2 rounded-full border-2 border-neutral-800 px-4 py-1 text-sm font-semibold text-neutral-50 shadow-xs duration-100 hover:cursor-pointer hover:bg-neutral-700"
	>
		<span id="open-palette" class="h-4 w-4 self-center"><MagnifyingGlass /></span>
		<span id="open-palette" class="self-center"
			>{os === 'macOS' ? '⌘ K' : os === 'mobile' ? 'Tap' : 'Ctrl K'}</span
		>
	</button>

	{#if showCommandPalette}
		<div class="relative z-20">
			<div class="fixed inset-0 bg-gray-500/15 transition-opacity"></div>

			<div
				id="command-palette"
				class="animate-pallette-in fixed inset-0 z-10 w-screen overflow-y-auto p-4 text-neutral-100 sm:p-6 md:p-20"
			>
				<div
					class="mx-auto max-w-xl transform divide-y divide-neutral-800 overflow-hidden rounded-xl bg-neutral-950 shadow-2xl ring-1 ring-black/5 transition-all"
				>
					<div class="grid grid-cols-1">
						<form method="POST" action="?/getPlayer" class="col-start-1 row-start-1">
							<input
								name="username"
								type="text"
								class="h-12 w-full bg-neutral-950 pr-4 pl-11 outline-none placeholder:text-neutral-400 sm:text-sm"
								placeholder="Search a username..."
								role="combobox"
								aria-expanded="false"
								aria-controls="options"
								bind:value={username}
								autocomplete="off"
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

					{#if recentSearches.length > 0}
						<div class="flex flex-col gap-y-2 p-2">
							<div class="max-h-72 scroll-py-2 overflow-y-auto">
								{#each recentSearches.filter((s) => {
									if (username.length > 0) {
										return s.split(':')[0].toLowerCase().includes(username.toLowerCase());
									} else {
										return true;
									}
								}) as search}
									{@const [name, uuid] = search.split(':')}
									<a
										onclick={() => {
											showCommandPalette = false;
										}}
										href="/player/{name}/games"
										class="flex cursor-pointer gap-x-2 rounded-md p-2 duration-100 hover:bg-neutral-800/50"
									>
										<img
											src="https://mc-heads.net/avatar/{uuid}/128"
											alt=""
											class="size-6 self-center"
										/>
										<span class="self-center text-base">{name}</span>
									</a>
								{/each}
							</div>
							{#if username.length > 0}
								<p class="px-2 pb-2">
									Search for
									<span class="font-semibold">{username}</span>
								</p>
							{/if}
						</div>
					{/if}

					{#if username.length === 0}
						<div class="flex flex-col gap-y-2 p-2">
							<div class="max-h-72 scroll-py-2 overflow-y-auto">
								{#each [{ label: 'View the leaderboards', href: '/leaderboards', icon: 'emojis/crown' }, { label: 'Compare players', href: '/compare', icon: 'icons/trophies/yellow' }, { label: "Let's go gamlbing!", href: '/simulator', icon: 'emojis/sunglasses' }] as { label: string; href: string; icon: string }[] as link}
									<a
										onclick={() => (showCommandPalette = false)}
										class="flex gap-x-2 rounded-md p-2 duration-100 hover:bg-neutral-800/50"
										href={link.href}
									>
										<img
											src={`https://cdn.islandstats.xyz/${link.icon}.png`}
											alt={link.icon}
											class="size-6 self-center"
										/>
										<span class="self-center text-base">{link.label}</span>
									</a>
								{/each}
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>
	{/if}
</div>
