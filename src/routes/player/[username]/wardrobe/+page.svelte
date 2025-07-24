<script lang="ts">
	import { calculatePercentage, calculateStyleLevel, getCrownColour, getRarityColour, trophiesForStyleLevel } from '$lib/utils';
    import type { PageProps } from './$types';
	import { slide } from 'svelte/transition';
	import ChevronUpDown from '$lib/icons/ChevronUpDown.svelte';
	import { Tooltip } from 'flowbite-svelte';
	import WardrobeCollectionStats from '$lib/blocks/wardrobe/WardrobeCollectionStats.svelte';
	let { data }: PageProps = $props();

    let cosmeticName = $state("");
    let includeLocked = $state(true);

    function toggleLocked() { includeLocked = !includeLocked }

    const collections = [
        "Natural",
        "Oceanic",
        "Mechanical",
        "Magical",
        "Fishing",
        "Mythic",
        "Arena",
        "Cloudy",
        "Cuckoo",
        "Slimy",
        "Explosive",
        "Ninja",
        "Pose",
        "Hidden",
        "Arcane Gate",
        "Seasonal Variety",
        "Limited Seasonal",
        "Mystical Aquatic",
        "Neon Galaxy",
        "Candy Factory",
        "Ancient Jungle",
        "Cyber Surge",
        "Flex",
        "Special",
        "Limited Special",
        "Limited Event",
        "Particle"
    ];
    let openCollection = $state("");

    const cosmeticTypes = {
        ["Goggles (Tinted Over-Eye)"]: "Exclusive",
        ["Goggles (Tinted)"]: "Exclusive",
        ["Popsicle (Friend-Shaped)"]: "Exclusive",
        ["Popsicle (Giga)"]: "Exclusive",
        ["Competitor's Helmet (Slimed)"]: "Exclusive",
        ["Head in the Wall (Toxic)"]: "Exclusive",
        ["Competitor's Safety Pad (Slimed)"]: "Exclusive",
        ["Slime Fist (Toxic)"]: "Exclusive",
        ["Slimeling (Kawaii)"]: "Exclusive",
        ["Slimeling (Loot)"]: "Exclusive",
        ["Slimeling (King Slime)"]: "Exclusive",
        ["Slimeling (Magma)"]: "Exclusive",
        ["Egg Yolk (Fried)"]: "Exclusive",
        ["Claim Flag (Feathers)"]: "Exclusive",
        ["Road Sign (Go)"]: "Exclusive",
        ["Road Sign (Warning)"]: "Exclusive",
        ["Chicken-Copter (McSquawk)"]: "Exclusive",
        ["Traffic Cone (Roadworks)"]: "Exclusive",
        ["Chicken Wing (Hot!)"]: "Exclusive",
        ["Traffic Light (Junction)"]: "Exclusive",
        ["Chicken Head (Cyborg)"]: "Exclusive",
        ["Chicken Head (Golden)"]: "Exclusive",
        ["Chicken Head (Clucktoons)"]: "Exclusive",
        ["Chicken Head (Zombie)"]: "Exclusive",
        ["Crusader (Sunlord)"]: "Exclusive",
        ["Viking Helmet (Horned)"]: "Exclusive",
        ["Knight Shield (Ornamental)"]: "Exclusive",
        ["Viking Shield (Battleworn)"]: "Exclusive",
        ["Crusader (Black Knight)"]: "Exclusive",
        ["Viking Helmet (Prestiged)"]: "Exclusive",
        ["Knight Shield (Goldshire)"]: "Exclusive",
        ["Viking Shield (Dragon)"]: "Exclusive",
        ["Fenrir (Steelwulf)"]: "Exclusive",
        ["Knight Helmet (Goldshire)"]: "Exclusive",
        ["Fenrir (Fire)"]: "Exclusive",
        ["Knight Helmet (Darklands)"]: "Exclusive",
        ["Winged Helmet (Gold Trim)"]: "Exclusive",
        ["Winged Helmet (Thunder)"]: "Exclusive",
        ["Zeus Bolt (Catch!)"]: "Exclusive",
        ["Zeus Bolt (Lightning)"]: "Exclusive",
        ["Cloud Fist (Lightning)"]: "Exclusive",
        ["Cloud Fist (Stormy)"]: "Exclusive",
        ["Mjölnir (Charged)"]: "Exclusive",
        ["Mjölnir (Thunder)"]: "Exclusive",
        ["Zeus (Athens)"]: "Exclusive",
        ["Zeus (Golden)"]: "Exclusive",
        ["Zeus (Lightning)"]: "Exclusive",
        ["Zeus (Stormy)"]: "Exclusive",
        ["Bandana (Blindfold)"]: "Exclusive",
        ["Parkour Staff (Bamboo)"]: "Exclusive",
        ["Shuriken (Deadaim)"]: "Exclusive",
        ["Parkour Cowl (Ninja Frog)"]: "Exclusive",
        ["Master Frog (Statue)"]: "Exclusive",
        ["Master Frog (Golden)"]: "Exclusive",
        ["Sai (Ignited)"]: "Exclusive",
        ["Sensei (Stripe)"]: "Exclusive",
        ["Katana (Cherry Blossoms)"]: "Exclusive",
        ["Kitsune Mask (Black)"]: "Exclusive",
        ["Paper Umbrella (Sakura)"]: "Exclusive",
        ["Paper Umbrella (Blossoms)"]: "Exclusive",
        ["Dynamite Stick (Bundled)"]: "Exclusive",
        ["Motorcycle Helmet (Daredevil)"]: "Exclusive",
        ["Hothead (Cheri)"]: "Exclusive",
        ["Box o' Explosives"]: "Exclusive",
        ["Krate"]: "Exclusive",
        ["Arm Cannon (Chicken Ballistics)"]: "Exclusive",
        ["Dynamite Stick (Nuclear)"]: "Exclusive",
        ["Atomic Armor"]: "Exclusive",
        ["Atomic Adventurer"]: "Exclusive",
        ["Box o' Explosives (Nuclear Meltdown)"]: "Exclusive",
        ["Krate (Atomic Menace)"]: "Exclusive",
        ["Rocky Rocket (Radioactive)"]: "Exclusive",
        ["Sun Visor (Lifeguard)"]: "Limited",
        ["Rescue Paddle"]: "Limited",
        ["Lifebuoy"]: "Limited",
        ["Bunny Rod"]: "Limited",
        ["Crane Rod"]: "Limited",
        ["Cyber Rod"]: "Limited",
        ["Harpoon Rod"]: "Limited",
        ["Candy Cane"]: "Limited",
        ["Winter Rod"]: "Limited",
        ["Franken-Fist"]: "Limited",
        ["Oni Armor (Cursed)"]: "Limited",
        ["Sea Shell"]: "Limited",
        ["Tropical"]: "Limited",
        ["Clown Mallet (Spiral)"]: "Limited",
        ["Anemonelly"]: "Limited",
        ["Jolly Gifts"]: "Limited",
        ["Sun Hat (Coastal)"]: "Limited",
        ["Witch Hat (Wicked)"]: "Limited",
        ["Mega Whip (Sundae)"]: "Limited",
        ["Candy Cat"]: "Limited",
        ["Sunny"]: "Limited",
        ["Squidtek Agent"]: "Limited",
        ["Snorkel (Bubbles)"]: "Limited",
        ["Scythe (Wraith)"]: "Limited",
        ["Ski Helmet"]: "Limited",
        ["Shroud (Wraith)"]: "Limited",
        ["Winter Scarf"]: "Limited",
        ["Sandcastle Crown"]: "Limited",
        ["Milkshake (Summer Lemon)"]: "Limited",
        ["Witch's Broom (Wicked)"]: "Limited",
        ["Oni Mask (Cursed)"]: "Limited",
        ["Mega Whip"]: "Limited",
        ["Ski Pole"]: "Limited",
        ["Anemone"]: "Limited",
        ["Ice Cream (Cherry-Chocolate-Whip)"]: "Limited",
        ["Hydroblaster (Squidtek)"]: "Limited",
        ["Hayseed (Haunted)"]: "Limited",
        ["Frank Jr."]: "Limited",
        ["Popsicle (Triple Blast)"]: "Limited",
        ["Twisted"]: "Limited",
        ["Elf's Hat"]: "Limited",
        ["Coral Crown"]: "Limited",
        ["Aquatank"]: "Limited",
        ["Kanabō (Cursed)"]: "Limited",
        ["Snowtube"]: "Limited",
        ["Crow's Perch"]: "Limited",
        ["Pumpkin Bucket"]: "Limited",
        ["Popsicle (Mascot)"]: "Limited",
        ["Coral Fist"]: "Limited",
        ["Cybercat Tail"]: "Limited",
        ["Singularity Core"]: "Limited",
        ["Candy Contraption"]: "Limited",
        ["Oni Mask (Holographic)"]: "Limited",
        ["Toxin Mask"]: "Limited",
        ["Munchflower Arm"]: "Limited",
        ["Scuba Watch"]: "Limited",
        ["Spider Bud"]: "Limited",
        ["Mixing Claw"]: "Limited",
        ["Robo-Ducky"]: "Limited",
        ["Gauntlet (Toxin)"]: "Limited",
        ["Shroud (Voyager)"]: "Limited",
        ["Scuba Headgear"]: "Limited",
        ["Cybercat Head"]: "Limited",
        ["Paper Umbrella (Holographic)"]: "Limited",
        ["Toilet Jet"]: "Limited",
        ["Munchflower Sprout"]: "Limited",
        ["Scuba Tank"]: "Limited",
        ["Munchflower Leaf"]: "Limited",
        ["Cybercat Paw"]: "Limited",
        ["Spider Claws"]: "Limited",
        ["Candy Bot"]: "Limited",
        ["Oni Cloak (Holographic)"]: "Limited",
        ["Caution Sword"]: "Limited",
        ["Scepter of Singularity"]: "Limited",
        ["Spider Goggles"]: "Limited",
        ["Toxin Tank"]: "Limited",
        ["Beetle Crown"]: "Collector",
        ["Leviathan Frills"]: "Collector",
        ["Style Shard Crown"]: "Collector",
        ["Witch Hat of Anomalies"]: "Collector",
        ["Beetle Staff"]: "Collector",
        ["Book of Anomalies"]: "Collector",
        ["Leviathan Tentacle"]: "Collector",
        ["Style Shard Staff"]: "Collector",
        ["Beetle Wings"]: "Collector",
        ["Leviathan Tentacles"]: "Collector",
        ["Style Shard Cape"]: "Collector",
        ["Totem of Anomalies"]: "Collector",
        ["Octopus"]: "Exclusive",
        ["Harpoon (Sunken)"]: "Exclusive",
        ["Headphones (Squidtek)"]: "Exclusive",
        ["Jellyfish"]: "Exclusive",
        ["Umbrella (Beach)"]: "Exclusive",
        ["Diving Helmet (Sunken)"]: "Exclusive",
        ["Poseidon's Trident"]: "Exclusive",
        ["Blubberfish"]: "Exclusive",
        ["Squidtek Visor"]: "Exclusive",
        ["Hydroblaster"]: "Exclusive",
        ["Bubble Fist"]: "Exclusive",
        ["Sea Shell (H.E.R.M.I.T)"]: "Exclusive",
        ["Poseidon's Crown"]: "Exclusive",
        ["Jellyfist"]: "Exclusive",
        ["Arm Cannon (B.W.B 8000)"]: "Exclusive",
        ["Poseidon's Cloak"]: "Exclusive",
        ["Surfboard (Squidtek)"]: "Exclusive",
        ["Quackshot"]: "Exclusive",
        ["Jellyfish Tendrils"]: "Exclusive",
        ["Starfish Staff"]: "Exclusive",
        ["Surfboard (Palms)"]: "Exclusive",
        ["Space Slug"]: "Exclusive",
        ["Star Sailor's Staff (Crescent)"]: "Exclusive",
        ["Cosmic Visor (Solar Navigator)"]: "Exclusive",
        ["Comet Fist"]: "Exclusive",
        ["LARR-E"]: "Exclusive",
        ["Void Head"]: "Exclusive",
        ["Cosmic Sword"]: "Exclusive",
        ["Star Sailor's Tiara"]: "Exclusive",
        ["Star Sailor"]: "Exclusive",
        ["Ray Blaster (Alien)"]: "Exclusive",
        ["Alien Visor"]: "Exclusive",
        ["Comet Head"]: "Exclusive",
        ["Believer"]: "Exclusive",
        ["Cosmic Wings"]: "Exclusive",
        ["Space Slime"]: "Exclusive",
        ["Gauntlet (Starforged)"]: "Exclusive",
        ["Star Sailor's Tutu"]: "Exclusive",
        ["Star Sailor's Staff"]: "Exclusive",
        ["Lunar Claw"]: "Exclusive",
        ["Alien Antennae"]: "Exclusive",
        ["Void Fist"]: "Exclusive",
        ["Gummi"]: "Exclusive",
        ["S'more Staff"]: "Exclusive",
        ["Cupcake Staff"]: "Exclusive",
        ["S'more Staff (Royalty)"]: "Exclusive",
        ["Cupcake (Choco)"]: "Exclusive",
        ["Cupcake Staff (Spearhead)"]: "Exclusive",
        ["Cupcake"]: "Exclusive",
        ["Candy Hood"]: "Exclusive",
        ["Mellowhead (Crackers)"]: "Exclusive",
        ["Lil' Gummi"]: "Exclusive",
        ["Cupcake (Knight)"]: "Exclusive",
        ["Mellowhead (S'more'd)"]: "Exclusive",
        ["Choco Cloak"]: "Exclusive",
        ["Lollipop Staff (Chancellor)"]: "Exclusive",
        ["Mellowhead (Monarch)"]: "Exclusive",
        ["Choco Chancellor"]: "Exclusive",
        ["Choccy"]: "Exclusive",
        ["Gummi Paw"]: "Exclusive",
        ["Lollipop Staff"]: "Exclusive",
        ["S'more Staff (Charred)"]: "Exclusive",
        ["Hot Chocolate"]: "Exclusive",
        ["Swarm Basket"]: "Exclusive",
        ["Raptor Skull"]: "Exclusive",
        ["Beetleface"]: "Exclusive",
        ["Witch Doctor's Mask"]: "Exclusive",
        ["Skull Crown (Stone)"]: "Exclusive",
        ["Volcano Torch"]: "Exclusive",
        ["Torch Head"]: "Exclusive",
        ["Stone Dragon Emperor"]: "Exclusive",
        ["Skull Crown (Golden)"]: "Exclusive",
        ["Hive Fist"]: "Exclusive",
        ["Tail of Wisdom"]: "Exclusive",
        ["Bone Club"]: "Exclusive",
        ["Sabertooth Cap"]: "Exclusive",
        ["Rock on Head"]: "Exclusive",
        ["Voodoo Doll"]: "Exclusive",
        ["Bone Spear"]: "Exclusive",
        ["Direwolf Cap"]: "Exclusive",
        ["Skull Crown (Crystal)"]: "Exclusive",
        ["Beehive"]: "Exclusive",
        ["Wheel of Destiny"]: "Exclusive",
        ["Jawbone Saw"]: "Exclusive",
        ["Android Axe"]: "Exclusive",
        ["Hacker Headset"]: "Exclusive",
        ["Hacker Terminal"]: "Exclusive",
        ["Cyber Fist"]: "Exclusive",
        ["Cyber Helmet"]: "Exclusive",
        ["Watcher Eye"]: "Exclusive",
        ["Android Helmet"]: "Exclusive",
        ["Android Brain"]: "Exclusive",
        ["Hover Pilot Helmet"]: "Exclusive",
        ["Holographic Crown"]: "Exclusive",
        ["Server Rack"]: "Exclusive",
        ["Holographic Axe"]: "Exclusive",
        ["Mohawk (Cyber)"]: "Exclusive",
        ["Guitar (Cyber)"]: "Exclusive",
        ["Watcher Fist"]: "Exclusive",
        ["Holographic Wings"]: "Exclusive",
        ["Watcher Pack"]: "Exclusive",
        ["Microphone (Cyber)"]: "Exclusive",
        ["Moai Head (Grooving)"]: "Exclusive",
        ["Waffle Shield"]: "Exclusive",
        ["Dart Bracer"]: "Exclusive",
        ["Cosmic Visor"]: "Exclusive",
        ["Skull Orb (Golden)"]: "Exclusive",
        ["Starbeam Laser"]: "Exclusive",
        ["Crab Claw"]: "Exclusive",
        ["Lollipop Staff (Sticky)"]: "Exclusive",
        ["Skull Orb (Stone)"]: "Exclusive",
        ["Pumpkin Scooper"]: "Exclusive",
        ["Lollipop Staff (Minty)"]: "Exclusive",
        ["Cyclops"]: "Exclusive",
        ["Gumball Head"]: "Exclusive",
        ["Heart Glasses"]: "Exclusive",
        ["Treat Tracker"]: "Exclusive",
        ["Haunted Doll"]: "Exclusive",
        ["Summer Shades"]: "Exclusive",
        ["Constellation Cartographer"]: "Exclusive",
        ["Star Scouter"]: "Exclusive",
        ["Lantern (Haunted)"]: "Exclusive",
        ["Spirit Orb"]: "Exclusive",
        ["Candy Flow"]: "Exclusive",
        ["Shades (Sunset)"]: "Exclusive",
        ["Spell Shield (Solar)"]: "Exclusive",
        ["Pumpkin Spirit"]: "Exclusive",
        ["Feathery Cap"]: "Exclusive",
        ["Waffle Stack"]: "Exclusive",
        ["Halo (Candy)"]: "Exclusive",
        ["Hairbow (Peppermint)"]: "Exclusive",
        ["Lay-Ka"]: "Exclusive",
        ["Sewing Needle"]: "Exclusive",
        ["Potion Frenzy"]: "Exclusive",
        ["Surfboard (Suns' Out)"]: "Exclusive",
        ["Exo-Helmet"]: "Exclusive",
        ["Crab Hat"]: "Exclusive",
        ["Bone Claw"]: "Exclusive",
        ["Choco Shield"]: "Exclusive",
        ["Skull Orb (Crystal)"]: "Exclusive",
        ["Blowdart"]: "Exclusive",
        ["Astronaut Helmet (Star-Ranger)"]: "Exclusive",
        ["Feathery Arm"]: "Exclusive",
        ["Ancient Potion"]: "Exclusive",
        ["Exo-Arm"]: "Exclusive",
        ["Cyclops Fist"]: "Exclusive",
        ["Peacock Tail"]: "Arcane",
        ["Wizard Staff (Ember Mage)"]: "Arcane",
        ["Abomination Staff"]: "Arcane",
        ["Tidal Lord Cloak"]: "Arcane",
        ["Tidal Lord Staff"]: "Arcane",
        ["Abomination Mask"]: "Arcane",
        ["Tidal Lord Crown"]: "Arcane",
        ["Wizard Hat (Ember Mage)"]: "Arcane",
        ["Abomination Robe"]: "Arcane",
        ["Peacock Crown"]: "Arcane",
        ["Wizard Cloak (Ember Mage)"]: "Arcane",
        ["Peacock Staff"]: "Arcane"
    } as { [name: string]: string };
