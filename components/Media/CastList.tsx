import { actor, Person } from "@/utils/types/global.type";
import React, { FC } from "react";
import { Grid } from '@mui/material'
import CastItem from "./CastItem";

interface CastListProps {
    actors: actor[]
}

const CastList: FC<CastListProps> = ({ actors }) => {
    return <>
        <Grid container spacing={1} columns={{ xs: 2, sm: 3, lg: 4 }}>
            {actors && actors.length && actors.map(actor => {
                return <Grid key={actor.id} item xs={1}>
                    <CastItem actor={actor} />
                </Grid>
            })}
        </Grid>
    </>;
};

export default CastList;
