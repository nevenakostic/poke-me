import React, { FunctionComponent } from "react";
import { styled } from "@mui/material";
// @ts-ignore
import pokeball from '../assets/pokeball.png';
import {Typography} from '@mui/material';


const PokeLink = styled('a')({
    padding: '15px',
});

const PokeLinkTittle = styled(Typography)({
    color: '#F4F8FA',
    display: 'inline',
    padding: '10px',
    fontSize: '1.5rem',
    fontFamily: 'Lato',
    fontWeight: "bold"
});
export const Header: FunctionComponent = () => {
    return (
        <>
            <nav  className="navbar navbar-light navBarPokemon">
                <PokeLink className="navbar-brand" href="/">
                    <img
                        src={pokeball}
                        width="40"
                        height="40"
                        className="d-inline-block align-top"
                        alt=""
                    />
                    <PokeLinkTittle>P o k e  M e</PokeLinkTittle>
                </PokeLink>
            </nav>
        </>
    );
};
