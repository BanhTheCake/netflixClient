import { useAuth } from '@/context/auth.context';
import DefaultLayout from '@/layouts/DefaultLayout';
import { deleteFavorite, getFavorites } from '@/utils/api/favorite.api';
import React, { useMemo } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Box, Container, Grid, Stack } from '@mui/material';
import TitleLine from '@/components/global/TitleLine';
import MediaItem from '@/components/Media/MediaItem';
import MediaItemHorizontal from '@/components/Media/MediaItemHori';
import { deleteCurrentReview, getReviewsList, updateCurrentReview } from '@/utils/api/review.api';
import { GetServerSideProps } from 'next';

const ReviewsPage = () => {
    const { auth } = useAuth();

    const { data: reviews, refetch } = useQuery('reviews/listUser', getReviewsList, {
        enabled: !!auth.token && !!auth.user
    })

    const { mutate: onDelete } = useMutation({
        mutationKey: 'review/delete',
        mutationFn: deleteCurrentReview
    })

    const { mutate: onUpdate } = useMutation({
        mutationKey: 'review/update',
        mutationFn: updateCurrentReview
    })

    const onRemove = (id: number) => {
        onDelete({
            id
        }, {
            onSuccess: () => {
                refetch()
            }
        })
    }

    return (
        <DefaultLayout>
            <Container maxWidth={false} sx={{ maxWidth: '1400px', pt: 10 }}>
                <TitleLine title={`Your Reviews (${reviews?.length || 0})`} />
                <Stack direction="column" spacing={1}>
                    {reviews &&
                        reviews.length > 0 &&
                        reviews.map((review) => {
                            return (
                                <Box key={review.id}>
                                    <MediaItemHorizontal item={review} onRemove={onRemove} />
                                </Box>
                            );
                        })}
                </Stack>
            </Container>
        </DefaultLayout>
    );
};

export default ReviewsPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {},
    };
};
