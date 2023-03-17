import React, { FC } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import uiConfigs from "@/utils/config/uiConfig";
import { RootState } from "@/redux/store";
import tmdbConfig from "@/utils/config/tmdbConfig";
import Rate from "../global/Rate";
import Genres from "./Genres";

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Box, Typography, Button, Stack } from '@mui/material'


interface HeroItemProps {
    backdrop_path: string,
    title: string,
    rate: number,
    overview: string,
    genres: number[],
    mediaType: string,
    mediaId: string | number
}

const HeroItem: FC<HeroItemProps> = ({ backdrop_path, title, rate, overview, genres, mediaType, mediaId }) => {
    const mode = useSelector<RootState>(state => state.theme.mode) as RootState['theme']['mode']
    const router = useRouter()

    const redirect = () => {
        router.push({ pathname: `/${mediaType}/${mediaId}` })
    }

    return <Box
        position={'relative'}
        display="flex"
        sx={{
            paddingTop: {
                xs: '130%',
                sm: '80%',
                md: '60%',
                lg: '50%',
            },
        }}
    >
        <Box position="absolute" sx={{ ...uiConfigs.style.inset }}>
            <Image
                src={tmdbConfig.backdrop_path(backdrop_path)}
                alt="backdrop"
                fill
                sizes="auto"
                style={{
                    objectFit: 'cover',
                    objectPosition: 'center center',
                }}
            />
        </Box>
        <Box
            position="absolute"
            top={0}
            bottom={0}
            left={0}
            sx={{
                ...uiConfigs.style.horizontalGradientBgImage[mode],
                width: '30%',
            }}
        />
        <Box
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            sx={{
                ...uiConfigs.style.gradientBgImage[mode],
                height: '80%',
            }}
        />
        <Box
            maxWidth={['90%', '80%']}
            m="auto"
            position={'absolute'}
            sx={{ ...uiConfigs.style.inset }}
            color="text.primary"
            display="flex"
        >
            <Box my="auto">
                <Stack
                    width={['100%', '60%']}
                    display="flex"
                    flexDirection={'column'}
                    spacing={3}
                >
                    <Typography
                        variant="h3"
                        fontSize={{
                            xs: '2rem',
                            md: '2rem',
                            lg: '3.8rem',
                        }}
                        fontWeight={'500'}
                    >
                        {title}
                    </Typography>
                    <Stack
                        display={'flex'}
                        alignItems="center"
                        spacing={2}
                        direction={'row'}
                    >
                        <Rate value={rate} />
                        <Genres ids={genres} />
                    </Stack>
                    <Typography
                        fontSize={'16px'}
                        sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: 4,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                        }}
                    >
                        {overview}
                    </Typography>
                    <Button
                        sx={{
                            width: 'fit-content',
                            bgcolor: uiConfigs.style.red,
                            '&:hover': {
                                bgcolor:
                                    uiConfigs.style.redHover,
                            },
                            color: 'white',
                        }}
                        size="large"
                        startIcon={<PlayArrowIcon />}
                        onClick={redirect}
                    >
                        Watch Now
                    </Button>
                </Stack>
            </Box>
        </Box>
    </Box>;
};

export default HeroItem;
