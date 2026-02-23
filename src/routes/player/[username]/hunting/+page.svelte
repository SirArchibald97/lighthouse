<script lang="ts">
	import { badges } from '$lib/badges';
	import type { PageProps } from './$types';
	import HuntingBadges from '$lib/blocks/games/HuntingBadges.svelte';
	import ChevronRight from '$lib/icons/ChevronRight.svelte';
	import ChevronDoubleRight from '$lib/icons/ChevronDoubleRight.svelte';
	import AllHuntingBadges from '$lib/blocks/games/AllHuntingBadges.svelte';
	import ChartBar from '$lib/icons/ChartBar.svelte';
	import { Select } from 'bits-ui';
	import { Check, ChevronsUpDown } from '@lucide/svelte';
	let { data }: PageProps = $props();

	const games = [
		{ label: 'All Games', icon: 'lobby' },
		{ label: 'Battle Box', icon: 'battle_box' },
		{ label: 'Sky Battle', icon: 'sky_battle' },
		{ label: 'TGTTOS', icon: 'tgttos' },
		{ label: 'HITW', icon: 'hitw' },
		{ label: 'Dynaball', icon: 'dynaball' },
		{ label: 'PKW Dojo', icon: 'parkour_warrior/solo' },
		{ label: 'PKW Survivor', icon: 'parkour_warrior' },
		{ label: 'Rocket Spleef', icon: 'rocket_spleef' }
	] as { label: string; icon: string }[];

	let gameFilter = $state<{ label: string; icon: string }>(games[0]);

	let forNextTier = $state(true);

	const orders = ['Games Left', 'Stats Left', 'Trophies'];
	let order = $state(orders[0]);
	function cycleOrder() {
		const currentIndex = orders.indexOf(order);
		const nextIndex = (currentIndex + 1) % orders.length;
		order = orders[nextIndex];
	}
</script>

