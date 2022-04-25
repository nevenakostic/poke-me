import React, {FunctionComponent} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled} from '@mui/material';
// @ts-ignore
import {Abilities, Moves, Types, Stats} from "../interface";

const Details = styled('span')(({ theme }) => ({
    textTransform: 'capitalize',
    color: theme.palette.text.secondary,
}));
interface PokemonDetailProps {
    name: string;
    image: string;
    abilities: Abilities[] | undefined;
    types: Types[] | undefined;
    stats: Stats[] | undefined;
    moves: Moves[] | undefined;
}
export const PokemonDetail:FunctionComponent<PokemonDetailProps> = ({name, image, abilities, moves, stats, types}: PokemonDetailProps) => {
    return (
        <>
            <Box sx={{
                margin: 'auto',
            }}
                component="img"
                alt="Pokemon"
                src={image}
            />
            <Typography className="capitalize-me" id="modal-modal-title" variant="h5" component="h2">
                {name}
            </Typography>
            <hr />
            <Typography id="modal-modal-title" variant="h6">
                Moves:
            </Typography>
            <Details>
                {moves?.map((m:any, i) => {
                if (i === 0 || i === 1) {
                    return (
                        <span key={m.move.name}> {m.move.name}; </span>
                    )}
                return null;
            })}
            </Details>
            <Typography id="modal-modal-title" variant="h6">
                Types:
            </Typography>
            <Details>
                {types?.map((t:any, i) => {
                    if (i === 0 || i === 1) {
                        return (
                            <span key={t.type.name}> {t.type.name}; </span>
                        )}
                    return null;
                })}
            </Details>
            <Typography id="modal-modal-title" variant="h6">
                Abilities:
            </Typography>
            <Details>
                {abilities?.map((a:any, i) => {
                    if (i === 0 || i === 1) {
                        return (
                            <span key={a.ability.name}> {a.ability.name}; </span>
                        )}
                    return null;
                })}
            </Details>
            <Typography id="modal-modal-title" variant="h6">
                Stats:
            </Typography>
            <Details>
                {stats?.map((s:any, i) => {
                    if (i === 0 || i === 1) {
                        return (
                            <span key={s.stat.name}> {s.stat.name} : {s.base_stat};  </span>
                        )}
                    return null;
                })}
            </Details>
        </>
    );
}
