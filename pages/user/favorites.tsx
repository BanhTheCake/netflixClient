import { useAuth } from '@/context/auth.context';
import DefaultLayout from '@/layouts/DefaultLayout';
import { deleteFavorite, getFavorites } from '@/utils/api/favorite.api';
import React, { useMemo } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Box, Container, Grid, Stack } from '@mui/material';
import TitleLine from '@/components/global/TitleLine';
import MediaItemHorizontal from '@/components/Media/MediaItemHori';
import { GetServerSideProps } from 'next';

const FavoritesPage = () => {
    const { auth } = useAuth();

    const { data: resFavor, refetch: refetchFavorite } = useQuery(
        'favorite/list',
        getFavorites,
        {
            enabled: !!auth.token && !!auth.user,
        }
    );

    const { mutate: onRemoveFavorite } = useMutation({
        mutationKey: 'favorite/remove',
        mutationFn: deleteFavorite
    })

    const favorites = useMemo(() => {
        if (!resFavor) return resFavor;
        return resFavor.favorites;
    }, [resFavor]);

    const onRemove = (mediaId: number) => {
        onRemoveFavorite({
            mediaId
        }, {
            onSuccess: () => {
                refetchFavorite()
            }
        })
    }

    return (
        <DefaultLayout>
            <Container maxWidth={false} sx={{ maxWidth: '1400px', pt: 10 }}>
                <TitleLine title="Your favories" />
                <Stack direction="column" spacing={1}>
                    {favorites &&
                        favorites.length > 0 &&
                        favorites.map((favorite) => {
                            return (
                                <Box key={favorite.id}>
                                    <MediaItemHorizontal item={favorite} onRemove={onRemove} />
                                </Box>
                            );
                        })}
                </Stack>
            </Container>
        </DefaultLayout>
    );
};

export default FavoritesPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {},
    };
};
