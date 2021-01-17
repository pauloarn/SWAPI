export interface Movies{
    title: string,
    episode_id: number,
    opening_crawl: string,
    director: string,
    producer: string,
    release_date: string,
    characters: string[],
    starships: string[],
    vehicles: string[],
    url: string
}

export interface MovieParams{
    id:string
}

export interface MovieMin{
    id: string,
    title: string
}