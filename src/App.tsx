import React, {FunctionComponent, useState} from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Header } from "./components/Header";
import { PokemonList } from "./components/Elements/PokemonList";
import './App.css';
import axios from "axios";
import {Pokemon} from "./interface";
import {PokemonDetails} from "./interface";

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
    const baseURL = "http://pokeapi.co/api/v2/";
    const [findPokemon, setFindPokemon] = useState<boolean>(true);
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [nextUrl, setNextUrl] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails>({
        id: 0,
        isOpened: false,
    })
    const nextPage = async () => {
        setLoading(true);
        let res = await axios.get(nextUrl);
        setNextUrl(res.data.next);
        res.data.results.forEach(async (pokemon:Pokemon) => {
            const onePoke = await axios.get(`${baseURL}pokemon/${pokemon.name}`);
            setPokemons((p) => [...p,onePoke.data]);
            setLoading(false);
        });
    }
    const loadPokemons = async () => {
         const res = await axios.get(`${baseURL}pokemon?limit=20&offset=0`)
         res.data.results.forEach(async(pokemon:Pokemons) => {
             const onePoke = await axios.get(`${baseURL}pokemon/${pokemon.name}`)
             setPokemons((p) => [...p, onePoke.data])
         })
         setNextUrl(res.data.next);
         setFindPokemon(false);
    }
    const renderPokemon = () => {
        return (
            <>
                <PokemonList pokemons = {pokemons} pokemonDetails={pokemonDetails} setPokemonDetails={setPokemonDetails} />
                <br /> <br />
                <Stack justifyContent='center' direction="row" spacing={2}>
                    <PokemonButton onClick={nextPage} variant="contained">{loading ? ". . ." : "LOAD MORE RESULTS"}</PokemonButton>
                </Stack>
            </>
        )
    }
    const renderStartButton = () => {
        return (
            <Stack sx={{ margin:'200px'}} justifyContent='center' direction="row">
                <PokemonButton onClick={loadPokemons} variant="contained">START</PokemonButton>
            </Stack>
        )
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
                    {findPokemon ? renderStartButton() :  renderPokemon() }
                </Container>
            </Box>
        </>
    );
};


