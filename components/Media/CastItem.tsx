import React, { FC } from "react";
import { Box, Typography } from '@mui/material'
import { actor } from "@/utils/types/global.type";
import Link from "next/link";
import ImageCustom from "../global/Image";
import tmdbConfig from "@/utils/config/tmdbConfig";

interface CastItemProps {
    actor: actor
}

const CastItem: FC<CastItemProps> = ({ actor }) => {
    return <Link
        href={{
            pathname: `/person/${actor.id}`,
        }}
    >
        <Box
            position={'relative'}
            sx={{ paddingTop: '120%' }}
        >
            <ImageCustom
                src={tmdbConfig.poster_path(
                    actor.profile_path
                )}
                alt={actor.name || 'actor'}
            />
            <Box
                position={'absolute'}
                sx={{
                    bottom: 0,
                    left: 0,
                    right: 0,
                    bgcolor:
                        'rgba(0, 0, 0, 0.6)',
                    color: 'white',
                    p: 1,
                }}
            >
                <Typography
                    textAlign={'center'}
                    sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}
                >
                    {actor.name}
                </Typography>
            </Box>
        </Box>
    </Link>;
};

export default CastItem;
