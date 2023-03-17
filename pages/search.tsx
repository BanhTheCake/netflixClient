import DefaultLayout from '@/layouts/DefaultLayout';
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Container, Box, Button, Stack, TextField, Grid } from '@mui/material';
import uiConfigs from '@/utils/config/uiConfig';
import { useRouter } from 'next/router';
import tmdbConfig from '@/utils/config/tmdbConfig';
import Link from 'next/link';
import { dehydrate, QueryClient, useInfiniteQuery } from 'react-query';
import { getMediaWithSearch } from '@/utils/api/media.api';
import ButtonWithLoading from '@/components/global/ButtonWithLoading';
import { actor, TMediaMovie, TMediaTV } from '@/utils/types/global.type';
import { GetServerSideProps } from 'next';
import TitleLine from '@/components/global/TitleLine';
import MediaList from '@/components/Media/MediaList';
import CastList from '@/components/Media/CastList';

const isActors = (medias: (TMediaMovie | TMediaTV | actor)[], type: string): medias is actor[] => {
    return type === tmdbConfig.mediaType.PERSON
}

const searchBtns = [
    {
        name: 'movies',
        type: tmdbConfig.mediaType.MOVIE,
        query: { type: tmdbConfig.mediaType.MOVIE },
    },
    {
        name: 'Tv series',
        type: tmdbConfig.mediaType.TV,
        query: { type: tmdbConfig.mediaType.TV },
    },
    {
        name: 'People',
        type: 'person',
        query: { type: tmdbConfig.mediaType.PERSON },
    },
];

const SearchPage = () => {
    const router = useRouter();
    const { type, query } = router.query;

    const {
        data: mediaRes,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
    } = useInfiniteQuery(
        ['searchWithKW', type, query],
        ({ pageParam = 1 }) =>
            getMediaWithSearch({
                mediaType: type as string,
                query: query as string,
                page: pageParam,
            }),
        {
            enabled: !!query,
            getNextPageParam: (lastPage) => {
                return lastPage.page < lastPage.total_pages
                    ? lastPage.page + 1
                    : undefined;
            },
            keepPreviousData: true,
        }
    );

    const [search, setSearch] = useState(query || '');
    const [medias, setMedias] = useState<(TMediaMovie | TMediaTV | actor)[]>(() => {
        if (!mediaRes) return [];
        const data = mediaRes.pages.reduce((arrMedias, media) => {
            return [...arrMedias, ...media.results];
        }, [] as (TMediaMovie | TMediaTV | actor)[]);
        return data;
    });

    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const onPressKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.code === 'Enter') {
            if (!search) {
                const { query, ...queryRouter } = router.query;
                router.push({ query: queryRouter });
                return;
            }
            router.push({
                query: { ...router.query, query: search },
            });
        }
    };

    useEffect(() => {
        if (!mediaRes || !query) {
            setMedias([]);
            return;
        }
        const data = mediaRes.pages.reduce((arrMedias, media) => {
            return [...arrMedias, ...media.results];
        }, [] as (TMediaMovie | TMediaTV | actor)[]);
        setMedias(data);
    }, [mediaRes, query]);

    useEffect(() => {
        setSearch(query || '')
    }, [query])

    return (
        <DefaultLayout>
            <Container
                maxWidth={false}
                sx={{
                    maxWidth: '1400px',
                    pt: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    flex: 1,
                    gap: 2,
                }}
            >
                <Stack
                    direction="row"
                    spacing={1.5}
                    sx={{
                        color: 'text.primary',
                        width: '100%',
                        justifyContent: 'center',
                    }}
                >
                    {searchBtns.map((btn) => {
                        const isActives = type === btn.type;
                        return (
                            <Link
                                key={btn.name}
                                href={{
                                    query: {
                                        ...router.query,
                                        ...btn.query,
                                    },
                                }}
                            >
                                <Button
                                    color="inherit"
                                    size="medium"
                                    sx={
                                        isActives
                                            ? {
                                                backgroundColor:
                                                    uiConfigs.style.red,
                                                '&:hover': {
                                                    backgroundColor:
                                                        uiConfigs.style
                                                            .redHover,
                                                },
                                                color: 'white',
                                            }
                                            : {}
                                    }
                                >
                                    {btn.name}
                                </Button>
                            </Link>
                        );
                    })}
                </Stack>
                <TextField
                    color="info"
                    value={search}
                    onChange={onChangeSearch}
                    onKeyDown={onPressKey}
                    placeholder={'Search something here ... '}
                    sx={{ width: '650px', maxWidth: '100%', mx: 'auto' }}
                />
                <Box>
                    {medias.length > 0 && type && (
                        <TitleLine title={searchBtns.find((btn) => btn.type === type)?.name || ''} />
                    )}
                    {isActors(medias, type as string) ? <CastList actors={medias} /> : <MediaList mediaType={type as string} medias={medias as (TMediaMovie | TMediaTV)[]} />}
                    {hasNextPage && (
                        <Box pt={4}>
                            <ButtonWithLoading
                                isLoading={isFetchingNextPage}
                                onClick={fetchNextPage}
                            />
                        </Box>
                    )}
                </Box>
            </Container>
        </DefaultLayout>
    );
};

export default SearchPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const queryClient = new QueryClient();
    const { type, query } = context.query;
    if (type && query) {
        await queryClient.prefetchInfiniteQuery(
            ['searchWithKW', type, query],
            ({ pageParam = 1 }) =>
                getMediaWithSearch({
                    mediaType: type as string,
                    query: query as string,
                    page: pageParam,
                })
        );
    }

    const res = context.res
    res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59')

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};
