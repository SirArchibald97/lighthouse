export enum Rarity {
	COMMON = 'COMMON',
	UNCOMMON = 'UNCOMMON',
	RARE = 'RARE',
	EPIC = 'EPIC',
	LEGENDARY = 'LEGENDARY',
	MYTHIC = 'MYTHIC'
}

export enum QuestType {
	DAILY = 'DAILY',
	WEEKLY = 'WEEKLY',
	SCROLL = 'SCROLL'
}

export interface PlayerStatus {
	lastJoin: string;
	firstJoin: string;
	online: boolean;
	server: {
		category: string;
		associatedGame: string;
		subType: string;
	};
}

export interface PlayerBasics {
	uuid: string;
	username: string;
	ranks: string[];
	status: PlayerStatus | undefined;
}

export interface PlayerSocials {
	party: {
		active: boolean;
		leader: PlayerBasics;
		members: PlayerBasics[];
	};
	friends: PlayerBasics[];
}

export interface PlayerTrophies {
	style_trophies: {
		obtained: number;
		obtainable: number;
		bonus: number;
	};
	skill_trophies: {
		obtained: number;
		obtainable: number;
		bonus: number;
	};
	fishing_trophies: {
		obtained: number;
		obtainable: number;
		bonus: number;
	};
	angler_trophies: {
		obtained: number;
		obtainable: number;
		bonus: number;
	};
	levelData: {
		level: number;
		evolution: number;
		nextEvolutionLevel: number;
		nextLevelProgress: {
			obtained: number;
			obtainable: number;
		};
	};
	fishingLevelData: {
		level: number;
		evolution: number;
		nextEvolutionLevel: number;
		nextLevelProgress: {
			obtained: number;
			obtainable: number;
		};
	};
	styleLevelData: {
		level: number;
		evolution: number;
		nextEvolutionLevel: number;
		nextLevelProgress: {
			obtained: number;
			obtainable: number;
		};
	};
}

export interface PlayerFactions {
	name: string;
	selected: boolean;
	totalExperience: number;
	levelData: {
		level: number;
		nextLevelProgress: {
			obtained: number;
			obtainable: number;
		};
		evolution: number;
		nextEvolutionLevel: number;
	};
}

export interface PlayerQuests {
	type: QuestType;
	rarity: Rarity;
	boost: boolean;
	completed: boolean;
	tasks: {
		statistic: {
			key: string;
		};
		progress: {
			obtained: number;
			obtainable: number;
		};
	}[];
}

export interface IslandFish {
	[key: string]: string | boolean | number | undefined;
	name: string;
	rarity: string;
	climate: string;
	collection: string;
	elusive: boolean;
	catchTime: 'ALWAYS' | 'DAY' | 'NIGHT';
	averageTrophies: number;
	largeTrophies: number;
	massiveTrophies: number | undefined;
	gargantuanTrophies: number | undefined;
	colossalTrophies: number | undefined;
}

export interface IslandFishWeight {
	[key: string]: string;
	weight: 'AVERAGE' | 'LARGE' | 'MASSIVE' | 'GARGANTUAN' | 'COLOSSAL';
	firstCaught: string;
}

export interface PlayerCollections {
	currency: {
		coins: number;
		goop: number;
		royalReputation: number;
		anglrTokens: number;
	};
	fish: { fish: IslandFish; weights: IslandFishWeight[] }[];
	equippedCosmetics: {
		name: string;
		rarity: string;
		category: string;
		collection: string;
		trophies: number;
		isBonusTrophies: boolean;
		canBeDonated: boolean;
		colorable: boolean;
		globalNumberOwned: string;
	}[];
	cosmetics: {
		cosmetic: Cosmetic;
		owned: boolean;
		donationsMade: number;
		chromaPacks: string[];
	}[];
}

export interface Cosmetic {
	name: string;
	rarity: string;
	category: string;
	collection: string;
	trophies: number;
	isBonusTrophies: boolean;
	canBeDonated: boolean;
	colorable: boolean;
	globalNumberOwned: string;
	type: string;
	obtainmentHint: string;
	royalReputation: {
		donationLimit: number;
		reputationAmount: number;
	};
}

