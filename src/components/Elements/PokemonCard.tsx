import React, {FunctionComponent, useState, useEffect} from 'react';
import { PokemonDetail } from "./PokemonDetail";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material';
import Paper from '@mui/material/Paper';
// @ts-ignore
import {PokemonDetails, Abilities, Moves, Types, Stats} from "../interface";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

interface PokemonCardProps {
    pokemonDetails: PokemonDetails;
    setPokemonDetails: React.Dispatch<React.SetStateAction<PokemonDetails>>
    id: number;
    name: string;
    image: string;
    abilities: Abilities[] | undefined;
    types: Types[] | undefined;
    stats: Stats[] | undefined;
    moves: Moves[] | undefined;
}
export const PokemonCard:FunctionComponent<PokemonCardProps> = ({id, name, image, abilities, moves, stats, types, pokemonDetails, setPokemonDetails}: PokemonCardProps) => {
    const [isSelected, setSelected] = useState(false);
    useEffect(() => {
        setSelected(id === pokemonDetails?.id);
    },[id, pokemonDetails])
    const handleClose = () => {
        setPokemonDetails({
            id:0,
            isOpened: false,
        })
    }
    const renderModal = () => {
        if (isSelected) {
            return (
                <Modal
                    open={isSelected}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >

                    <Box sx={{
                        textAlign: 'center',
                        position: 'absolute' as 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        minWidth: '315px',
                        bgcolor: 'background.paper',
                        boxShadow: 15,
                        p: 4,

                    }}>
                        <PokemonDetail image={image} name={name} abilities={abilities} moves={moves} types={types} stats={stats} />
                    </Box>
                </Modal>
            )
        }
        return null;
    }
    return (
        <>
            { renderModal() }
            <Item>
                <Box
                    component="img"
                    alt="Pokemon"
                    src={image}
                />
                <h3 className="capitalize-me"> {name} </h3>
                <p>Poke me!</p>
            </Item>
        </>
    );
}
