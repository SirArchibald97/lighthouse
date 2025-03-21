import { DateTime } from "luxon";
import { UAParser } from "ua-parser-js";
import type { IslandFish, IslandFishWeight } from "./types";

export function formatUUID(uuid: string) {
    return uuid.substring(0, 8) + "-"
        + uuid.substring(8, 12) + "-" 
        + uuid.substring(12, 16) + "-"
        + uuid.substring(16, 20) + "-" 
        + uuid.substring(20);
}

export function getOS(useragent: string) {
    const parsedUserAgent = UAParser(useragent);
    if (parsedUserAgent.os.name === "macOS") return "macOS"
    else if (["Android", "iOS"].includes(parsedUserAgent.os.name || "")) return "mobile"
    else return "PC"
}

export function shortenNumber(number: number) {
    if (number >= 1e6) return (number / 1e6).toFixed(1).replace(/\.0$/, '') + "M";
    if (number >= 1e3) return (number / 1e3).toFixed(1).replace(/\.0$/, '') + "K";
    return number.toLocaleString();
}

export function roundNumber(number: number) {
    return Math.round(number * 100) / 100;
}

export function calculatePercentage(num1: number, num2: number) {
    const percentage = Math.round(num1 / num2 * 100);
    return percentage === 0 ? "<1" : percentage;
}

export function getRankIcon(ranks: string[]) {
    const rankIcons = [
        { id: "NOXCREW", icon: "noxcrew" },
        { id: "MODERATOR", icon: "moderator" },
        { id: "CONTESTANT", icon: "contestant" },
        { id: "CREATOR", icon: "creator" },
        { id: "GRAND_CHAMP_ROYALE", icon: "grand_champ_royale" },
        { id: "GRAND_CHAMP", icon: "grand_champ" },
        { id: "CHAMP", icon: "champ" }
    ];

    for (const rank of rankIcons) {
        if (ranks.includes(rank.id)) {
            return rank.icon;
        }
    }
    return "default";
}

export function getStatusIcon(game: string) {
    const games = [
        { id: "SKY_BATTLE", icon: "sky_battle" },
        { id: "BATTLE_BOX", icon: "battle_box" },
        { id: "TGTTOS", icon: "tgttos" },
        { id: "HOLE_IN_THE_WALL", icon: "hitw" },
        { id: "PARKOUR_WARRIOR", icon: "parkour_warrior/solo" },
        { id: "PARKOUR_WARRIOR_SURVIVOR", icon: "parkour_warrior" },
        { id: "DYNABALL", icon: "dynaball" },
        { id: "ROCKET_SPLEEF", icon: "rocket_spleef" }
    ];
    return games.find(g => g.id === game)?.icon;
}

export function getStatusString(game: string) {
    const games = [
        { id: "SKY_BATTLE", text: "Sky Battle" },
        { id: "BATTLE_BOX", text: "Battle Box" },
        { id: "TGTTOS", text: "To Get To The Other Side" },
        { id: "HOLE_IN_THE_WALL", text: "Hole in the Wall" },
        { id: "PARKOUR_WARRIOR", text: "Parkour Warrior Dojo" },
        { id: "PARKOUR_WARRIOR_SURVIVOR", text: "Parkour Warrior Survivor" },
        { id: "DYNABALL", text: "Dynaball" },
        { id: "ROCKET_SPLEEF", text: "Rocket Spleef Rush" }
    ];
    return games.find(g => g.id === game)?.text;
}

export function getCrownColour(level: number) {
    const rankColours = [
        "bg-neutral-600",
        "bg-neutral-300",
        "bg-green-600",
        "bg-blue-600",
        "bg-purple-600",
        "bg-orange-600",
        "bg-red-600",
        "bg-linear-to-r from-cyan-500 to-emerald-400"
    ];
    return rankColours[Math.floor(level / 10)];
}

export function getCrownColourHex(level: number) {
    const rankColours = [
        "oklch(0.439 0 0)",
        "oklch(0.87 0 0)",
        "oklch(0.627 0.194 149.214)",
        "oklch(0.546 0.245 262.881)",
        "oklch(0.558 0.288 302.321)",
        "oklch(0.646 0.222 41.116)",
        "oklch(0.577 0.245 27.325)",
        "oklch(0.777 0.152 181.912)"
    ];
    return rankColours[Math.floor(level / 10)];
}

