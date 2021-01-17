export interface Vehicles{    
    name: string,
    model: string,
    manufacturer: string,
    cost_in_credits: number,
    length: string,
    max_atmosphering_speed: string,
    crew: number,
    passengers: number,
    cargo_capacity: number,
    consumables: string,
    vehicle_class: string,
    pilots: string[],
    films: string[],
    url: string
}

export interface VehicleMin{
    id:string,
    name:string
}

export interface VehicleParams{
    id: string
}