{#await data.streamed.player then player}
	<div class="rounded-b-md border-x border-b border-neutral-800">
		{#if player?.statistics}
			<div class="flex flex-col gap-y-2 p-4">
				<div class="flex flex-col justify-between pb-4 md:flex-row">
					<div class="pl-1">
						<p class="text-xl font-semibold">Recommended Badges</p>
						<p class="text-base text-neutral-400">
							Which tiered badges are you closest to completing?
						</p>
					</div>

					<div
						class="mt-4 flex w-full flex-col gap-x-4 gap-y-2 self-start md:mt-0 md:w-auto md:flex-row"
					>
						<Select.Root
							type="single"
							onValueChange={(v) => (gameFilter = games.find((g) => g.label === v)!)}
							items={games.map((g) => ({ value: g.label, label: g.label }))}
							allowDeselect={false}
						>
							<Select.Trigger
								class="data-placeholder:text-foreground-alt/50 inline-flex w-74 cursor-pointer touch-none items-center rounded-md border border-neutral-800 px-2.75 py-2 text-base transition-colors select-none hover:bg-neutral-800/50"
								aria-label="Select a theme"
							>
								{#if gameFilter}
									<img
										src="https://cdn.islandstats.xyz/games/{gameFilter.icon}/icon.png"
										alt="{gameFilter.label} Icon"
										class="mr-2 size-6 self-center"
									/>
								{/if}
								{gameFilter!.label}
								<ChevronsUpDown class="ml-auto size-6" />
							</Select.Trigger>
							<Select.Portal>
								<Select.Content
									class="focus-override shadow-popover data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 h-96 max-h-(--bits-select-content-available-height) w-(--bits-select-anchor-width) min-w-(--bits-select-anchor-width) rounded-lg border border-neutral-800 bg-neutral-900 px-1 py-3 outline-hidden select-none data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1"
									sideOffset={10}
								>
									<Select.ScrollUpButton class="flex w-full items-center justify-center">
										<ChevronsUpDown class="size-3" />
									</Select.ScrollUpButton>
									<Select.Viewport class="p-1">
										{#each games as game, i (i + game.label)}
											<Select.Item
												class="flex w-full cursor-pointer items-center rounded-md py-3 pr-1.5 pl-5 text-sm text-neutral-100 capitalize outline-hidden select-none data-disabled:opacity-50 data-highlighted:bg-neutral-700"
												value={game.label}
												label={game.label}
											>
												{#snippet children({ selected })}
													<div class="flex gap-x-2">
														<img
															src="https://cdn.islandstats.xyz/games/{game.icon}/icon.png"
															alt="{game.label} Icon"
															class="size-6 self-center"
														/>
														{game.label}
													</div>
													{#if selected}
														<div class="ml-auto">
															<Check aria-label="check" />
														</div>
													{/if}
												{/snippet}
											</Select.Item>
										{/each}
									</Select.Viewport>
									<Select.ScrollDownButton class="flex w-full items-center justify-center">
										<ChevronsUpDown class="size-3" />
									</Select.ScrollDownButton>
								</Select.Content>
							</Select.Portal>
						</Select.Root>

						<div class="flex gap-x-2">
							<!-- tier -->
							<button
								onclick={() => (forNextTier = !forNextTier)}
								class="flex w-1/2 cursor-pointer justify-center gap-x-2 rounded-md border border-neutral-800 px-2 py-2 duration-100 hover:bg-neutral-800/60 md:w-auto"
							>
								<span class="size-5 self-center"
									>{#if forNextTier}<ChevronRight />{:else}<ChevronDoubleRight />{/if}</span
								>
								<p class="self-center">{forNextTier ? 'Next' : 'Final'} Tier</p>
							</button>

							<!-- order -->
							<button
								onclick={cycleOrder}
								class="flex w-1/2 cursor-pointer justify-center gap-x-2 rounded-md border border-neutral-800 px-2 py-2 duration-100 hover:bg-neutral-800/60 md:w-auto"
							>
								<span class="size-5 self-center">
									{#if order === 'Games Left'}
										<ChartBar />
									{:else if order === 'Stats Left'}
										<ChartBar />
									{:else if order === 'Trophies'}
										<img
											src="https://cdn.islandstats.xyz/icons/trophies/red.png"
											alt="Trophies Icon"
											class="size-5 self-center"
										/>
									{/if}
								</span>
								<p class="self-center">{order}</p>
							</button>
						</div>
					</div>
				</div>

				{#if gameFilter}
					{#if gameFilter.label === 'All Games'}
						<AllHuntingBadges
							{player}
							{forNextTier}
							sortedBy={order}
							all={true}
							badges={badges.battle_box_tiered
								.concat(badges.sky_battle_tiered)
								.concat(badges.tgttos_tiered)
								.concat(badges.hitw_tiered)
								.concat(badges.dynaball_tiered)
								.concat(badges.dojo_tiered)
								.concat(badges.survivor_tiered)
								.concat(badges.rocket_spleef_tiered)}
						/>
					{:else if gameFilter.label === 'Battle Box'}
						<HuntingBadges
							stats={player.statistics.battle_box}
							badges={badges.battle_box_tiered}
							gameIcon="battle_box"
							{forNextTier}
							sortedBy={order}
							all={false}
						/>
					{:else if gameFilter.label === 'Sky Battle'}
						<HuntingBadges
							stats={player.statistics.sky_battle.quads}
							badges={badges.sky_battle_tiered}
							gameIcon="sky_battle"
							{forNextTier}
							sortedBy={order}
							all={false}
						/>
					{:else if gameFilter.label === 'TGTTOS'}
						<HuntingBadges
							stats={player.statistics.tgttos}
							badges={badges.tgttos_tiered}
							gameIcon="tgttos"
							{forNextTier}
							sortedBy={order}
							all={false}
						/>
					{:else if gameFilter.label === 'HITW'}
						<HuntingBadges
							stats={player.statistics.hitw}
							badges={badges.hitw_tiered}
							gameIcon="hitw"
							{forNextTier}
							sortedBy={order}
							all={false}
						/>
					{:else if gameFilter.label === 'Dynaball'}
						<HuntingBadges
							stats={player.statistics.dynaball}
							badges={badges.dynaball_tiered}
							gameIcon="dynaball"
							{forNextTier}
							sortedBy={order}
							all={false}
						/>
					{:else if gameFilter.label === 'PKW Dojo'}
						<HuntingBadges
							stats={player.statistics.pkw.dojo}
							badges={badges.dojo_tiered}
							gameIcon="parkour_warrior/solo"
							{forNextTier}
							sortedBy={order}
							all={false}
						/>
					{:else if gameFilter.label === 'PKW Survivor'}
						<HuntingBadges
							stats={player.statistics.pkw.survivor}
							badges={badges.survivor_tiered}
							gameIcon="parkour_warrior"
							{forNextTier}
							sortedBy={order}
							all={false}
						/>
					{:else if gameFilter.label === 'Rocket Spleef'}
						<HuntingBadges
							stats={player.statistics.rocket_spleef}
							badges={badges.rocket_spleef_tiered}
							gameIcon="rocket_spleef"
							{forNextTier}
							sortedBy={order}
							all={false}
						/>
					{/if}
				{:else}
					<div
						class="flex flex-row items-center justify-center rounded-lg bg-neutral-950/40 py-16 text-neutral-400"
					>
						<div class="flex flex-col gap-y-1">
							<img
								src="https://cdn.islandstats.xyz/icons/warnings/yellow.png"
								alt="Orange warning icon"
								class="size-8 self-center"
							/>
							<p class="text-lg">No game selected!</p>
						</div>
					</div>
				{/if}
			</div>
		{:else}
			<div
				class="flex flex-row items-center justify-center rounded-lg bg-neutral-950/40 py-16 text-neutral-400"
			>
				<div class="flex flex-col gap-y-1">
					<img
						src="https://cdn.islandstats.xyz/icons/warnings/orange.png"
						alt="Orange warning icon"
						class="size-8 self-center"
					/>
					<p class="text-lg">Statistics are disabled!</p>
				</div>
			</div>
		{/if}
	</div>
{/await}
