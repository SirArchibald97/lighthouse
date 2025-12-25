<script lang="ts">
	import { fishingCollections } from '$lib/collections';
	import type { Player } from '$lib/types';

	const { player }: { player: Player } = $props();

	const recommendedTypes = {
		fish: 'Fish',
		crab: 'Crab Pots',
		grotto: 'Grotto'
	} as { [type: string]: string };
	let recommendedType = $state('fish');
	function cycleRecommendedType() {
		const types = ['fish', 'crab', 'grotto'];
		recommendedType =
			types[
				types.indexOf(recommendedType) + 1 >= types.length ? 0 : types.indexOf(recommendedType) + 1
			];
	}
	function getRecommendedIsland(player: Player, type: string) {
		const islands = fishingCollections.filter(
			(c) => player.crownLevel.fishingLevelData.level >= c.level && c.type === type
		);
		const islandPoints = {} as { [island: string]: number };
		for (const island of islands) {
			islandPoints[island.name] = 0;
			for (const fish of player.collections?.fish.filter(
				(f) => f.fish.collection === island.name
			) || []) {
				const points = { AVERAGE: 1, LARGE: 2, MASSIVE: 3, GARGANTUAN: 4, COLOSSAL: 4 } as {
					[weight: string]: number;
				};
				for (const weight of fish.weights) {
					islandPoints[island.name] = islandPoints[island.name] + points[weight.weight];
				}
			}
		}

		let recommendedIsland = Object.entries(islandPoints)[0];
		for (const [name, points] of Object.entries(islandPoints)) {
			if (points < recommendedIsland[1]) {
				recommendedIsland = [name, points];
			}
		}
		return islands.find((i) => i.name === recommendedIsland[0]);
	}
</script>
