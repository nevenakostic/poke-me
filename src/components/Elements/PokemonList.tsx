import React, { FunctionComponent } from 'react';
import { PokemonCard } from "./PokemonCard";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// @ts-ignore
import {PokemonDetails, OnePokemonDetails} from "../interface";

interface PokemonListProps {
    pokemons: OnePokemonDetails[];
    pokemonDetails: PokemonDetails;
    setPokemonDetails: React.Dispatch<React.SetStateAction<PokemonDetails>>
}
export const PokemonList:FunctionComponent<PokemonListProps> = ({pokemons, pokemonDetails, setPokemonDetails}: PokemonListProps) => {
    const viewDetails = (id:number) => {
        if (!pokemonDetails.isOpened) {
            setPokemonDetails({
                id:id,
                isOpened: true
            })
        }
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {pokemons.map((onePokemon) => {
                    return (
                        <Grid onClick={() => viewDetails(onePokemon.id)} item xs={2} sm={4} md={4} key={onePokemon.id} >
                            <PokemonCard
                            pokemonDetails={pokemonDetails}
                            setPokemonDetails={setPokemonDetails}
                            key={onePokemon.name}
                            name={onePokemon.name}
                            id={onePokemon.id}
                            image={onePokemon.sprites.front_default}
                            abilities={onePokemon.abilities}
                            moves={onePokemon.moves}
                            types={onePokemon.types}
                            stats={onePokemon.stats}
                            />
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
    );
}
