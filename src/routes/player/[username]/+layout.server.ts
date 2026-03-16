import type { LayoutServerLoad } from './$types';
import { getPlayer } from '$lib/fetch';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ url, params }) => {
	if (!url.pathname.split(params.username)[1]) {
		throw redirect(301, `/player/${params.username}/games`);
	} else {
		return {
			streamed: {
				player: getPlayer(params.username)
			}
		};
	}
};
