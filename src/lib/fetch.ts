import { browser } from '$app/environment';
import { DEV } from '$env/static/private';
import type { IslandApiResponse } from '$lib/types';

export async function getPlayer(username: string) {
	const islandResponse = await fetch(
		`${DEV === 'true' ? 'http://localhost:3000' : 'https://api.sirarchibald.dev'}/lighthouse/player/${username}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}
		}
	);
	const data = (await islandResponse.json()) as IslandApiResponse;

	if (browser && data.player)
		localStorage.setItem(
			'searches',
			(localStorage.getItem('searches')?.split(',') || []).concat([data.player.uuid]).join(',')
		);

	return data.player;
}
