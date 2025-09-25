import type { LayoutServerLoad } from './$types';
import { getListings } from '$lib/fetch';

export const load: LayoutServerLoad = async ({ params }) => {
	return {
		streamed: {
			listings: getListings()
		}
	};
};