export function getRarityColour(rarity: string) {
    const rarities = {
        "COMMON": "text-neutral-400",
        "UNCOMMON": "text-green-500",
        "RARE": "text-blue-500",
        "EPIC": "text-purple-500",
        "LEGENDARY": "text-orange-500",
        "MYTHIC": "text-red-500"
    } as { [key: string]: string };
    return rarities[rarity];
}

export function calculateTimeAgo(time: string) {
    const lastJoinDate = DateTime.fromISO(time);
    const diff = DateTime.now().diff(lastJoinDate, ["months", "weeks", "days", "hours", "minutes", "seconds"]);
    if (diff.months > 0) return `${diff.months} month${diff.months === 1 ? "" : "s"} ago`;
    if (diff.weeks > 0) return `${diff.days} week${diff.days === 1 ? "" : "s"} ago`;
    if (diff.days > 0) return `${diff.days} day${diff.days === 1 ? "" : "s"} ago`;
    if (diff.hours > 0) return `${diff.hours} hour${diff.hours === 1 ? "" : "s"} ago`;
    if (diff.minutes > 0) return `${diff.minutes} minute${diff.minutes === 1 ? "" : "s"} ago`;
    if (diff.seconds > 0) return `${diff.seconds} second${diff.seconds === 1 ? "" : "s"} ago`;
}

export const levels = [
    { range: [0, 9], trophies: 500 },
    { range: [10, 19], trophies: 750 },
    { range: [20, 29], trophies: 1000 },
    { range: [30, 39], trophies: 1250 },
    { range: [40, 49], trophies: 1500 },
    { range: [50, 59], trophies: 2000 },
    { range: [60, 69], trophies: 2500 },
    { range: [70, 79], trophies: 3000 },
    { range: [80, 89], trophies: 3500 },
    { range: [90, 99], trophies: 4000 },
    { range: [100, 110], trophies: 5000 }
];

export const fishingLevels = [
    { range: [0, 0], trophies: 20 },
    { range: [1, 1], trophies: 40 },
    { range: [2, 2], trophies: 60 },
    { range: [3, 3], trophies: 80 },
    { range: [4, 9], trophies: 100 },
    { range: [10, 19], trophies: 200 },
    { range: [20, 29], trophies: 300 },
    { range: [30, 39], trophies: 400 },
    { range: [40, 49], trophies: 500 },
    { range: [50, 54], trophies: 500 },
    { range: [55, 59], trophies: 600 },
    { range: [60, 69], trophies: 600 },
    { range: [70, 79], trophies: 700 },
    { range: [80, 84], trophies: 700 },
    { range: [85, 89], trophies: 800 },
    { range: [90, 94], trophies: 800 },
    { range: [95, 99], trophies: 1000 },
    { range: [100, 1000], trophies: 10000 },
];

export function calculateTrophiesToNextEvolution(levelType: string, totalTrophies: number, nextEvolution: number) {
    let runningTotalForNextEvolution = 0;
    for (let level = 0; level < nextEvolution; level++) {
        runningTotalForNextEvolution += (levelType === "crown" ? levels : fishingLevels).find(l => level >= l.range[0] && level <= l.range[1])?.trophies || 0;
    }
    return runningTotalForNextEvolution - totalTrophies;
}

export function earnedTrophiesForIsland(allFish: { fish: IslandFish, weights: IslandFishWeight[] }[], island: string) {
    let runningTotal = 0;
    for (const fish of allFish.filter(f => f.fish.collection === island)) {
        for (const weight of fish.weights) {
            runningTotal += fish.fish[`${weight.weight.toLowerCase()}Trophies`]! as number;
        }
    }
    return runningTotal;
}

export function totalTrophiesForIsland(allFish: { fish: IslandFish, weights: IslandFishWeight[] }[], island: string) {
    let runningTotal = 0;
    for (const fish of allFish.filter(f => f.fish.collection === island)) {
        runningTotal += fish.fish.averageTrophies + fish.fish.largeTrophies + (fish.fish.massiveTrophies || 0) + (fish.fish.gargantuanTrophies || 0) + (fish.fish.colossalTrophies || 0);
    }
    return runningTotal;
}

export function caughtWeightsForIsland(allFish: { fish: IslandFish, weights: IslandFishWeight[] }[], island: string) {
    let runningTotal = 0;
    for (const fish of allFish.filter(f => f.fish.collection === island)) {
        runningTotal += fish.weights.length;
    }
    return runningTotal;
}