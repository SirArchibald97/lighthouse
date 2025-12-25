export const fishingCollections = [
	{ name: 'Verdant Woods', climate: 'TEMPERATE', icon: 'verdant_woods', level: 0, type: 'fish' },
	{ name: 'Floral Forest', climate: 'TEMPERATE', icon: 'floral_forest', level: 10, type: 'fish' },
	{ name: 'Dark Grove', climate: 'TEMPERATE', icon: 'dark_grove', level: 20, type: 'fish' },
	{ name: 'Temperate Crab Pots', climate: 'TEMPERATE', icon: 'crab_pot', level: 0, type: 'crab' },
	{
		name: 'Sunken Swamp',
		climate: 'TEMPERATE',
		icon: 'grotto_temperate',
		level: 0,
		type: 'grotto'
	},
	{
		name: 'Tropical Overgrowth',
		climate: 'TROPICAL',
		icon: 'tropical_overgrowth',
		level: 30,
		type: 'fish'
	},
	{ name: 'Coral Shores', climate: 'TROPICAL', icon: 'coral_shores', level: 40, type: 'fish' },
	{ name: 'Twisted Swamp', climate: 'TROPICAL', icon: 'twisted_swamp', level: 45, type: 'fish' },
	{ name: 'Tropical Crab Pots', climate: 'TROPICAL', icon: 'crab_pot', level: 30, type: 'crab' },
	{
		name: 'Mirrored Oasis',
		climate: 'TROPICAL',
		icon: 'grotto_tropical',
		level: 30,
		type: 'grotto'
	},
	{ name: 'Ancient Sands', climate: 'BARREN', icon: 'ancient_sands', level: 50, type: 'fish' },
	{ name: 'Blazing Canyon', climate: 'BARREN', icon: 'blazing_canyon', level: 55, type: 'fish' },
	{ name: 'Ashen Wastes', climate: 'BARREN', icon: 'ashen_wastes', level: 60, type: 'fish' },
	{ name: 'Barren Crab Pots', climate: 'BARREN', icon: 'crab_pot', level: 50, type: 'crab' },
	{
		name: 'Volcanic Springs',
		climate: 'BARREN',
		icon: 'grotto_barren',
		level: 50,
		type: 'grotto'
	}
] as { name: string; climate: string; icon: string; level: number; type: 'fish' | 'crab' }[];
