export interface Starships{
    name: string,
    model: string,
    manufacturer: string,
    cost_in_credits: number,
    length: number,
    max_atmosphering_speed: number,
    crew: number,
    passengers: number,
    cargo_capacity: number,
    consumables: string,
    hyperdrive_rating: string,
    MGLT: string,
    starship_class: string,
    pilots: string[],
    films: string[],
    url: string
}

export interface StarshipParams{
    id:string
}

export interface StarshipMin{
    id: string,
    name: string
}