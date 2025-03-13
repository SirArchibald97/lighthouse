<script lang="ts">
    import { page } from "$app/state";

    let active = $state(page.url.pathname);
    const pages = [
        { label: "Leaderboards", href: "/leaderboards" },
        { label: "Compare", href: "/compare" },
        { label: "Openable Simulator", href: "/simulator" }
    ];
</script>

<nav class="bg-neutral-950 shadow-xs">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 justify-between">
			<div class="flex flex-row justify-between">
				<div class="flex flex-row">
                    <div class="flex shrink-0 items-center">
                        <img
                            class="block h-8 w-auto lg:hidden"
                            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                            alt="Your Company"
                        />
                        <img
                            class="hidden h-8 w-auto lg:block"
                            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                            alt="Your Company"
                        />
                    </div>
                    <div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8 *:duration-75">
                        {#each pages as page, index}
                            <a
                                href={page.href}
                                class={`inline-flex items-center border-b-4 px-1 pt-1 text-sm font-medium ${active === page.href ? "border-neutral-50 text-neutral-50" : "border-transparent text-neutral-400 hover:border-neutral-100 hover:text-neutral-100"}`}
                                aria-current="page">{page.label}</a
                            >
                        {/each}
                    </div>
                </div>
                <div class="self-center">
                    <input type="username" name="username" id="username" class="block w-full rounded-md bg-neutral-100 px-3 py-1.5 text-base text-neutral-900 outline-1 -outline-offset-1 outline-neutral-300 placeholder:text-neutral-400 px-2 focus:px-0 duration-100 sm:text-sm/6" placeholder="Search a player">
                </div>
            </div>
            
			<div class="-mr-2 flex items-center sm:hidden">
				<!-- Mobile menu button -->
				<button
					type="button"
					class="relative inline-flex items-center justify-center rounded-md bg-neutral-800 p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
					aria-controls="mobile-menu"
					aria-expanded="false"
				>
					<span class="absolute -inset-0.5"></span>
					<span class="sr-only">Open main menu</span>
					<!-- Menu open: "hidden", Menu closed: "block" -->
					<svg
						class="block size-6"
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
					<!-- Menu open: "block", Menu closed: "hidden" -->
					<svg
						class="hidden size-6"
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

	<!-- Mobile menu, show/hide based on menu state. -->
	<div class="sm:hidden" id="mobile-menu">
		<div class="space-y-1 pt-2 pb-3">
			<!-- Current: "border-indigo-500 bg-indigo-50 text-indigo-700", Default: "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800" -->
			<a
				href="#"
				class="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pr-4 pl-3 text-base font-medium text-indigo-700"
				aria-current="page">Dashboard</a
			>
			<a
				href="#"
				class="block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
				>Team</a
			>
			<a
				href="#"
				class="block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
				>Projects</a
			>
			<a
				href="#"
				class="block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
				>Calendar</a
			>
		</div>
		<div class="border-t border-gray-200 pt-4 pb-3">
			<div class="flex items-center px-4">
				<div class="shrink-0">
					<img
						class="size-10 rounded-full"
						src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
						alt=""
					/>
				</div>
				<div class="ml-3">
					<div class="text-base font-medium text-gray-800">Tom Cook</div>
					<div class="text-sm font-medium text-gray-500">tom@example.com</div>
				</div>
				<button
					type="button"
					class="relative ml-auto shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
				>
					<span class="absolute -inset-1.5"></span>
					<span class="sr-only">View notifications</span>
					<svg
						class="size-6"
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
							d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
						/>
					</svg>
				</button>
			</div>
			<div class="mt-3 space-y-1">
				<a
					href="#"
					class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
					>Your Profile</a
				>
				<a
					href="#"
					class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
					>Settings</a
				>
				<a
					href="#"
					class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
					>Sign out</a
				>
			</div>
		</div>
	</div>
</nav>