export interface BattleBoxStatistics {
	[key: string]: number | object;
	games_played: number;
	rounds_won: number;
	team_first_place: number;
	team_second_place: number;
	team_third_place: number;
	team_fourth_place: number;
	team_wlr: number;
	solo_first_place: number;
	solo_top_three: number;
	solo_top_five: number;
	solo_losses: number;
	solo_wlr: number;
	kills: number;
	deaths: number;
	kdr: number;
	melee_kills: number;
	ranged_kills: number;
	explosive_kills: number;
	blocks_placed: number;
	blocks_broken: number;
	total_score: number;
	ace: number;
	badges: {
		[key: string]: number;
		blind_brawl: number;
		aerial_assault: number;
		stealthy_takedown: number;
		ace_from_afar: number;
		ultimate_ace: number;
		leave_it_to_me: number;
		untouchable_assassin: number;
		flawless_battle: number;
		demolitions_expert: number;
		two_birds: number;
	};
}

export interface SkyBattleStatistics {
	[key: string]: number | object;
	games_played: number;
	solo_first_place: number;
	solo_top_three: number;
	solo_top_five: number;
	solo_top_eight: number;
	solo_top_ten: number;
	solo_top_fifty_percent: number;
	solo_losses: number;
	solo_wlr: number;
	team_first_place: number;
	team_second_place: number;
	team_third_place: number;
	team_fourth_place: number;
	team_fifth_place: number;
	team_sixth_place: number;
	team_seventh_place: number;
	team_eigth_place: number;
	team_losses: number;
	team_wlr: number;
	kills: number;
	deaths: number;
	kdr: number;
	melee_kills: number;
	ranged_kills: number;
	explosive_kills: number;
	blocks_placed: number;
	blocks_broken: number;
	total_score: number;
	chests_looted: number;
	golden_chests_looted: number;
	survived_minute: number;
	survived_two_minute: number;
	badges: {
		[key: string]: number;
		sky_lord: number;
		sky_sniper: number;
		fallen_warrior: number;
		team_crusher: number;
		wings_to_fly: number;
		creeper_coffin: number;
		untouchable_champion: number;
		personal_feast: number;
	};
}

export interface TgttosStatistics {
	[key: string]: number | object;
	games_played: number;
	first_place: number;
	top_three: number;
	top_five: number;
	top_eight: number;
	top_fifty_percent: number;
	game_losses: number;
	game_wlr: number;
	round_first_place: number;
	round_top_three: number;
	round_top_five: number;
	round_top_eight: number;
	round_top_fifty_percent: number;
	round_losses: number;
	chickens_punched: number;
	total_score: number;
	kills: number;
	deaths: number;
	kdr: number;
	blocks_placed: number;
	blocks_broken: number;
	badges: {
		[key: string]: number;
		triple_champion: number;
		ultimate_comeback: number;
		slapdown: number;
		pave_the_way: number;
		got_the_worm: number;
		victorious_pacifist: number;
		jackpot: number;
		untouchable_speedster: number;
	};
}

export interface HitwStatistics {
	[key: string]: number | object;
	games_played: number;
	first_place: number;
	top_three: number;
	top_five: number;
	top_eight: number;
	top_fifty_percent: number;
	losses: number;
	wlr: number;
	walls_dodged: number;
	total_score: number;
	players_outlived: number;
	survived_minute: number;
	survived_two_minute: number;
	badges: {
		[key: string]: number;
		blaze_of_glory: number;
		bullet_time: number;
		monster_catcher: number;
		slimey_rivalry: number;
		fish_catcher: number;
		hot_potato_survivor: number;
	};
}

export interface DynaballStatistics {
	[key: string]: number | object;
	games_played: number;
	wins: number;
	losses: number;
	wlr: number;
	kills: number;
	kdr: number;
	players_stuck: number;
	blocks_destroyed: number;
	blocks_placed: number;
	spawners_destroyed: number;
	survive_1m: number;
	survive_2m: number;
	survive_3m: number;
	survive_4m: number;
	badges: {
		[key: string]: number;
		fast_triple_kill: number;
		powder_bomb_crate: number;
		repair_200: number;
		only_survivor: number;
		only_survivor_against_3: number;
		eliminate_5: number;
		airstrike_eliminate_2: number;
	};
}

