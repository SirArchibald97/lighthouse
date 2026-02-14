import { getPlayer } from '$lib/fetch';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params }) => {
	return {
		streamed: {
			player: getPlayer(params.username)
		}
	};
};
