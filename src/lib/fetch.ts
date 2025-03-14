import { browser } from "$app/environment";
import { API_KEY, DEV } from "$env/static/private";
import type { IslandApiResponse } from "./types";
import { formatUUID } from "./utils";

export async function getMinecraftAccount(username: string) {
    const mojangResponse = await fetch(`https://api.minecraftservices.com/minecraft/profile/lookup/name/${username}`);
    const { id, name } = await mojangResponse.json() as { id: string | undefined, name: string | undefined };
    if (!id) return { id: null, name: null };
    return { id, name };
}

export async function getPlayer(username: string) {
    const { id: uuid, name } = await getMinecraftAccount(username);
    if (!uuid || !name) return;

    if (browser) localStorage.setItem("searches", (localStorage.getItem("searches")?.split(",") || []).concat([name]).join(","));

    const islandResponse = await fetch(
        `${DEV === "true" ? "http://localhost:3000" : "https://api.sirarchibald.dev"}/lighthouse/player/${formatUUID(uuid)}`,
        {
            method: "GET",
            headers: { 
                "Content-Type": "application/json", 
                "Accept": "application/json", 
                "auth": `${API_KEY}`
            }
        }
    );
    const data = await islandResponse.json() as IslandApiResponse;
    return data.player;
}