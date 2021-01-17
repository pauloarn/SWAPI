export interface Characters{    
    name: string,
    height: number,
    mass: number,
    hair_color: string,
    skin_color: string,
    eye_color: string,
    gender: string,
    films: string[],
    vehicles: string[],
    starships: string[],
    url: string
}

export interface CharacterMin{    
    id: string,
    name: string
}

export interface CharacterParams{
    id:string
}