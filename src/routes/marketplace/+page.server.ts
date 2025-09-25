import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { items } from '$lib/items';

export const actions = {
	getPlayer: async ({ request }) => {
		const data = await request.formData();
		const username = data.get('username');

		throw redirect(301, `/player/${username}/games`);
	},

	getItem: async ({ request }) => {
		const data = await request.formData();
		const itemName = data.get('item');

		const foundItem = items.find((i) => i.name.toLowerCase() === itemName?.toString().toLowerCase());
		if (!foundItem) return null;

		throw redirect(301, `/marketplace/${foundItem.id}`);
	}
} satisfies Actions;
