export interface Player {
    uuid: string,
    username: string,
    ranks: string[],
}

export interface IslandApiResponse {
    code: number,
    success: boolean,
    player: Player,
    message: string | undefined
}