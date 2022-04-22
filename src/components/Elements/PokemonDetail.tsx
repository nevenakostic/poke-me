import React, {FunctionComponent} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled} from '@mui/material';

const Details = styled('span')(({ theme }) => ({
    textTransform: 'capitalize',
    color: theme.palette.text.secondary,
}));
interface PokemonDetailProps {
    name: string;
    image: string;
    abilities: {
        name: string;
        ability: string;
    }[] | undefined;
    types: {
        name: string;
        type: string;
    }[] | undefined;
    stats: {
        base_stat: number;
        name: string;
        stat: string;
    }[] | undefined;
    moves: {
        name: string;
        move: string;
    }[] | undefined;
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
                    {/* eslint-disable-next-line array-callback-return */}
                    {moves?.map((m:any, i) => {
                    if (i === 0 || i === 1) {
                        return (
                            <span> {m.move.name}; </span>
                        )}
                })}
                </Details>
                <Typography id="modal-modal-title" variant="h6">
                    Types:
                </Typography>
                <Details>
                    {/* eslint-disable-next-line array-callback-return */}
                    {types?.map((t:any, i) => {
                        if (i === 0 || i === 1) {
                            return (
                                <span> {t.type.name}; </span>
                            )}
                    })}
                </Details>
                <Typography id="modal-modal-title" variant="h6">
                    Abilities:
                </Typography>
                <Details>
                    {/* eslint-disable-next-line array-callback-return */}
                    {abilities?.map((a:any, i) => {
                        if (i === 0 || i === 1) {
                            return (
                                <span> {a.ability.name}; </span>
                            )}
                    })}
                </Details>
                <Typography id="modal-modal-title" variant="h6">
                    Stats:
                </Typography>
                <Details>
                    {/* eslint-disable-next-line array-callback-return */}
                    {stats?.map((s:any, i) => {
                        if (i === 0 || i === 1) {
                            return (
                                <span> {s.stat.name} : {s.base_stat};  </span>
                            )}
                    })}
                </Details>
        </>
    );
}
