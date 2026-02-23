import type {
	IslandBadge,
	IslandTieredBadge,
	BattleBoxStatistics,
	SkyBattleStatistics,
	TgttosStatistics,
	HitwStatistics,
	DynaballStatistics,
	RocketSpleefStatistics,
	ParkourWarriorDojoStatistics,
	ParkourWarriorSurvivorStatistics,
	BattleBoxArenaStatistics
} from './types';

export function calculateTotalTrophies(
	stats:
		| BattleBoxStatistics
		| BattleBoxArenaStatistics
		| SkyBattleStatistics
		| TgttosStatistics
		| HitwStatistics
		| DynaballStatistics
		| ParkourWarriorDojoStatistics
		| ParkourWarriorSurvivorStatistics
		| RocketSpleefStatistics,
	badges: IslandBadge[],
	tieredBadges: IslandTieredBadge[]
) {
	let trophies = 0;
	badges.forEach((badge) => {
		if ((badge.stat.startsWith('!') ? stats[badge.stat.slice(1)] : stats.badges[badge.stat]) > 0)
			trophies += badge.trophies;
	});
	tieredBadges.forEach((badge) => {
		badge.tiers.forEach((tier) => {
			if (stats[badge.stat] >= tier.amount) trophies += tier.trophies;
		});
	});
	return trophies;
}

export function calculateMaxTrophies(badges: IslandBadge[], tieredBadges: IslandTieredBadge[]) {
	let trophies = 0;
	badges.forEach((badge) => {
		trophies += badge.trophies;
	});
	tieredBadges.forEach((badge) => {
		badge.tiers.forEach((tier) => {
			trophies += tier.trophies;
		});
	});
	return trophies;
}

export function calculateBadgeTier(
	stat: number,
	tiers: { name: string; amount: number; trophies: number }[]
) {
	let playerTier = { name: '', amount: 0 };
	let nextTier = tiers[0];
	for (let tier of tiers) {
		if (stat >= tier.amount) {
			playerTier = tier;
			nextTier = tiers[tiers.indexOf(tier) + 1] || tiers[tiers.length - 1];
		}
	}
	return { tier: playerTier, next: nextTier };
}

