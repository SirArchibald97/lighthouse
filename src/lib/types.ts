export interface PlayerBasics {
    uuid: string,
    username: string,
    ranks: string[],
}

export interface PlayerStatus {
    lastJoin: string,
    firstJoin: string,
    online: boolean,
    server: {
        category: string,
        associatedGame: string,
        subType: string
    }
}

export interface PlayerSocials {
    party: {
        active: boolean,
        leader: PlayerBasics,
        members: PlayerBasics[]
    },
    friends: [{
        uuid: string,
        username: string,
        ranks: string[],
        status: PlayerStatus | undefined
    }]
}

export interface PlayerTrophies {
    style_trophies: {
        obtained: number,
        obtainable: number,
        bonus: number
    },
    skill_trophies: {
        obtained: number,
        obtainable: number,
        bonus: number
    },
    angler_trophies: {
        obtained: number,
        obtainable: number,
        bonus: number
    },
    levelData: {
        level: number,
        evolution: number,
        nextEvolutionLevel: number,
        nextLevelProgress: {
            obtained: number,
            obtainable: number
        }
    },
    fishingLevelData: {
        level: number,
        evolution: number,
        nextEvolutionLevel: number,
        nextLevelProgress: {
            obtained: number,
            obtainable: number
        }
    }
}

export interface Player {
    uuid: string,
    username: string,
    ranks: string[],
    crownLevel: PlayerTrophies
    status: PlayerStatus | undefined,
    social: PlayerSocials | undefined
}

export interface IslandApiResponse {
    code: number,
    success: boolean,
    player: Player,
    message: string | undefined
}