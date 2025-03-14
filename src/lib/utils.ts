import { UAParser } from "ua-parser-js";

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
    return "default.png";
}

export function getStatusIcon(game: string) {
    const games = [
        { id: "SKY_BATTLE", icon: "sky_battle" },
        { id: "BATTLE_BOX", icon: "battle_box" },
        { id: "TGTTOS", icon: "tgttos" },
        { id: "HOLE_IN_THE_WALL", icon: "hitw" },
        { id: "PARKOUR_WARRIOR", icon: "parkour_warrrior/solo" },
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
        { id: "TGTTOS", text: "TGTTOS" },
        { id: "HOLE_IN_THE_WALL", text: "HITW" },
        { id: "PARKOUR_WARRIOR", text: "Parkour Warrior Dojo" },
        { id: "PARKOUR_WARRIOR_SURVIVOR", text: "Parkour Warrior Survivors" },
        { id: "DYNABALL", text: "Dynaball" },
        { id: "ROCKET_SPLEEF", text: "Rocket Spleef Rush" }
    ];
    return games.find(g => g.id === game)?.text;
}

export function getCrownColour(level: number) {
    const rankColours = [
        "neutral-700",
        "neutral-300",
        "emerald-500",
        "blue-700",
        "purple-600",
        "orange-500",
        "red-500"
    ];
    return `bg-${rankColours[Math.floor(level / 10)]}`;
}