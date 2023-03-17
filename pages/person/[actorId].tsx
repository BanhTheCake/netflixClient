import DefaultLayout from '@/layouts/DefaultLayout';
import React, { useMemo } from 'react';
import { Box, Container, Stack, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import {
    getCombineCreditsPerson,
    getDetailsPerson,
} from '@/utils/api/person.api';
import tmdbConfig from '@/utils/config/tmdbConfig';
import TitleLine from '@/components/global/TitleLine';
import MediaList from '@/components/Media/MediaList';
import { GetServerSideProps } from 'next';
import ImageCustom from '@/components/global/Image';

const ActorDetailsPage = () => {
    const router = useRouter();
    const { actorId } = router.query;

    const { data: person } = useQuery(
        ['person/details', actorId],
        () => getDetailsPerson({ id: actorId as string }),
        {
            enabled: !!actorId,
        }
    );

    const { data: creditsRes } = useQuery(
        ['person/combinedCredits', actorId],
        () => getCombineCreditsPerson({ id: actorId as string }),
        {
            enabled: !!actorId,
        }
    );

    const medias = useMemo(() => {
        return creditsRes?.cast;
    }, [creditsRes]);

    return (
        <DefaultLayout>
            <Container maxWidth={false} sx={{ maxWidth: '1400px', pt: 10 }}>
                {person && (
                    <Stack
                        direction={{
                            xs: 'column',
                            md: 'row',
                        }}
                        spacing={2}
                        alignItems={{ xs: 'center', md: 'start' }}
                    >
                        <Box
                            sx={{
                                position: 'relative',
                                width: {
                                    xs: '90%',
                                    sm: '250px',
                                },
                                flexShrink: 0,
                            }}
                        >
                            <Box sx={{
                                paddingTop: {
                                    xs: '125%',
                                    sm: '150%',
                                },
                            }}>

                            </Box>
                            <ImageCustom src={tmdbConfig.poster_path(person.profile_path)}
                                alt={person.name || 'person'} />
                        </Box>
                        <Box sx={{ flex: 1, color: 'text.primary' }}>
                            <Typography
                                variant="h2"
                                fontSize={'28px'}
                                fontWeight={'500'}
                                py={1}
                            >
                                {`${person.name}  (${person.birthday?.split('-')?.[0] || '_'
                                    })`}
                            </Typography>
                            <Typography sx={{
                                display: '-webkit-box',
                                WebkitLineClamp: 12,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                            }}>
                                {person.biography}
                            </Typography>
                        </Box>
                    </Stack>
                )}
                <Box>
                    <TitleLine title="MEDIAS" />
                    {medias && (
                        <MediaList mediaType="" medias={medias.splice(0, 12)} />
                    )}
                </Box>
            </Container>
        </DefaultLayout>
    );
};

export default ActorDetailsPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const queryClient = new QueryClient();
    const { actorId } = context.query;
    if (actorId) {
        const promisePersonDetails = queryClient.prefetchQuery(
            ['person/details', actorId],
            () => getDetailsPerson({ id: actorId as string })
        );
        await Promise.all([promisePersonDetails])
    }
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};