export interface ParkourWarriorDojoStatistics {
	[key: string]: number;
	unique_medals: number;
	total_medals: number;
	unique_standard: number;
	unique_advanced: number;
	unique_expert: number;
	total_standard: number;
	total_advanced: number;
	total_expert: number;
	unique_rot_standard: number;
	unique_rot_advanced: number;
	unique_rot_expert: number;
}

export interface ParkourWarriorSurvivorStatistics {
	[key: string]: number;
	games_played: number;
	kills: number;
	wins: number;
	losses: number;
	wlr: number;
	leap_2: number;
	leap_3: number;
	leap_4: number;
	leap_5: number;
	leap_6: number;
	leap_7: number;
	obstacles: number;
}

export interface RocketSpleefStatistics {
	[key: string]: any;
	games_played: number;
	first_place: number;
	top_three: number;
	top_five: number;
	top_eight: number;
	losses: number;
	wlr: number;
	kills: number;
	melee_kills: number;
	deaths: number;
	kdr: number;
	rockets_fired: number;
	rockets_hit: number;
	rocket_hit_rate: number;
	team_kills: number;
	survive_60s: number;
	players_outlived: number;
	badges: {
		[key: string]: number;
		fast_triple_kill: number;
		fast_punch: number;
		win_above_half_durability: number;
		win_without_updraft: number;
		eliminate_5: number;
		survive_60s_without_gliding: number;
		distant_direct: number;
	};
}

export interface FishingStatistics {
	sunken_xp: number;
	total_catches: number;
	fish_caught: {
		total: number;
		common: number;
		uncommon: number;
		rare: number;
		epic: number;
		legendary: number;
		mythic: number;
		average: number;
		large: number;
		massive: number;
		gargantuan: number;
	};
	pearls_caught: {
		total: number;
		rough: number;
		polished: number;
		pristine: number;
	};
	treasure_caught: {
		total: number;
		common: number;
		uncommon: number;
		rare: number;
		epic: number;
		legendary: number;
		mythic: number;
	};
	spirits_caught: {
		total: number;
		spirit: number;
		refined: number;
		pure: number;
	};
	trash_caught: {
		total: number;
		common: number;
		uncommon: number;
		rare: number;
		epic: number;
		legendary: number;
	};
	wayfinder: {
		temperate: number;
		tropical: number;
		barren: number;
	};
}

export interface PlayerStatistics {
	games_played: number;
	community_contribution: number;
	total_xp: number;
	game_xp: number;
	quest_xp: number;
	fishing_xp: number;

	fishing: FishingStatistics;
	battle_box: BattleBoxStatistics;
	sky_battle: {
		quads: SkyBattleStatistics;
		summer: SkyBattleStatistics;
	};
	tgttos: TgttosStatistics;
	hitw: HitwStatistics;
	dynaball: DynaballStatistics;
	pkw: {
		dojo: ParkourWarriorDojoStatistics;
		survivor: ParkourWarriorSurvivorStatistics;
	};
	rocket_spleef: RocketSpleefStatistics;
}

export interface Player {
	uuid: string;
	username: string;
	ranks: string[];
	mccPlusStatus: {
		totalDays: number;
		streakStart: string;
		evolution: number;
	};
	trophies: {
		total: number;
		max: number;
		bonus: number;
		skill: {
			total: number;
			max: number;
			bonus: number;
		};
		style: {
			total: number;
			max: number;
			bonus: number;
		};
		angler: {
			total: number;
			max: number;
			bonus: number;
		};
	};
	crownLevel: PlayerTrophies;
	status: PlayerStatus | undefined;
	social: PlayerSocials | undefined;
	collections: PlayerCollections | undefined;
	statistics: PlayerStatistics | undefined;
	quests: PlayerQuests[] | undefined;
	factions: PlayerFactions[] | undefined;
}

export interface IslandApiResponse {
	code: number;
	success: boolean;
	player: Player;
	message: string | undefined;
}

export interface IslandBadge {
	name: string;
	description: string;
	icon: string;
	stat: string;
	trophies: number;
	secret: boolean | undefined;
}

export interface IslandTieredBadge {
	[key: string]: any;
	name: string;
	description: string;
	icon: string;
	stat: string;
	game: string;
	tiers: {
		name: string;
		amount: number;
		trophies: number;
	}[];
}
