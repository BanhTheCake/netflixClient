import { FC, useMemo } from 'react';
import { useQuery } from 'react-query';

import { getMediaList, getMediaRecommends } from '@/utils/api/media.api';
import tmdbConfig from '@/utils/config/tmdbConfig';
import uiConfigs from '@/utils/config/uiConfig';
import { TMediaMovie, TMediaTV } from '@/utils/types/global.type';
import { SwiperSlide } from 'swiper/react';
import AutoSwiper from '../global/AutoSwiper';
import MediaItem from './MediaItem';

import { Box, Container, Typography } from '@mui/material';
import TitleLine from '../global/TitleLine';

interface MediaSlideProps {
    mediaType: string;
    mediaCategory?: string;
    mediaId?: string | number;
    title: string;
}

const MediaSlide: FC<MediaSlideProps> = ({
    mediaType,
    mediaCategory,
    title,
    mediaId,
}) => {
    const { data } = useQuery(
        ['media', mediaType, mediaCategory || mediaId],
        () => {
            if (mediaCategory) {
                return getMediaList({
                    mediaType,
                    mediaCategory,
                    page: '1',
                });
            }
            return getMediaRecommends({
                mediaType,
                mediaId: mediaId as string,
            });
        },
        {
            enabled: !!mediaType && (!!mediaCategory || !!mediaId),
        }
    );

    const medias = useMemo(() => {
        if (!data) return undefined;
        return data.results;
    }, [data]);

    return (
        <Container maxWidth={false} sx={{ maxWidth: '1400px', py: '20px' }}>
            <TitleLine title={title} />
            <AutoSwiper>
                {medias &&
                    medias.map((media) => {
                        if (mediaType === tmdbConfig.mediaType.MOVIE) {
                            const mediaMovie = media as TMediaMovie;
                            return (
                                <SwiperSlide key={mediaMovie.id}>
                                    <MediaItem
                                        poster_path={mediaMovie.poster_path}
                                        rate={mediaMovie.vote_average}
                                        title={mediaMovie.title}
                                        year={
                                            mediaMovie.release_date?.split(
                                                '-'
                                            )[0]
                                        }
                                        mediaType={mediaType}
                                        mediaId={mediaMovie.id}
                                    />
                                </SwiperSlide>
                            );
                        }
                        const mediaTv = media as TMediaTV;
                        return (
                            <SwiperSlide key={mediaTv.id}>
                                <MediaItem
                                    poster_path={mediaTv.poster_path}
                                    rate={mediaTv.vote_average}
                                    title={mediaTv.name}
                                    year={mediaTv.first_air_date?.split('-')[0]}
                                    mediaType={mediaType}
                                    mediaId={mediaTv.id}
                                />
                            </SwiperSlide>
                        );
                    })}
            </AutoSwiper>
        </Container>
    );
};

export default MediaSlide;
