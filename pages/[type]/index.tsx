import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient, useInfiniteQuery } from 'react-query';
import { GetServerSideProps } from 'next';

import uiConfigs from '@/utils/config/uiConfig';
import tmdbConfig from '@/utils/config/tmdbConfig';
import { getGenres, getMediaList } from '@/utils/api/media.api';
import MediaList from '@/components/Media/MediaList';
import HeroSlide from '@/components/global/HeroSlide';
import DefaultLayout from '@/layouts/DefaultLayout';

import { Container, Typography, Stack, Button, Box } from '@mui/material';
import { TMediaMovie, TMediaTV } from '@/utils/types/global.type';
import ButtonWithLoading from '@/components/global/ButtonWithLoading';

const btns = [
    {
        name: 'Popular',
        query: { category: tmdbConfig.mediaCategory.POPULAR },
        path: tmdbConfig.mediaCategory.POPULAR,
    },
    {
        name: 'Top rated',
        query: { category: tmdbConfig.mediaCategory.TOP_RATED },
        path: tmdbConfig.mediaCategory.TOP_RATED,
    },
];

const handleCheckAllowQuery = (type: string, category: string) => {
    if (!type || !category) return;
    const isAllowType = Object.keys(tmdbConfig.mediaType).some(
        (item) =>
            tmdbConfig.mediaType[item as keyof typeof tmdbConfig.mediaType] ===
            type
    );
    const isAllowCategory = Object.keys(tmdbConfig.mediaCategory).some(
        (item) =>
            tmdbConfig.mediaCategory[
            item as keyof typeof tmdbConfig.mediaCategory
            ] === category
    );
    return isAllowType && isAllowCategory;
};

interface MediaTypePageProps { }

const MediaTypePage: FC<MediaTypePageProps> = () => {
    const router = useRouter();
    const { type, category } = router.query;

    const isAccept = handleCheckAllowQuery(type as string, category as string);

    const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
        useInfiniteQuery(
            ['mediaInfinity', type, category],
            ({ pageParam = 1 }) =>
                getMediaList({
                    mediaType: type as string,
                    mediaCategory: category as string,
                    page: pageParam,
                }),
            {
                getNextPageParam: (lastPage) => {
                    return lastPage.page < lastPage.total_pages
                        ? lastPage.page + 1
                        : undefined;
                },
                enabled: !!type && !!category,
            }
        );

    const [medias, setMedias] = useState<(TMediaMovie | TMediaTV)[]>(() => {
        if (!data) return [];
        const newMedias = data.pages.reduce((prevItems, item) => {
            return [...prevItems, ...item.results];
        }, [] as (TMediaMovie | TMediaTV)[]);
        return newMedias
    });

    useEffect(() => {
        if (!data) return;
        const newMedias = data.pages.reduce((prevItems, item) => {
            return [...prevItems, ...item.results];
        }, [] as (TMediaMovie | TMediaTV)[]);
        setMedias([...newMedias]);
    }, [data]);

    if (!isAccept) {
        router.push('/');
        return null;
    }

    return (
        <DefaultLayout>
            <HeroSlide
                mediaType={type as string}
                mediaCategory={tmdbConfig.mediaCategory.POPULAR}
            />
            <Container maxWidth={false} sx={{ maxWidth: '1400px' }}>
                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    sx={{ width: '100%', py: 3 }}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    spacing={2}
                    color={'text.primary'}
                >
                    <Typography
                        variant="h3"
                        fontSize={'24px'}
                        fontWeight={'500'}
                        textTransform={'uppercase'}
                    >
                        {type === 'movie' && 'movies'}
                        {type === 'tv' && 'TV series'}
                    </Typography>
                    <Stack direction={'row'} spacing={3}>
                        {btns.map((btn) => {
                            const isActives = btn.path === category;
                            return (
                                <Button
                                    key={btn.name}
                                    size={'large'}
                                    sx={{
                                        color: 'text.primary',
                                        ...(isActives
                                            ? {
                                                backgroundColor:
                                                    uiConfigs.style.red,
                                                color: 'white',
                                                '&:hover': {
                                                    backgroundColor:
                                                        uiConfigs.style
                                                            .redHover,
                                                },
                                            }
                                            : {}),
                                    }}
                                >
                                    <Link
                                        href={{
                                            pathname:
                                                router.asPath.split('?')[0],
                                            query: { ...btn.query },
                                        }}
                                    >
                                        {btn.name}
                                    </Link>
                                </Button>
                            );
                        })}
                    </Stack>
                </Stack>
                <MediaList
                    mediaType={type as string}
                    medias={medias}
                />
                {hasNextPage && (
                    <Box pt={4}>
                        <ButtonWithLoading isLoading={isFetchingNextPage} onClick={fetchNextPage} />
                    </Box>
                )}
            </Container>
        </DefaultLayout>
    );
};

export default MediaTypePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { type, category } = context.query;
    const isAccept = handleCheckAllowQuery(type as string, category as string);
    if (!isAccept) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
            props: {},
        };
    }
    const queryClient = new QueryClient();
    await Promise.all([
        queryClient.prefetchQuery(['media', type, category], () =>
            getMediaList({
                mediaType: type as string,
                mediaCategory: category as string,
                page: '1',
            })
        ),
        queryClient.prefetchQuery(['genres'], getGenres),
    ]);

    const res = context.res
    res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59')

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};