</script>

{#await data.streamed.player then player}
    <div class="border-b border-x border-neutral-800 rounded-b-md">
        {#if player?.collections?.cosmetics}
            {@const styleLevel: { level: number, progressThroughLevel: number, totalForLevel: number } = calculateStyleLevel(player.trophies.style.total) || { level: 0, progressThroughLevel: 0, totalForLevel: 0 }}

            <div class="flex flex-col gap-y-2 p-4">
                <div class="flex justify-center">
                    <div class="w-full md:w-7/12 flex flex-col items-center p-4">
                        <div class="flex flex-row justify-between w-full">
                            <img src="https://cdn.islandstats.xyz/icons/style_level/{Math.floor(styleLevel.level / 10)}.png" alt={``} class="size-8" />
                            <span class="pl-2 text-xl font-bold self-center">{styleLevel.level}</span>
                    
                            <div class="overflow-hidden rounded-full w-full mx-4 bg-neutral-800 self-center">
                                <div 
                                    class={`h-4 rounded-l-full ${getCrownColour(styleLevel.level)}`} 
                                    style={`width: ${styleLevel.progressThroughLevel / styleLevel.totalForLevel * 100}%`}
                                ></div>
                            </div>
                    
                            <span class="text-xl font-bold self-center">{styleLevel.level + 1}</span>
                        </div>
                        <div class="flex flex-col md:flex-row items-center justify-between gap-x-2 text-neutral-500 mt-2 gap-y-1 text-base">
                            <p class="self-center">
                                <span class="text-neutral-300 tabular-nums">
                                    {Math.round((styleLevel.progressThroughLevel / styleLevel.totalForLevel * 100) * 10) / 10}%
                                </span>
                                <span class="text-neutral-300 tabular-nums">
                                    ({styleLevel.progressThroughLevel.toLocaleString()}/{styleLevel.totalForLevel.toLocaleString()})
                                </span>
                            </p>
                            <p class="hidden md:flex"> / </p>
                            <p class="flex flex-row gap-x-1.5 items-center">
                                <span class="flex flex-row gap-x-1 text-neutral-300">
                                    <img src={`https://cdn.islandstats.xyz/icons/style_level/${Math.floor(styleLevel.level / 10) + 1}.png`} alt={`Style Level ${Math.floor(styleLevel.level / 10) + 1} Icon`} class="size-5 self-center" />
                                    <span class="font-semibold tabular-nums">{Math.ceil(styleLevel.level / 10) * 10}</span>
                                </span>
                                <span>in</span>
                                <span class="flex flex-row gap-x-1 text-neutral-300">
                                    <img src={`https://cdn.islandstats.xyz/icons/trophies/purple.png`} alt="Trophy Icon" class="size-5 self-center" />
                                    <span class="font-semibold tabular-nums">{(trophiesForStyleLevel(Math.ceil(styleLevel.level / 10) * 10) - player.trophies.style.total).toLocaleString()}</span>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col md:flex-row gap-2">
                    <!-- search filter -->
                    <div class="w-full md:w-1/6 flex justify-center gap-x-2 border border-neutral-800 rounded-md hover:bg-neutral-800/60 duration-100 cursor-pointer">
                        <input
                            name="cosmetic"
                            type="text"
                            class="w-full outline-none bg-neutral-950 rounded-md placeholder:text-neutral-400 sm:text-sm"
                            placeholder="Search a cosmetic..."
                            role="combobox"
                            aria-expanded="false"
                            aria-controls="options"
                            bind:value={cosmeticName}
                            autocomplete="off"
                        />
                    </div>

                    <button class="w-full py-1 md:w-1/8 border border-neutral-800 rounded-md hover:bg-neutral-800/60 duration-100 cursor-pointer" onclick={toggleLocked}>{includeLocked ? "Show All" : "Show Owned"}</button>
                </div>

                
                {#if cosmeticName.length > 0}
                    <div class="grid grid-col-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-2">
                        {#each player.collections.cosmetics.filter(c => { 
                            if (cosmeticName.length > 0) { return c.cosmetic.name.toLowerCase().includes(cosmeticName) } else { return true } 
                        }).filter(c => {
                            if (includeLocked) {
                                return true
                            } else {
                                return c.owned
                            }
                        }) as { cosmetic, owned, chromaPacks, donationsMade }}
                            <div class="relative flex flex-col gap-y-2 text-base lg:text-lg rounded-md {donationsMade === 10 ? "bg-purple-700/30" : (owned ? "bg-green-800/30 border-green-800/80" : "bg-neutral-800/50")}">
                                <div class="flex flex-row gap-x-2 p-2">
                                    <div class="flex gap-x-4 min-w-full justify-between">
                                        <div class="flex gap-x-2 text-sm lg:text-base">
                                            <img class="size-12 lg:size-16 self-center" src="https://cdn.islandstats.xyz/cosmetics/{cosmetic.category.toLowerCase()}/{cosmetic.collection.toLowerCase().replaceAll(" ", "_")}/{cosmetic.name.replaceAll(" ", "_")}.png" alt={cosmetic.name} />
                                            <div class="flex flex-col gap-y-1">
                                                <p class="font-semibold {getRarityColour(cosmetic.rarity)}">{cosmetic.name}</p>

                                                <!-- owned & donations -->
                                                {#if owned}
                                                    {#if cosmetic.royalReputation}
                                                        <div class="flex gap-x-3">
                                                            <div class="flex gap-x-1">
                                                                <img src="https://cdn.islandstats.xyz/icons/misc/scavenging.png" alt="Scavenged" class="size-3 md:size-5 self-center" />
                                                                <span id="donations" class="tabular-nums">{donationsMade || 0} / {cosmetic.royalReputation?.donationLimit || 10}</span>
                                                            </div>
                                                            <div class="flex gap-x-1">
                                                                <img src="https://cdn.islandstats.xyz/icons/currency/royal_reputation.png" alt="Royal Reputation Icon" class="size-3 md:size-5 self-center" />
                                                                <span class="tabular-nums">{cosmetic.royalReputation?.reputationAmount * donationsMade} / {cosmetic.royalReputation?.reputationAmount * cosmetic.royalReputation?.donationLimit}</span>
                                                            </div>
                                                        </div>
                                                    {:else}
                                                        <div class="flex gap-x-1">
                                                            <img src="https://cdn.islandstats.xyz/icons/misc/scavenging.png" alt="Scavenged" class="size-3 md:size-5 self-center grayscale" />
                                                            <span class="tabular-nums">Cannot be donated</span>
                                                        </div>
                                                    {/if}
                                                {:else}
                                                    <div class="flex gap-x-1">
                                                        <img src="https://cdn.discordapp.com/emojis/1042056408423739492.webp" alt="Scavenged" class="size-3 md:size-5 self-center" />
                                                        <span class="tabular-nums">Not owned</span>
                                                    </div>
                                                {/if}

                                                <!-- chroma packs -->
                                                <div class="flex gap-x-1">
                                                    {#each ["thermal", "verdant", "oceanic", "regal"] as pack}
                                                        <img src="https://cdn.islandstats.xyz/icons/chroma_pack/{pack}.png" alt="{pack} Chroma Pack" class="size-3 lg:size-5 cursor-pointer {chromaPacks?.includes(pack) ? "" : "grayscale"}" />
                                                        <Tooltip arrow={false} type="custom" placement="top" class="text-sm border {chromaPacks?.includes(pack) ? "text-green-600 border-green-800" : "!border-neutral-700"} !bg-neutral-900 px-2 py-0.5 rounded-md">
                                                            {pack[0].toUpperCase() + pack.slice(1) + " Chroma"}
                                                        </Tooltip>
                                                    {/each}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex flex-col gap-y-1 shrink-0 gap-x-1 self-start">
                                            <div class="flex gap-x-1 {donationsMade === 10 ? "bg-purple-800" : (owned ? "bg-green-800" : "bg-neutral-700/50")} rounded-full px-2 py-0.5">
                                                <img src="https://cdn.islandstats.xyz/icons/trophies/{cosmetic.isBonusTrophies ? "silver" : "purple"}.png" alt="Trophies Icon" class="size-6 self-center" />
                                                <p class="text-sm lg:text-base flex self-center">{cosmetic.trophies}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="absolute -top-2 -left-2 p-1 cursor-pointer {donationsMade === 10 ? "bg-purple-800" : (owned ? "bg-green-800" : "bg-neutral-700/50")} rounded-md">
                                    <img src="https://cdn.islandstats.xyz/icons/wardrobe/{cosmetic.collection.toLowerCase().replaceAll(" ", "_")}.png" alt="" class="size-4 md:size-6 self-center" />
                                </div>
                                <Tooltip arrow={false} type="custom" placement="top" class="text-sm border !border-neutral-700 !bg-neutral-900 px-2 py-0.5 rounded-md">
                                    {cosmetic.collection}
                                </Tooltip>
                            </div>
                        {/each}
                    </div>
                {:else}
                    <div class="flex flex-col gap-y-2">
                        {#each collections as collection}
                            {@const isCollectionComplete = calculatePercentage(
                                player.collections.cosmetics.filter(c => c.cosmetic.collection === collection && c.owned).reduce((acc, c) => acc + c.cosmetic.trophies, 0),
                                player.collections.cosmetics.filter(c => c.cosmetic.collection === collection).reduce((acc, c) => acc + c.cosmetic.trophies, 0)
                            ) === 100}
                            {@const isCollectionMaxed = calculatePercentage(
                                player.collections.cosmetics.filter(c => c.cosmetic.collection === collection && c.owned && c.cosmetic.royalReputation).reduce((acc, c) => acc + (c.cosmetic.royalReputation.reputationAmount * c.donationsMade), 0),
                                player.collections.cosmetics.filter(c => c.cosmetic.collection === collection && c.cosmetic.royalReputation).reduce((acc, c) => acc + (c.cosmetic.royalReputation.reputationAmount * c.cosmetic.royalReputation.donationLimit), 0)
                            ) === 100}
                            <div class="bg-neutral-800/50 {isCollectionMaxed ? "border border-purple-800/50" : (isCollectionComplete ? "border border-green-800/30" : "")} rounded-md">
                                <button class="w-full cursor-pointer flex justify-between py-3 {isCollectionMaxed ? "bg-purple-800/50 hover:bg-purple-800/40" : (isCollectionComplete ? "bg-green-800/50 hover:bg-green-800/40" : "hover:bg-neutral-800")} duration-100 {openCollection === collection ? "rounded-t-md" : "rounded-md"}" onclick={() => {
                                    if (openCollection === collection) {
                                        openCollection = "";
                                    } else {
                                        openCollection = collection;
                                    }
                                }}>
                                    <div class="flex gap-x-2 px-3">
                                        <img src="https://cdn.islandstats.xyz/icons/wardrobe/{collection.toLowerCase().replaceAll(" ", "_")}.png" alt="{collection} Icon" class="size-6 md:size-8 self-center" />
                                        <p class="text-base lg:text-xl font-semibold self-center">{collection}</p>
                                    </div>
                                    <div class="flex gap-x-4 px-3">
                                        <div class="flex gap-x-1 tabular-nums self-center">
                                            <img src="https://cdn.islandstats.xyz/icons/trophies/{player.collections.cosmetics.filter(c => c.cosmetic.collection === collection)[0].cosmetic.isBonusTrophies ? "silver" : "purple"}.png" alt="Cosmetic Trophy Icon" class="size-6 self-center hidden md:flex" />
                                            <p class="text-sm md:text-base hidden md:flex">
                                                <span>{player.collections.cosmetics.filter(c => c.cosmetic.collection === collection && c.owned).reduce((acc, c) => acc + c.cosmetic.trophies, 0).toLocaleString()}</span>
                                                <span> / </span>
                                                <span>{player.collections.cosmetics.filter(c => c.cosmetic.collection === collection).reduce((acc, c) => acc + c.cosmetic.trophies, 0).toLocaleString()}</span>
                                                <span class="text-neutral-500">({calculatePercentage(
                                                    player.collections.cosmetics.filter(c => c.cosmetic.collection === collection && c.owned).reduce((acc, c) => acc + c.cosmetic.trophies, 0),
                                                    player.collections.cosmetics.filter(c => c.cosmetic.collection === collection).reduce((acc, c) => acc + c.cosmetic.trophies, 0)
                                                )}%)</span>
                                            </p>
                                        </div>
                                        <span class="size-6 lg:size-8 text-neutral-500 self-center mr-2"><ChevronUpDown /></span>
                                    </div>

                                </button>
                                {#if collection === openCollection}
                                    <div transition:slide={{ duration: 200 }} class="flex flex-col gap-y-4 text-base lg:text-lg rounded-b-md border-t {isCollectionMaxed ? "border-purple-800/30" : (isCollectionComplete ? "border-green-800/30" : "border-neutral-800")} p-4">
                                        <WardrobeCollectionStats {player} {collection} />
                                        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
                                            {#each player.collections.cosmetics.filter(c =>
                                                // filter by collection
                                                c.cosmetic.collection === collection
                                            ).sort((a, b) => {
                                                // sort by rarity
                                                const rarityOrder = ["COMMON", "UNCOMMON", "RARE", "EPIC", "LEGENDARY", "MYTHIC"];
                                                return rarityOrder.indexOf(a.cosmetic.rarity) - rarityOrder.indexOf(b.cosmetic.rarity);
                                            }).filter(c => {
                                                // filter by owned
                                                if (includeLocked) {
                                                    return true
                                                } else {
                                                    return c.owned
                                                }
                                            }) as { cosmetic, owned, chromaPacks, donationsMade }}
                                                <div class="flex flex-col gap-y-2 text-base lg:text-lg rounded-md {donationsMade === 10 ? "bg-purple-700/30" : (owned ? "bg-green-800/30 border-green-800/80" : "bg-neutral-800/50")}">
                                                    <div class="flex flex-row gap-x-2 p-2">
                                                        <div class="flex gap-x-4 min-w-full justify-between">
                                                            <div class="flex gap-x-2 text-sm lg:text-base">
                                                                <img class="size-12 lg:size-16 self-center" src="https://cdn.islandstats.xyz/cosmetics/{cosmetic.category.toLowerCase()}/{cosmetic.collection.toLowerCase().replaceAll(" ", "_")}/{cosmetic.name.replaceAll(" ", "_")}.png" alt={cosmetic.name} />
                                                                <div class="flex flex-col gap-y-1">
                                                                    <p class="font-semibold {cosmetic.name.length > 30 ? "max-w-4/5 truncate text-ellipsis" : ""} {getRarityColour(cosmetic.rarity)}">{cosmetic.name}</p>
                                                                    {#if cosmetic.name.length > 30}
                                                                        <Tooltip arrow={false} type="custom" placement="top" class="text-sm border !border-neutral-700 !bg-neutral-900 px-2 py-0.5 rounded-md">
                                                                            {cosmetic.name}
                                                                        </Tooltip>
                                                                    {/if}
                                                                    
                                                                    <div class="flex gap-x-1">
                                                                        <img src="https://cdn.islandstats.xyz/icons/rarity/{cosmetic.rarity.toLowerCase()}.png" alt="{cosmetic.rarity} Icon" class="h-3 md:h-4 self-center" />
                                                                        {#if cosmeticTypes[cosmetic.name]}
                                                                            <img src="https://cdn.islandstats.xyz/icons/rarity/{cosmeticTypes[cosmetic.name].toLowerCase()}.png" alt="{cosmeticTypes[cosmetic.name]} Icon" class="h-3 md:h-4 self-center" />
                                                                        {/if}
                                                                    </div>

                                                                    <!-- owned & donations -->
                                                                    {#if owned}
                                                                        {#if cosmetic.royalReputation}
                                                                            <div class="flex flex-col md:flex-row gap-x-3">
                                                                                <div class="flex gap-x-1">
                                                                                    <img src="https://cdn.islandstats.xyz/icons/misc/scavenging.png" alt="Scavenged" class="size-3 md:size-5 self-center" />
                                                                                    <span id="donations" class="tabular-nums">{donationsMade || 0} / {cosmetic.royalReputation?.donationLimit || 10}</span>
                                                                                </div>
                                                                                <div class="flex gap-x-1">
                                                                                    <img src="https://cdn.islandstats.xyz/icons/currency/royal_reputation.png" alt="Royal Reputation Icon" class="size-3 md:size-5 self-center" />
                                                                                    <span class="tabular-nums">{cosmetic.royalReputation?.reputationAmount * donationsMade} / {cosmetic.royalReputation?.reputationAmount * cosmetic.royalReputation?.donationLimit}</span>
                                                                                </div>
                                                                            </div>
                                                                        {:else}
                                                                            <div class="flex gap-x-1">
                                                                                <img src="https://cdn.islandstats.xyz/icons/misc/scavenging.png" alt="Scavenged" class="size-3 md:size-5 self-center grayscale" />
                                                                                <span class="tabular-nums">Cannot be donated</span>
                                                                            </div>
                                                                        {/if}
                                                                    {:else}
                                                                        <div class="flex gap-x-1">
                                                                            <img src="https://cdn.discordapp.com/emojis/1042056408423739492.webp" alt="Scavenged" class="size-3 md:size-5 self-center" />
                                                                            <span class="tabular-nums">Not owned</span>
                                                                        </div>
                                                                    {/if}

                                                                    <!-- global owned -->
                                                                    <div class="flex gap-x-1">
                                                                        <img src="https://cdn.islandstats.xyz/icons/social/friend.png" alt="Global Owned" class="size-3 md:size-5 self-center" />
                                                                        <span class="tabular-nums">{cosmetic.globalNumberOwned} owned</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="flex flex-col gap-y-1 shrink-0 gap-x-1 self-start">
                                                                <div class="flex gap-x-1 {donationsMade === 10 ? "bg-purple-800" : (owned ? "bg-green-800" : "bg-neutral-700/50")} rounded-full px-2 py-0.5">
                                                                    <img src="https://cdn.islandstats.xyz/icons/trophies/{cosmetic.isBonusTrophies ? "silver" : "purple"}.png" alt="Trophies Icon" class="size-6 self-center" />
                                                                    <p class="text-sm lg:text-base flex self-center">{cosmetic.trophies}</p>
                                                                </div>

                                                                <!-- chroma packs -->
                                                                <div class="grid grid-cols-2 gap-1 self-center mt-1">
                                                                    {#each ["thermal", "verdant", "oceanic", "regal"] as pack}
                                                                        <img src="https://cdn.islandstats.xyz/icons/chroma_pack/{pack}.png" alt="{pack} Chroma Pack" class="size-5 cursor-pointer {chromaPacks?.includes(pack) ? "" : "grayscale"}" />
                                                                        <Tooltip arrow={false} type="custom" placement="top" class="text-sm border {chromaPacks?.includes(pack) ? "text-green-600 border-green-800" : "!border-neutral-700"} !bg-neutral-900 px-2 py-0.5 rounded-md">
                                                                            {pack[0].toUpperCase() + pack.slice(1) + " Chroma"}
                                                                        </Tooltip>
                                                                    {/each}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            {/each}
                                        </div>
                                    </div>
                                {/if}
                            </div>
                        {/each}
                    </div>
                {/if}
            </div>
        {:else}
            <div class="flex flex-row items-center justify-center py-16 rounded-lg bg-neutral-950/40 text-neutral-400">
                <div class="flex flex-col gap-y-1">
                    <img
                        src="https://cdn.islandstats.xyz/icons/warnings/orange.png"
                        alt="Orange warning icon"
                        class="size-8 self-center"
                    />
                    <p class="text-lg">Collections are disabled!</p>
                </div>
            </div>
        {/if}
    </div>
{/await}