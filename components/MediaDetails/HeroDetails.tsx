import React, { FC, useEffect, useState } from "react";
import { Box, Container, Stack, Typography, Button } from '@mui/material'
import uiConfigs from "@/utils/config/uiConfig";
import Image from "next/image";
import Rate from "../global/Rate";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useMutation, useQuery } from "react-query";
import { getMediaDetails } from "@/utils/api/media.api";
import tmdbConfig from "@/utils/config/tmdbConfig";
import Genres from "../Media/Genres";
import CastSlide from "./CastSlide";
import { createFavorite, deleteFavorite, getFavorites } from "@/utils/api/favorite.api";
import { useAuth } from "@/context/auth.context";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { toast } from "react-toastify";
import { setModalAuthState } from "@/redux/features/modalAuth.slice";

interface HeroDetailsProps {
    mediaType: string,
    mediaId: string,
}

const HeroDetails: FC<HeroDetailsProps> = ({ mediaType, mediaId }) => {
    const mode = useSelector<RootState>((state) => state.theme.mode) as RootState['theme']['mode'];
    const { auth } = useAuth()
    const dispatch = useDispatch()

    const { data: media } = useQuery(['mediaDetails', mediaType, mediaId], () => getMediaDetails({
        mediaType,
        mediaId
    }), {
        enabled: !!mediaType && !!mediaId
    })

    const { data: resFavor, refetch: refetchFavorite } = useQuery('favorite/list', getFavorites, {
        enabled: !!auth.token && !!auth.user,
    })

    const { mutate: onAddFavorite } = useMutation({
        mutationKey: 'favorite/add',
        mutationFn: createFavorite
    })

    const { mutate: onRemoveFavorite } = useMutation({
        mutationKey: 'favorite/remove',
        mutationFn: deleteFavorite
    })

    const [isFavorite, setIsFavorite] = useState(() => {
        if (!resFavor || !media) return false;
        return resFavor.favorites.some(favorite => favorite.mediaId === media.id)
    })

    const onFavoriteClick = () => {
        if (!media) return;
        if (!auth.token || !auth.user) {
            dispatch(setModalAuthState({ isOpen: true }))
            return;
        }
        if (!isFavorite) {
            setIsFavorite(true)
            onAddFavorite({
                mediaId: media.id,
                mediaPoster: media.poster_path,
                mediaRate: media.vote_average,
                mediaTitle: (media.title || media.original_name) as string,
                mediaType: mediaType
            }, {
                onError: (err) => {
                    setIsFavorite(false)
                    toast.error('Please try again !')
                },
                onSuccess: () => {
                    refetchFavorite()
                }
            })
        }
        if (isFavorite) {
            setIsFavorite(false)
            onRemoveFavorite({
                mediaId: media.id
            }, {
                onError: (err) => {
                    setIsFavorite(true)
                    toast.error('please try again !')
                },
                onSuccess: () => {
                    refetchFavorite()
                }
            })
        }

    }

    useEffect(() => {
        if (!resFavor || !media || !auth.user) {
            setIsFavorite(false)
            return
        };
        setIsFavorite(resFavor.favorites.some(favorite => favorite.mediaId === media.id))
    }, [media, resFavor, auth.user])

    if (!media) return <></>

    return <Box>
        <Box>
            <Box
                sx={{
                    backgroundImage: `url(${tmdbConfig.backdrop_path(media.backdrop_path)})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center top',
                    backgroundAttachment: 'fixed',
                    padding: '20%',
                    position: 'relative',
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        ...uiConfigs.style.inset,
                        ...uiConfigs.style.gradientBgImage[mode],
                    }}
                />
            </Box>
        </Box>
        <Container maxWidth={false} sx={{ position: 'relative', maxWidth: '1400px' }}>
            <Stack
                spacing={4}
                sx={{ mt: { xs: '-5%', md: '-30%' } }}
                direction={{ xs: 'column', md: 'row' }}
                justifyContent={'center'}
                alignItems={{ xs: 'center', md: 'start' }}
            >
                <Box
                    sx={{
                        width: { xs: '80%', md: '40%' },
                    }}
                >
                    <Box position={'relative'} sx={{ paddingTop: '120%', width: '100%' }}>
                        <Image
                            src={tmdbConfig.poster_path(media.poster_path)}
                            alt={'poster'}
                            fill
                            sizes="auto"
                            style={{
                                objectFit: 'cover',
                                objectPosition: 'center',
                                borderRadius: '10px'
                            }}
                        />
                    </Box>
                </Box>
                <Stack
                    spacing={3}
                    sx={{ color: 'text.primary', width: { xs: '100%', md: '60%' } }}
                >
                    <Typography
                        variant="h2"
                        fontSize={{ xs: '40px', md: '60px' }}
                        fontWeight={'500'}
                    >
                        {media?.title || media?.original_name}
                    </Typography>
                    <Stack display={'flex'} alignItems="center" spacing={'16px'} direction={'row'}>
                        {media.vote_average ? <Rate value={Math.round(media.vote_average)} /> : ''}
                        <Genres ids={media.genres.reduce((arr, item) => [...arr, item.id], [] as number[])} />
                    </Stack>
                    <Typography fontSize={'16px'}>
                        {media.overview}
                    </Typography>
                    <Stack
                        direction={'row'}
                        justifyContent={'flex-start'}
                        spacing={2}
                    >
                        <Button size="large" color="error" onClick={onFavoriteClick}>
                            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        </Button>
                        <Button
                            size="large"
                            startIcon={<PlayArrowIcon />}
                            sx={{
                                bgcolor: uiConfigs.style.red,
                                color: 'white',
                                '&:hover': {
                                    bgcolor: uiConfigs.style.redHover,
                                },
                            }}
                        >
                            Watch now
                        </Button>
                    </Stack>
                    <CastSlide mediaType={mediaType} mediaId={media.id} />
                </Stack>
            </Stack>
        </Container>
    </Box>;
};

export default HeroDetails;
