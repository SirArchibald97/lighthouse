import type { LayoutServerLoad } from './$types';
import { getPlayer } from '$lib/fetch';

export const load: LayoutServerLoad = async ({ params }) => {
	return {
		streamed: {
			player: getPlayer(params.username)
		}
	};
};
