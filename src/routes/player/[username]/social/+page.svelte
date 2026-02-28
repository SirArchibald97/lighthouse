<script lang="ts">
	import { Pagination } from 'bits-ui';
	import type { PageProps } from './$types';
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';
	import SocialLink from '$lib/blocks/player/SocialLink.svelte';
	let { data }: PageProps = $props();

	let page = $state(1);
</script>

{#await data.streamed.player then player}
	<div class="flex flex-col rounded-b-md border-x border-b border-neutral-800">
		{#if player?.social}
			{@const sortedFriends = player.social.friends
				.filter((f) => f.status && f.status.online)
				.concat(player.social.friends.filter((f) => !f.status || !f.status.online))}

			<div class="m-4 flex flex-col gap-x-4 md:flex-row">
				<!-- party -->
				<div class="flex w-full flex-col rounded-lg bg-neutral-800/50 p-4 lg:w-1/3">
					{#if player.social.party.active}
						<div class="flex flex-col gap-y-4">
							<p class="flex gap-x-2 text-xl font-semibold">
								<img
									src="https://cdn.islandstats.xyz/icons/social/party.png"
									alt="Friends Icon"
									class="size-7 self-center"
								/>
								<span class="self-center"
									>Party
									<span class="text-base text-neutral-500">
										({player.social.party.members.length} / 4)</span
									></span
								>
							</p>
							<div class="flex flex-col gap-y-2">
								{#each player.social.party.members as member}
									<SocialLink player={member} />
								{/each}
							</div>
						</div>
					{:else}
						<p class="my-auto flex gap-x-2 self-center">
							<img
								src="https://cdn.islandstats.xyz/icons/warnings/yellow.png"
								alt="Yellow Warning Icon"
								class="size-6 self-center"
							/>
							<span class="self-center font-semibold text-neutral-400">Not partied!</span>
						</p>
					{/if}
				</div>

				<!-- friends -->
				<div
					class="flex h-full w-full flex-col gap-4 rounded-lg bg-neutral-800/50 p-4 lg:h-105 lg:w-2/3"
				>
					<p class="flex gap-x-2 text-xl font-semibold">
						<img
							src="https://cdn.islandstats.xyz/icons/social/friend.png"
							alt="Friends Icon"
							class="size-7 self-center"
						/>
						<span class="self-center"
							>Friends <span class="text-base text-neutral-500"
								>({player.social.friends.length} / 100)</span
							></span
						>
					</p>
					<div class="grid grow grid-cols-1 content-start gap-2 lg:grid-cols-2">
						{#each sortedFriends.slice((page - 1) * 10, page * 10) as friend}
							<SocialLink player={friend} />
						{/each}
					</div>
					<Pagination.Root count={sortedFriends.length} perPage={10} class="self-center" bind:page>
						{#snippet children({ pages, range })}
							<div class="flex items-center">
								<Pagination.PrevButton
									class="hover:bg-dark-10 disabled:text-muted-foreground mr-0 inline-flex size-10 cursor-pointer items-center justify-center rounded-[9px] bg-transparent active:scale-[0.98] disabled:cursor-not-allowed hover:disabled:bg-transparent lg:mr-4"
								>
									<ChevronLeft class="size-6" />
								</Pagination.PrevButton>
								<div class="flex items-center gap-0 lg:gap-2.5">
									{#each pages as page (page.key)}
										{#if page.type === 'ellipsis'}
											<div class="text-foreground-alt text-sm font-medium select-none lg:text-base">
												...
											</div>
										{:else}
											<Pagination.Page
												{page}
												class="p-auto mx-2 size-7 cursor-pointer rounded-lg border border-neutral-800 text-sm duration-100 hover:bg-neutral-800 data-selected:border-0 data-selected:bg-neutral-700 lg:size-9 lg:text-base"
											>
												{page.value}
											</Pagination.Page>
										{/if}
									{/each}
								</div>
								<Pagination.NextButton
									class="hover:bg-dark-10 disabled:text-muted-foreground ml-0 inline-flex size-10 cursor-pointer items-center justify-center rounded-[9px] bg-transparent active:scale-[0.98] disabled:cursor-not-allowed hover:disabled:bg-transparent lg:ml-4"
								>
									<ChevronRight class="size-6" />
								</Pagination.NextButton>
							</div>
						{/snippet}
					</Pagination.Root>
				</div>
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
					<p class="text-lg">Socials are disabled!</p>
				</div>
			</div>
		{/if}
	</div>
{/await}
