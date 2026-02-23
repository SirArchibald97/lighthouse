import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	getPlayer: async ({ request }) => {
		const data = await request.formData();
		const username = data.get('username');

		throw redirect(301, `/player/${username}/games`);
	}
} satisfies Actions;
