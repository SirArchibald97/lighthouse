<script>
    let username = $state("");
</script>

<div class="flex flex-col gap-y-6 items-center my-44 animate-fade-slow">
    <div class="flex flex-col gap-y-2 items-center">
        <h1 class="text-5xl md:text-7xl font-extrabold">Lighthouse</h1>
        <h2 class="text-lg md:text-3xl font-bold">by SirArchibald</h2>
    </div>

    <form method="POST" action="?/getPlayer" class="flex flex-row gap-x-3 bg-neutral-950 rounded-lg">
        <svg
            class="pointer-events-none ml-4 size-5 self-center text-gray-400"
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
        <input
            name="username"
            type="text"
            class="h-8 md:h-12 py-2 w-full bg-neutral-950 rounded-lg placeholder:text-neutral-400 text-sm md:text-md"
            placeholder="Search a username..."
            role="combobox"
            aria-expanded="false"
            aria-controls="options"
            bind:value={username}
        />
    </form>
</div>