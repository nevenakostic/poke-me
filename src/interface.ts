export interface Pokemon {
    id: number;
    name: string;
    sprites: {
        front_default: string;
    }
}
export interface Abilities {
    ability: string;
    name:string;
}
export interface Stats {
    stat: string;
    name:string;
}
export interface Types {
    type: string;
    name:string;
}
export interface Moves {
    move: string;
    name:string;
}
export interface OnePokemonDetails extends Pokemon, Abilities, Types, Moves {}

export interface PokemonDetails {
    id: number;
    isOpened:boolean;
}

