import type { LayoutServerLoad } from "./$types";
import { getMinecraftAccount, getPlayer } from "$lib/fetch";
import { redirect } from "@sveltejs/kit";

export const load: LayoutServerLoad = async ({ params }) => {
    const { name } = await getMinecraftAccount(params.username);
    if (name !== params.username) throw redirect(301, `/player/${name}/games`);
    
    return {
        streamed: {
            player: getPlayer(params.username)
        }
    };
}