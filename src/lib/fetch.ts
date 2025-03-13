import { API_KEY, DEV } from "$env/static/private";
import type { IslandApiResponse } from "./types";
import { formatUUID } from "./utils";

export default async function getPlayer(username: string) {
    const mojangResponse = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
    const { id } = await mojangResponse.json() as { id: string | undefined };
    if (!id) return;

    const islandResponse = await fetch(
        `${DEV === "true" ? "http://localhost:3000" : "https://api.sirarchibald.dev"}/lighthouse/player/${formatUUID(id)}`,
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