import React, {FunctionComponent, useEffect, useState} from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Header } from "./components/Header";
import { PokemonList } from "./components/Elements/PokemonList";
import './App.css';
import axios from "axios";
import {Pokemon} from "./interface";
import {PokemonDetails, Evolution} from "./interface";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {styled} from "@mui/material";

interface Pokemons {
    name: string;
    url: string;
}

const PokemonButton = styled(Button) ({
    fontSize: '1.2rem',
    color: '#fff',
    textAlign: 'center',
    outline: 'none',
    height: '60px',
    width: '300px',
    backgroundColor: '#eb4d62',
    '&:hover': {
        backgroundColor: '#eb4d62',
        opacity: 0.8,
        outline: 'none',
    },
});

export const App: FunctionComponent = () => {
    const [findPokemon, setFindPokemon] = useState<boolean>(true);
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [nextUrl, setNextUrl] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [evolution, setEvolution] = useState<Evolution[]>([]);
    const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails>({
        id: 0,
        isOpened: false,
    })

    // I was getting mixed results so I found below another way with function loadPokemons...

    // useEffect(()=>{
    //     const getPokemon = async () => {
    //         const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20&offset=20")
    //         res.data.results.forEach(async(pokemon:Pokemons, index:number) => {
    //             const onePoke = await axios.get(`https://pokeapi.co/api/v2//pokemon/${pokemon.name}`)
    //             setPokemons((p) => [...p, onePoke.data])
    //
    //             const evolution = await axios.get(`https://pokeapi.co/api/v2/evolution-chain/${index}`)
    //             setEvolution((p) => [...p, evolution.data])
    //             setLoading(false);
    //         })
    //         setNextUrl(res.data.next);
    //     }
    //     getPokemon();
    // },[]);
    const nextPage = async () => {
        setLoading(true);
        let res = await axios.get(nextUrl);
        setNextUrl(res.data.next);
        res.data.results.forEach(async (pokemon:Pokemon) => {
            const onePoke = await axios.get(`https://pokeapi.co/api/v2//pokemon/${pokemon.name}`);
            setPokemons((p) => [...p,onePoke.data]);
            setLoading(false);
        });
    }
    const loadPokemons = async () => {
         const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0")
         res.data.results.forEach(async(pokemon:Pokemons, index:number) => {
             const onePoke = await axios.get(`https://pokeapi.co/api/v2//pokemon/${pokemon.name}`)
             setPokemons((p) => [...p, onePoke.data])

             const evolution = await axios.get(`https://pokeapi.co/api/v2/evolution-chain/${index + 1}`)
             setEvolution((p) => [...p, evolution.data])
             setLoading(false);
         })
         setNextUrl(res.data.next);
         setFindPokemon(false);
    }
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh",
                }}
            >
                <Header />
                <Container
                    component="main"
                    disableGutters
                    sx={{ padding:  '2rem' }}
                    maxWidth={false}
                >
                    {findPokemon ? (
                        <Stack sx={{
                            margin:'200px'
                        }} justifyContent='center' direction="row">
                            <PokemonButton onClick={loadPokemons} variant="contained">START</PokemonButton>
                        </Stack>    ) : (
                            <>
                            <PokemonList pokemons = {pokemons} pokemonDetails={pokemonDetails} setPokemonDetails={setPokemonDetails} />
                        <br /> <br />
                        <Stack justifyContent='center' direction="row" spacing={2}>
                        <PokemonButton onClick={nextPage} variant="contained">{loading ? ". . ." : "LOAD MORE RESULTS"}</PokemonButton>
                        </Stack>
                            </>)}

                </Container>
            </Box>
        </>
    );
};


