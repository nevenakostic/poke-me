export interface Pokemon {
    id: number;
    name: string;
    sprites: {
        front_default: string;
    }
}
export interface Evolution {
    chain: {
        evolves_to:string;
    }[];
}
export interface OnePokemonDetails extends Pokemon {
    abilities?: {
        ability: string;
        name:string;
    }[];
    types?: {
        type: string;
        name:string;
    }[];
    stats?: {
        base_stat: number;
        stat: string;
        name:string;
    }[];
    moves?: {
        move: string;
        name:string;
    }[];
}

export interface PokemonDetails {
    id: number;
    isOpened:boolean;
}