export const badges = {
	battle_box: [
		{
			name: 'Ace From Afar',
			description: 'Eliminate all 4 members of the opposing team using ranged weapons',
			icon: 'battle_box/ace_from_afar',
			stat: 'ace_from_afar',
			trophies: 100
		},
		{
			name: 'Aerial Assault',
			description: 'Eliminate a player using a ranged weapon whilst levitating',
			icon: 'battle_box/aerial_assault',
			stat: 'aerial_assault',
			trophies: 50,
			secret: true
		},
		{
			name: 'Blind Brawl',
			description: 'Eliminate a player whilst blind',
			icon: 'battle_box/blind_brawl',
			stat: 'blind_brawl',
			trophies: 30
		},
		{
			name: 'Demolitions Expert',
			description: 'Eliminate 3 enemies with explosives in a single round',
			icon: 'battle_box/demolitions_expert',
			stat: 'demolitions_expert',
			trophies: 100
		},
		{
			name: 'Flawless Battle',
			description: 'Place 1st as a team without any member of your team dying',
			icon: 'battle_box/flawless_battle',
			stat: 'flawless_battle',
			trophies: 70
		},
		{
			name: 'Savior Ace',
			description: 'Eliminate all 4 enemies as the last player standing',
			icon: 'battle_box/savior_ace',
			stat: 'leave_it_to_me',
			trophies: 100,
			secret: true
		},
		{
			name: 'Stealthy Takedown',
			description: 'Eliminate an enemy whilst invisible',
			icon: 'battle_box/stealthy_takedown',
			stat: 'stealthy_takedown',
			trophies: 30,
			secret: true
		},
		{
			name: 'Ultimate Ace',
			description: 'Eliminate all 12 enemies in a game',
			icon: 'battle_box/ultimate_ace',
			stat: 'ultimate_ace',
			trophies: 150
		},
		{
			name: 'Untouchable Assassin',
			description:
				'Place 1st as a team whilst taking no damage and getting at least 4 eliminations',
			icon: 'battle_box/untouchable_assassin',
			stat: 'untouchable_assassin',
			trophies: 70
		}
	] as IslandBadge[],
	battle_box_tiered: [
		{
			name: 'Battle Box Player',
			description: 'Play all 3 rounds of%%games of Battle Box',
			icon: 'battle_box/battle_box_player',
			stat: 'games_played',
			game: 'battle_box',
			tiers: [
				{ name: 'I', amount: 15, trophies: 50 },
				{ name: 'II', amount: 50, trophies: 50 },
				{ name: 'III', amount: 125, trophies: 50 },
				{ name: 'IV', amount: 250, trophies: 50 },
				{ name: 'V', amount: 475, trophies: 50 },
				{ name: 'VI', amount: 800, trophies: 50 },
				{ name: 'VII', amount: 1300, trophies: 100 }
			]
		},
		{
			name: 'Battle Box Warrior',
			description: 'Eliminate%%players in Battle Box',
			icon: 'battle_box/battle_box_warrior',
			stat: 'kills',
			game: 'battle_box',
			tiers: [
				{ name: 'I', amount: 25, trophies: 50 },
				{ name: 'II', amount: 75, trophies: 50 },
				{ name: 'III', amount: 175, trophies: 50 },
				{ name: 'IV', amount: 400, trophies: 50 },
				{ name: 'V', amount: 700, trophies: 50 },
				{ name: 'VI', amount: 1200, trophies: 50 },
				{ name: 'VII', amount: 2000, trophies: 100 },
				{ name: 'VIII', amount: 3500, trophies: 100 },
				{ name: 'IX', amount: 5000, trophies: 150 },
				{ name: 'X', amount: 6500, trophies: 150 }
			]
		},
		{
			name: 'Battle Box Champion',
			description: 'Finish%%games of Battle Box with your team in 1st place',
			icon: 'battle_box/battle_box_champion',
			stat: 'team_first_place',
			game: 'battle_box',
			tiers: [
				{ name: 'I', amount: 5, trophies: 50 },
				{ name: 'II', amount: 15, trophies: 50 },
				{ name: 'III', amount: 35, trophies: 50 },
				{ name: 'IV', amount: 75, trophies: 50 },
				{ name: 'V', amount: 150, trophies: 50 },
				{ name: 'VI', amount: 250, trophies: 50 },
				{ name: 'VII', amount: 400, trophies: 100 },
				{ name: 'VIII', amount: 600, trophies: 100 },
				{ name: 'IX', amount: 800, trophies: 150 },
				{ name: 'X', amount: 1000, trophies: 150 }
			]
		},
		{
			name: 'Battle Box Expert',
			description: 'Win%%rounds of Battle Box',
			icon: 'battle_box/battle_box_expert',
			stat: 'rounds_won',
			game: 'battle_box',
			tiers: [
				{ name: 'I', amount: 25, trophies: 50 },
				{ name: 'II', amount: 75, trophies: 50 },
				{ name: 'III', amount: 175, trophies: 50 },
				{ name: 'IV', amount: 375, trophies: 50 },
				{ name: 'V', amount: 600, trophies: 50 },
				{ name: 'VI', amount: 1200, trophies: 50 },
				{ name: 'VII', amount: 2000, trophies: 100 }
			]
		},
		{
			name: 'Ace in the Box',
			description:
				'Personally eliminate all 4 members of the opposing team in%%rounds of Battle Box',
			icon: 'battle_box/ace_in_the_box',
			stat: 'ace',
			game: 'battle_box',
			tiers: [
				{ name: 'I', amount: 1, trophies: 50 },
				{ name: 'II', amount: 2, trophies: 50 },
				{ name: 'III', amount: 5, trophies: 50 },
				{ name: 'IV', amount: 10, trophies: 50 },
				{ name: 'V', amount: 20, trophies: 50 },
				{ name: 'VI', amount: 35, trophies: 50 },
				{ name: 'VII', amount: 50, trophies: 100 }
			]
		}
	] as IslandTieredBadge[],
	sky_battle: [
		{
			name: 'Creeper Coffin',
			description: 'Get an elimination using a Creeper you spawned',
			icon: 'sky_battle/creeper_coffin',
			stat: 'creeper_coffin',
			trophies: 30,
			secret: true
		},
		{
			name: 'Fallen Warrior',
			description: 'Die after getting 8 eliminations in a single game',
			icon: 'sky_battle/fallen_warrior',
			stat: 'fallen_warrior',
			trophies: 50,
			secret: true
		},
		{
			name: 'Personal Feast',
			description: 'Eat 12 or more pieces of steak in a single game',
			icon: 'sky_battle/personal_feast',
			stat: 'personal_feast',
			trophies: 70,
			secret: true
		},
		{
			name: 'Sky Lord',
			description: 'Get at least 10 eliminations in a single game',
			icon: 'sky_battle/sky_lord',
			stat: 'sky_lord',
			trophies: 70
		},
		{
			name: 'Sky Sniper',
			description: 'Get an elimination with a ranged weapon from over 50 blocks away',
			icon: 'sky_battle/sky_sniper',
			stat: 'sky_sniper',
			trophies: 70
		},
		{
			name: 'Team Crusher',
			description: 'Eliminate all 4 members of an enemy team',
			icon: 'sky_battle/team_crusher',
			stat: 'team_crusher',
			trophies: 30
		},
		{
			name: 'Untouchable Champion',
			description: 'Reach a survival placement of 1st without taking damage',
			icon: 'sky_battle/untouchable_champion',
			stat: 'untouchable_champion',
			trophies: 150
		},
		{
			name: 'Wings to Fly',
			description: "Don't touch the ground for 30s after using a levitation spark",
			icon: 'sky_battle/wings_to_fly',
			stat: 'wings_to_fly',
			trophies: 30,
			secret: true
		}
	] as IslandBadge[],
	sky_battle_tiered: [
		{
			name: 'Sky Battle Player',
			description: 'Survive for at least 60s in%%games of Sky Battle',
			icon: 'sky_battle/sky_battle_player',
			stat: 'survived_minute',
			game: 'sky_battle',
			tiers: [
				{ name: 'I', amount: 30, trophies: 50 },
				{ name: 'II', amount: 90, trophies: 50 },
				{ name: 'III', amount: 200, trophies: 50 },
				{ name: 'IV', amount: 450, trophies: 50 },
				{ name: 'V', amount: 800, trophies: 50 },
				{ name: 'VI', amount: 1400, trophies: 50 },
				{ name: 'VII', amount: 2300, trophies: 100 }
			]
		},
		{
			name: 'Sky Battle Warrior',
			description: 'Eliminate%%players in games of Sky Battle',
			icon: 'sky_battle/sky_battle_warrior',
			stat: 'kills',
			game: 'sky_battle',
			tiers: [
				{ name: 'I', amount: 25, trophies: 50 },
				{ name: 'II', amount: 75, trophies: 50 },
				{ name: 'III', amount: 150, trophies: 50 },
				{ name: 'IV', amount: 350, trophies: 50 },
				{ name: 'V', amount: 600, trophies: 50 },
				{ name: 'VI', amount: 1000, trophies: 50 },
				{ name: 'VII', amount: 1700, trophies: 100 },
				{ name: 'VIII', amount: 2500, trophies: 100 },
				{ name: 'IX', amount: 3500, trophies: 150 },
				{ name: 'X', amount: 5000, trophies: 150 }
			]
		},
		{
			name: 'Sky Battle Champion',
			description: 'Reach survival placement of 1st in%%games of Sky Battle',
			icon: 'sky_battle/sky_battle_champion',
			stat: 'solo_first_place',
			game: 'sky_battle',
			tiers: [
				{ name: 'I', amount: 2, trophies: 50 },
				{ name: 'II', amount: 5, trophies: 50 },
				{ name: 'III', amount: 15, trophies: 50 },
				{ name: 'IV', amount: 25, trophies: 50 },
				{ name: 'V', amount: 50, trophies: 50 },
				{ name: 'VI', amount: 100, trophies: 50 },
				{ name: 'VII', amount: 150, trophies: 100 },
				{ name: 'VIII', amount: 250, trophies: 100 },
				{ name: 'IX', amount: 350, trophies: 150 },
				{ name: 'X', amount: 500, trophies: 150 }
			]
		},
		{
			name: 'Sky Battle Expert',
			description: 'Reach survival placement of 8 or better in%%games of Sky Battle',
			icon: 'sky_battle/sky_battle_expert',
			stat: 'solo_top_eight',
			game: 'sky_battle',
			tiers: [
				{ name: 'I', amount: 20, trophies: 50 },
				{ name: 'II', amount: 65, trophies: 50 },
				{ name: 'III', amount: 150, trophies: 50 },
				{ name: 'IV', amount: 325, trophies: 50 },
				{ name: 'V', amount: 575, trophies: 50 },
				{ name: 'VI', amount: 1000, trophies: 50 },
				{ name: 'VII', amount: 1600, trophies: 100 }
			]
		}
	] as IslandTieredBadge[],
	tgttos: [
		{
			name: 'Got the Worm',
			description: 'Place 1st with the Early Birds modifier active',
			icon: 'tgttos/got_the_worm',
			stat: 'got_the_worm',
			trophies: 30
		},
		{
			name: 'Jackpot',
			description: 'Place 7th in every round of a To Get To The Other Side game',
			icon: 'tgttos/jackpot',
			stat: 'jackpot',
			trophies: 50,
			secret: true
		},
		{
			name: 'Pave the Way',
			description: 'Place 1st without placing blocks on a map where you can place blocks',
			icon: 'tgttos/pave_the_way',
			stat: 'pave_the_way',
			trophies: 50
		},
		{
			name: 'Slapdown',
			description: 'Punch a chicken with a slapstick',
			icon: 'tgttos/slapdown',
			stat: 'slapdown',
			trophies: 10
		},
		{
			name: 'Triple Champion',
			description: 'Place 1st in every round of To Get To The Other Side game',
			icon: 'tgttos/triple_champion',
			stat: 'triple_champion',
			trophies: 100
		},
		{
			name: 'Ultimate Comeback',
			description: 'Place 1st after getting knocked into the void',
			icon: 'tgttos/ultimate_comeback',
			stat: 'ultimate_comeback',
			trophies: 70
		},
		{
			name: 'Untouchable Speedster',
			description: 'Place 1st without being hit with the Double Time modifier is active',
			icon: 'tgttos/untouchable_speedster',
			stat: 'untouchable_speedster',
			trophies: 100
		},
		{
			name: 'Victorious Pacifist',
			description: 'Place 1st without punching anyone',
			icon: 'tgttos/victorious_pacifist',
			stat: 'victorious_pacifist',
			trophies: 50
		}
	] as IslandBadge[],
	tgttos_tiered: [
		{
			name: 'Chicken Puncher',
			description: 'Punch%%chickens in games of To Get To The Other Side',
			icon: 'tgttos/chicken_puncher',
			stat: 'chickens_punched',
			game: 'tgttos',
			tiers: [
				{ name: 'I', amount: 50, trophies: 50 },
				{ name: 'II', amount: 150, trophies: 50 },
				{ name: 'III', amount: 325, trophies: 50 },
				{ name: 'IV', amount: 700, trophies: 50 },
				{ name: 'V', amount: 1300, trophies: 50 },
				{ name: 'VI', amount: 2250, trophies: 50 },
				{ name: 'VII', amount: 3750, trophies: 100 }
			]
		},
		{
			name: 'Round Champion',
			description: 'Finish%%rounds of To Get To The Other Side in 1st place',
			icon: 'tgttos/tgttos_round_champion',
			stat: 'round_first_place',
			game: 'tgttos',
			tiers: [
				{ name: 'I', amount: 2, trophies: 50 },
				{ name: 'II', amount: 7, trophies: 50 },
				{ name: 'III', amount: 15, trophies: 50 },
				{ name: 'IV', amount: 35, trophies: 50 },
				{ name: 'V', amount: 60, trophies: 50 },
				{ name: 'VI', amount: 110, trophies: 50 },
				{ name: 'VII', amount: 180, trophies: 100 },
				{ name: 'VIII', amount: 300, trophies: 100 },
				{ name: 'IX', amount: 450, trophies: 150 },
				{ name: 'X', amount: 600, trophies: 150 }
			]
		},
		{
			name: 'Round Expert',
			description: 'Finish%%rounds of To Get To The Other Side in 5th place or better',
			icon: 'tgttos/tgttos_round_expert',
			stat: 'round_top_five',
			game: 'tgttos',
			tiers: [
				{ name: 'I', amount: 15, trophies: 50 },
				{ name: 'II', amount: 50, trophies: 50 },
				{ name: 'III', amount: 110, trophies: 50 },
				{ name: 'IV', amount: 250, trophies: 50 },
				{ name: 'V', amount: 425, trophies: 50 },
				{ name: 'VI', amount: 750, trophies: 50 },
				{ name: 'VII', amount: 1250, trophies: 100 }
			]
		},
		{
			name: 'To Get To The Other Side Champion',
			description: 'Finish%%games of To Get To The Other Side in 1st place',
			icon: 'tgttos/tgttos_champion',
			stat: 'first_place',
			game: 'tgttos',
			tiers: [
				{ name: 'I', amount: 1, trophies: 50 },
				{ name: 'II', amount: 2, trophies: 50 },
				{ name: 'III', amount: 5, trophies: 50 },
				{ name: 'IV', amount: 10, trophies: 50 },
				{ name: 'V', amount: 20, trophies: 50 },
				{ name: 'VI', amount: 40, trophies: 50 },
				{ name: 'VII', amount: 60, trophies: 100 },
				{ name: 'VIII', amount: 100, trophies: 100 },
				{ name: 'IX', amount: 150, trophies: 150 },
				{ name: 'X', amount: 200, trophies: 150 }
			]
		},
		{
			name: 'To Get To The Other Side Expert',
			description: 'Finish%%games of To Get To The Other Side in 5th place or better',
			icon: 'tgttos/tgttos_expert',
			stat: 'top_five',
			game: 'tgttos',
			tiers: [
				{ name: 'I', amount: 5, trophies: 50 },
				{ name: 'II', amount: 15, trophies: 50 },
				{ name: 'III', amount: 35, trophies: 50 },
				{ name: 'IV', amount: 75, trophies: 50 },
				{ name: 'V', amount: 125, trophies: 50 },
				{ name: 'VI', amount: 225, trophies: 50 },
				{ name: 'VII', amount: 375, trophies: 100 },
				{ name: 'VIII', amount: 500, trophies: 100 },
				{ name: 'IX', amount: 750, trophies: 150 },
				{ name: 'X', amount: 1000, trophies: 150 }
			]
		}
	] as IslandTieredBadge[],
	hitw: [
		{
			name: 'Blaze of Glory',
			description: 'Finish 3rd or higher in a game where you punched a blaze',
			icon: 'hitw/blaze_of_glory',
			stat: 'blaze_of_glory',
			trophies: 50
		},
		{
			name: 'Bullet Time',
			description: 'Survive being hit by the matrix trap',
			icon: 'hitw/bullet_time',
			stat: 'bullet_time',
			trophies: 30
		},
		{
			name: 'Something in the Waves',
			description: 'Catch a fish during a game of Hole in the Wall',
			icon: 'hitw/something_in_the_waves',
			stat: 'fish_catcher',
			trophies: 70,
			secret: true
		},
		{
			name: 'Barely Broiled',
			description: 'Survive being launched by a hot potato',
			icon: 'hitw/barely_broiled',
			stat: 'hot_potato_survivor',
			trophies: 50
		},
		{
			name: 'Monster Catch',
			description: 'Hook a guardian with a fishing rod',
			icon: 'hitw/monster_catch',
			stat: 'monster_catcher',
			trophies: 100,
			secret: true
		},
		{
			name: 'Slimey Rivalry',
			description: 'Survival until the end of a game of Hole in the Wall',
			icon: 'hitw/slimey_rivalry',
			stat: 'slimey_rivalry',
			trophies: 70
		}
	] as IslandBadge[],
	hitw_tiered: [
		{
			name: 'Hole in the Wall Champion',
			description: 'Finish%%games of Hole in the Wall in 1st place or survive till the end',
			icon: 'hitw/hole_in_the_wall_champion',
			stat: 'first_place',
			game: 'hitw',
			tiers: [
				{ name: 'I', amount: 2, trophies: 50 },
				{ name: 'II', amount: 5, trophies: 50 },
				{ name: 'III', amount: 10, trophies: 50 },
				{ name: 'IV', amount: 25, trophies: 50 },
				{ name: 'V', amount: 40, trophies: 50 },
				{ name: 'VI', amount: 70, trophies: 50 },
				{ name: 'VII', amount: 125, trophies: 100 },
				{ name: 'VIII', amount: 200, trophies: 100 },
				{ name: 'IX', amount: 300, trophies: 150 },
				{ name: 'X', amount: 450, trophies: 150 }
			]
		},
		{
			name: 'Hole in the Wall Expert',
			description: 'Finish%%games of Hole in the Wall in 5th place or better',
			icon: 'hitw/hole_in_the_wall_expert',
			stat: 'top_five',
			game: 'hitw',
			tiers: [
				{ name: 'I', amount: 10, trophies: 50 },
				{ name: 'II', amount: 25, trophies: 50 },
				{ name: 'III', amount: 75, trophies: 50 },
				{ name: 'IV', amount: 125, trophies: 50 },
				{ name: 'V', amount: 250, trophies: 50 },
				{ name: 'VI', amount: 425, trophies: 50 },
				{ name: 'VII', amount: 700, trophies: 100 },
				{ name: 'VIII', amount: 900, trophies: 100 },
				{ name: 'IX', amount: 1100, trophies: 150 },
				{ name: 'X', amount: 1300, trophies: 150 }
			]
		},
		{
			name: 'Bring on the Wall',
			description: 'Dodge%%walls in games of Hole in the Wall',
			icon: 'hitw/bring_on_the_wall',
			stat: 'walls_dodged',
			game: 'hitw',
			tiers: [
				{ name: 'I', amount: 350, trophies: 50 },
				{ name: 'II', amount: 1100, trophies: 50 },
				{ name: 'III', amount: 2500, trophies: 50 },
				{ name: 'IV', amount: 5500, trophies: 50 },
				{ name: 'V', amount: 10000, trophies: 50 },
				{ name: 'VI', amount: 15000, trophies: 50 },
				{ name: 'VII', amount: 30000, trophies: 100 }
			]
		}
	] as IslandTieredBadge[],
	dynaball: [
		{
			name: 'Airstrike Assassin',
			description: 'Eliminate 2 players within 15 seconds of using an airstrike',
			icon: 'dynaball/airstrike_assassin',
			stat: 'airstrike_eliminate_2',
			trophies: 70
		},
		{
			name: 'Dynaballin',
			description: 'Eliminate 3 players within 10 seconds',
			icon: 'dynaball/dynaballin',
			stat: 'fast_triple_kill',
			trophies: 100
		},
		{
			name: 'Dynamite Dreadlord',
			description: 'Eliminate 5 players within a single game',
			icon: 'dynaball/dynasniper',
			stat: 'eliminate_5',
			trophies: 100
		},
		{
			name: 'Final Survivor',
			description: 'Win a game whilst being the only remaining player of your team',
			icon: 'dynaball/final_survivor',
			stat: 'only_survivor',
			trophies: 70
		},
		{
			name: 'Massive Repairs',
			description: 'Place 200 repair blocks in a single game',
			icon: 'dynaball/massive_repairs',
			stat: 'repair_200',
			trophies: 30
		},
		{
			name: 'Tactical Powder',
			description: 'Turn an enemy crate into powder with a powder bomb',
			icon: 'dynaball/tactical_powder',
			stat: 'powder_bomb_crate',
			trophies: 30
		},
		{
			name: 'Ultimate Baller',
			description: 'Win a game as the only remaining player against at least 3 enemies',
			icon: 'dynaball/ultimate_baller',
			stat: 'only_survivor_against_3',
			trophies: 70
		}
	] as IslandBadge[],
	dynaball_tiered: [
		{
			name: 'Dynaball Champion',
			description: 'Win%%games of Dynaball while surviving till the end',
			icon: 'dynaball/dynaball_champion',
			stat: 'wins',
			game: 'dynaball',
			tiers: [
				{ name: 'I', amount: 3, trophies: 50 },
				{ name: 'II', amount: 7, trophies: 50 },
				{ name: 'III', amount: 15, trophies: 50 },
				{ name: 'IV', amount: 30, trophies: 50 },
				{ name: 'V', amount: 60, trophies: 50 },
				{ name: 'VI', amount: 100, trophies: 50 },
				{ name: 'VII', amount: 175, trophies: 100 },
				{ name: 'VIII', amount: 300, trophies: 100 },
				{ name: 'IX', amount: 450, trophies: 150 },
				{ name: 'X', amount: 600, trophies: 150 }
			]
		},
		{
			name: 'Dynaball Demolitionist',
			description: 'Destroy%%blocks in games of Dynaball',
			icon: 'dynaball/dynaball_demolitionist',
			stat: 'blocks_destroyed',
			game: 'dynaball',
			tiers: [
				{ name: 'I', amount: 2000, trophies: 50 },
				{ name: 'II', amount: 6000, trophies: 50 },
				{ name: 'III', amount: 15000, trophies: 50 },
				{ name: 'IV', amount: 30000, trophies: 50 },
				{ name: 'V', amount: 60000, trophies: 50 },
				{ name: 'VI', amount: 100000, trophies: 50 },
				{ name: 'VII', amount: 150000, trophies: 100 },
				{ name: 'VIII', amount: 500000, trophies: 100 },
				{ name: 'IX', amount: 1000000, trophies: 150 },
				{ name: 'X', amount: 1500000, trophies: 150 }
			]
		},
		{
			name: 'Dynaball Sniper',
			description: 'Eliminate%%players in games of Dynaball',
			icon: 'dynaball/dynaball_sniper',
			stat: 'kills',
			game: 'dynaball',
			tiers: [
				{ name: 'I', amount: 10, trophies: 50 },
				{ name: 'II', amount: 30, trophies: 50 },
				{ name: 'III', amount: 75, trophies: 50 },
				{ name: 'IV', amount: 150, trophies: 50 },
				{ name: 'V', amount: 275, trophies: 50 },
				{ name: 'VI', amount: 450, trophies: 50 },
				{ name: 'VII', amount: 800, trophies: 100 },
				{ name: 'VIII', amount: 1200, trophies: 100 },
				{ name: 'IX', amount: 1600, trophies: 150 },
				{ name: 'X', amount: 2000, trophies: 150 }
			]
		},
		{
			name: 'Dynaball Engineer',
			description: 'Place%%repair blocks in games of Dynaball',
			icon: 'dynaball/dynaball_engineer',
			stat: 'blocks_placed',
			game: 'dynaball',
			tiers: [
				{ name: 'I', amount: 1000, trophies: 50 },
				{ name: 'II', amount: 3000, trophies: 50 },
				{ name: 'III', amount: 7000, trophies: 50 },
				{ name: 'IV', amount: 15000, trophies: 50 },
				{ name: 'V', amount: 25000, trophies: 50 },
				{ name: 'VI', amount: 45000, trophies: 50 },
				{ name: 'VII', amount: 80000, trophies: 100 }
			]
		},
		{
			name: 'Spawner Smasher',
			description: 'Destroy%%spawners in games of Dynaball',
			icon: 'dynaball/dynaball_spawner_smasher',
			stat: 'spawners_destroyed',
			game: 'dynaball',
			tiers: [
				{ name: 'I', amount: 10, trophies: 50 },
				{ name: 'II', amount: 30, trophies: 50 },
				{ name: 'III', amount: 75, trophies: 50 },
				{ name: 'IV', amount: 150, trophies: 50 },
				{ name: 'V', amount: 275, trophies: 50 },
				{ name: 'VI', amount: 450, trophies: 50 },
				{ name: 'VII', amount: 800, trophies: 100 }
			]
		},
		{
			name: 'Dynaball Survivor',
			description: 'Survive for at least 2 minutes in%%games of Dynaball',
			icon: 'dynaball/dynaball_survivor',
			stat: 'survive_2m',
			game: 'dynaball',
			tiers: [
				{ name: 'I', amount: 15, trophies: 50 },
				{ name: 'II', amount: 50, trophies: 50 },
				{ name: 'III', amount: 100, trophies: 50 },
				{ name: 'IV', amount: 200, trophies: 50 },
				{ name: 'V', amount: 375, trophies: 50 },
				{ name: 'VI', amount: 650, trophies: 50 },
				{ name: 'VII', amount: 1100, trophies: 100 }
			]
		}
	] as IslandTieredBadge[],
	dojo_tiered: [
		{
			name: 'Standard Completionist',
			description: 'Perform a Standard completion on all courses of%%Parkour Warrior Dojo rotation',
			icon: 'parkour_warrior/standard_completionist',
			stat: 'unique_rot_standard',
			game: 'parkour_warrior/solo',
			tiers: [
				{ name: 'I', amount: 1, trophies: 50 },
				{ name: 'II', amount: 2, trophies: 50 },
				{ name: 'III', amount: 3, trophies: 50 },
				{ name: 'IV', amount: 5, trophies: 50 },
				{ name: 'V', amount: 7, trophies: 50 },
				{ name: 'VI', amount: 10, trophies: 50 },
				{ name: 'VII', amount: 15, trophies: 100 },
				{ name: 'VIII', amount: 18, trophies: 100 },
				{ name: 'IX', amount: 21, trophies: 150 },
				{ name: 'X', amount: 24, trophies: 150 }
			]
		},
		{
			name: 'Advanced Completionist',
			description:
				'Perform an Advanced completion on all courses of%%Parkour Warrior Dojo rotation',
			icon: 'parkour_warrior/advanced_completionist',
			stat: 'unique_rot_advanced',
			game: 'parkour_warrior/solo',
			tiers: [
				{ name: 'I', amount: 1, trophies: 50 },
				{ name: 'II', amount: 2, trophies: 50 },
				{ name: 'III', amount: 3, trophies: 50 },
				{ name: 'IV', amount: 5, trophies: 50 },
				{ name: 'V', amount: 7, trophies: 50 },
				{ name: 'VI', amount: 10, trophies: 50 },
				{ name: 'VII', amount: 15, trophies: 100 },
				{ name: 'VIII', amount: 18, trophies: 100 },
				{ name: 'IX', amount: 21, trophies: 150 },
				{ name: 'X', amount: 24, trophies: 150 }
			]
		},
		{
			name: 'Expert Completionist',
			description: 'Perform an Expert completion on all courses of%%Parkour Warrior Dojo rotation',
			icon: 'parkour_warrior/expert_completionist',
			stat: 'unique_rot_expert',
			game: 'parkour_warrior/solo',
			tiers: [
				{ name: 'I', amount: 1, trophies: 50 },
				{ name: 'II', amount: 2, trophies: 50 },
				{ name: 'III', amount: 3, trophies: 50 },
				{ name: 'IV', amount: 5, trophies: 50 },
				{ name: 'V', amount: 7, trophies: 50 },
				{ name: 'VI', amount: 10, trophies: 50 },
				{ name: 'VII', amount: 15, trophies: 100 },
				{ name: 'VIII', amount: 18, trophies: 100 },
				{ name: 'IX', amount: 21, trophies: 150 },
				{ name: 'X', amount: 24, trophies: 150 }
			]
		},
		{
			name: 'Standard Leaper',
			description: 'Perform Standard completions on%%unique Parkour Warrior Dojo courses',
			icon: 'parkour_warrior/standard_leaper',
			stat: 'unique_standard',
			game: 'parkour_warrior/solo',
			tiers: [
				{ name: 'I', amount: 7, trophies: 50 },
				{ name: 'II', amount: 15, trophies: 50 },
				{ name: 'III', amount: 25, trophies: 50 },
				{ name: 'IV', amount: 45, trophies: 50 },
				{ name: 'V', amount: 75, trophies: 50 },
				{ name: 'VI', amount: 125, trophies: 50 },
				{ name: 'VII', amount: 200, trophies: 100 },
				{ name: 'VIII', amount: 275, trophies: 100 },
				{ name: 'IX', amount: 350, trophies: 150 },
				{ name: 'X', amount: 450, trophies: 150 }
			]
		},
		{
			name: 'Advanced Leaper',
			description: 'Perform Advanced completions on%%unique Parkour Warrior Dojo courses',
			icon: 'parkour_warrior/advanced_leaper',
			stat: 'unique_advanced',
			game: 'parkour_warrior/solo',
			tiers: [
				{ name: 'I', amount: 7, trophies: 50 },
				{ name: 'II', amount: 15, trophies: 50 },
				{ name: 'III', amount: 25, trophies: 50 },
				{ name: 'IV', amount: 45, trophies: 50 },
				{ name: 'V', amount: 75, trophies: 50 },
				{ name: 'VI', amount: 125, trophies: 50 },
				{ name: 'VII', amount: 200, trophies: 100 },
				{ name: 'VIII', amount: 275, trophies: 100 },
				{ name: 'IX', amount: 350, trophies: 150 },
				{ name: 'X', amount: 450, trophies: 150 }
			]
		},
		{
			name: 'Expert Leaper',
			description: 'Perform Expert completions on%%unique Parkour Warrior Dojo courses',
			icon: 'parkour_warrior/expert_leaper',
			stat: 'unique_expert',
			game: 'parkour_warrior/solo',
			tiers: [
				{ name: 'I', amount: 7, trophies: 50 },
				{ name: 'II', amount: 15, trophies: 50 },
				{ name: 'III', amount: 25, trophies: 50 },
				{ name: 'IV', amount: 45, trophies: 50 },
				{ name: 'V', amount: 75, trophies: 50 },
				{ name: 'VI', amount: 125, trophies: 50 },
				{ name: 'VII', amount: 200, trophies: 100 },
				{ name: 'VIII', amount: 275, trophies: 100 },
				{ name: 'IX', amount: 350, trophies: 150 },
				{ name: 'X', amount: 450, trophies: 150 }
			]
		}
	] as IslandTieredBadge[],
	survivor_tiered: [
		{
			name: 'Parkour Warrior Champion',
			description: 'Win the final duel in%%games of Parkour Warrior Survivor',
			icon: 'parkour_warrior/parkour_warrior_champion',
			stat: 'wins',
			game: 'parkour_warrior',
			tiers: [
				{ name: 'I', amount: 1, trophies: 50 },
				{ name: 'II', amount: 3, trophies: 50 },
				{ name: 'III', amount: 5, trophies: 50 },
				{ name: 'IV', amount: 15, trophies: 50 },
				{ name: 'V', amount: 25, trophies: 50 },
				{ name: 'VI', amount: 45, trophies: 50 },
				{ name: 'VII', amount: 75, trophies: 100 },
				{ name: 'VIII', amount: 125, trophies: 100 },
				{ name: 'IX', amount: 200, trophies: 150 },
				{ name: 'X', amount: 300, trophies: 150 }
			]
		},
		{
			name: 'Parkour Warrior Finalist',
			description: 'Complete Leap 6 in%%games of Parkour Warrior Survivor',
			icon: 'parkour_warrior/parkour_warrior_finalist',
			stat: 'leap_6',
			game: 'parkour_warrior',
			tiers: [
				{ name: 'I', amount: 10, trophies: 50 },
				{ name: 'II', amount: 25, trophies: 50 },
				{ name: 'III', amount: 60, trophies: 50 },
				{ name: 'IV', amount: 120, trophies: 50 },
				{ name: 'V', amount: 225, trophies: 50 },
				{ name: 'VI', amount: 375, trophies: 50 },
				{ name: 'VII', amount: 625, trophies: 100 }
			]
		},
		{
			name: 'Parkour Warrior Assassin',
			description: 'Eliminate%%players in games of Parkour Warrior Survivor',
			icon: 'parkour_warrior/parkour_warrior_assassin',
			stat: 'kills',
			game: 'parkour_warrior',
			tiers: [
				{ name: 'I', amount: 100, trophies: 50 },
				{ name: 'II', amount: 350, trophies: 50 },
				{ name: 'III', amount: 800, trophies: 50 },
				{ name: 'IV', amount: 1750, trophies: 50 },
				{ name: 'V', amount: 3000, trophies: 50 },
				{ name: 'VI', amount: 5000, trophies: 50 },
				{ name: 'VII', amount: 8000, trophies: 100 }
			]
		}
	] as IslandTieredBadge[],
	rocket_spleef: [
		{
			name: 'Advanced Tactics',
			description: 'Survive 60 seconds without deploying your elytra',
			icon: 'rocket_spleef/advanced_tactics',
			stat: 'survive_60s_without_gliding',
			trophies: 50,
			secret: true
		},
		{
			name: 'Careful Glider',
			description: 'Win a game without dropping below 50% elytra durability',
			icon: 'rocket_spleef/careful_glider',
			stat: 'win_above_half_durability',
			trophies: 70,
			secret: true
		},
		{
			name: 'Flawless Rocketeer',
			description: 'Win without using any updrafts',
			icon: 'rocket_spleef/flawless_rocketeer',
			stat: 'win_without_updraft',
			trophies: 50,
			secret: true
		},
		{
			name: 'Rocket Brawler',
			description: 'Punch 3 players within 10 seconds',
			icon: 'rocket_spleef/rocket_brawler',
			stat: 'fast_punch',
			trophies: 30
		},
		{
			name: 'Rocket Rush',
			description: 'Eliminate 3 players within 20 seconds',
			icon: 'rocket_spleef/rocket_rush',
			stat: 'fast_triple_kill',
			trophies: 100
		},
		{
			name: 'Spleef Sniper',
			description: 'Land a direct hit with a rocket on a player at least 40 blocks away',
			icon: 'rocket_spleef/spleef_sniper',
			stat: 'distant_direct',
			trophies: 70
		},
		{
			name: 'Spleef Slapdown',
			description: 'Eliminate a player by punching them into the void before they next land',
			icon: 'rocket_spleef/spleef_slapdown',
			stat: '!melee_kills',
			trophies: 30
		},
		{
			name: 'Ultimate Rocketeer',
			description: 'Eliminate 5 players in a single game',
			icon: 'rocket_spleef/ultimate_rocketeer',
			stat: 'eliminate_5',
			trophies: 100
		}
	] as IslandBadge[],
	rocket_spleef_tiered: [
		{
			name: 'Rocket Spleef Champion',
			description: 'Place 1st in%%games of Rocket Spleef Rush',
			icon: 'rocket_spleef/rocket_spleef_champion',
			stat: 'first_place',
			game: 'rocket_spleef',
			tiers: [
				{ name: 'I', amount: 2, trophies: 50 },
				{ name: 'II', amount: 5, trophies: 50 },
				{ name: 'III', amount: 10, trophies: 50 },
				{ name: 'IV', amount: 25, trophies: 50 },
				{ name: 'V', amount: 50, trophies: 50 },
				{ name: 'VI', amount: 100, trophies: 50 },
				{ name: 'VII', amount: 150, trophies: 100 },
				{ name: 'VIII', amount: 250, trophies: 100 },
				{ name: 'IX', amount: 400, trophies: 150 },
				{ name: 'X', amount: 600, trophies: 150 }
			]
		},
		{
			name: 'Rocket Spleef Expert',
			description: 'Place in the top 5 in%%games of Rocket Spleef Rush',
			icon: 'rocket_spleef/rocket_spleef_expert',
			stat: 'top_five',
			game: 'rocket_spleef',
			tiers: [
				{ name: 'I', amount: 10, trophies: 50 },
				{ name: 'II', amount: 30, trophies: 50 },
				{ name: 'III', amount: 75, trophies: 50 },
				{ name: 'IV', amount: 150, trophies: 50 },
				{ name: 'V', amount: 275, trophies: 50 },
				{ name: 'VI', amount: 450, trophies: 50 },
				{ name: 'VII', amount: 800, trophies: 100 },
				{ name: 'VIII', amount: 950, trophies: 100 },
				{ name: 'IX', amount: 1100, trophies: 150 },
				{ name: 'X', amount: 1250, trophies: 150 }
			]
		},
		{
			name: 'Rocket Spleef Glider',
			description: 'Survive for at least 1 minute in%%games of Rocket Spleef Rush',
			icon: 'rocket_spleef/rocket_spleef_glider',
			stat: 'survive_60s',
			game: 'rocket_spleef',
			tiers: [
				{ name: 'I', amount: 20, trophies: 50 },
				{ name: 'II', amount: 60, trophies: 50 },
				{ name: 'III', amount: 150, trophies: 50 },
				{ name: 'IV', amount: 300, trophies: 50 },
				{ name: 'V', amount: 600, trophies: 50 },
				{ name: 'VI', amount: 1000, trophies: 50 },
				{ name: 'VII', amount: 1500, trophies: 100 }
			]
		},
		{
			name: 'Rocket Spleef Warrior',
			description: 'Land direct hits with%%rockets during games of Rocket Spleef Rush',
			icon: 'rocket_spleef/rocket_spleef_warrior',
			stat: 'rockets_hit',
			game: 'rocket_spleef',
			tiers: [
				{ name: 'I', amount: 50, trophies: 50 },
				{ name: 'II', amount: 150, trophies: 50 },
				{ name: 'III', amount: 350, trophies: 50 },
				{ name: 'IV', amount: 750, trophies: 50 },
				{ name: 'V', amount: 1350, trophies: 50 },
				{ name: 'VI', amount: 2500, trophies: 50 },
				{ name: 'VII', amount: 4000, trophies: 100 },
				{ name: 'VIII', amount: 7000, trophies: 100 },
				{ name: 'IX', amount: 10000, trophies: 150 },
				{ name: 'X', amount: 15000, trophies: 150 }
			]
		},
		{
			name: 'Rocket Spleef Survivor',
			description: 'Outlive%%players during games of Rocket Spleef Rush',
			icon: 'rocket_spleef/rocket_spleef_survivor',
			stat: 'players_outlived',
			game: 'rocket_spleef',
			tiers: [
				{ name: 'I', amount: 150, trophies: 50 },
				{ name: 'II', amount: 500, trophies: 50 },
				{ name: 'III', amount: 1100, trophies: 50 },
				{ name: 'IV', amount: 2500, trophies: 50 },
				{ name: 'V', amount: 4500, trophies: 50 },
				{ name: 'VI', amount: 7500, trophies: 50 },
				{ name: 'VII', amount: 12500, trophies: 100 }
			]
		}
	] as IslandTieredBadge[]
};
