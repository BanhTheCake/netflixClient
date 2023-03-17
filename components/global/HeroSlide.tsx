import { getMediaList } from '@/utils/api/media.api';
import tmdbConfig from '@/utils/config/tmdbConfig';
import { TMediaMovie, TMediaTV } from '@/utils/types/global.type';
import { Box } from '@mui/material';
import { FC, useMemo } from 'react';
import { useQuery } from 'react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import HeroItem from '../Media/HeroItem';
interface HeroSlideProps {
    mediaType: string;
    mediaCategory: string;
}

const HeroSlide: FC<HeroSlideProps> = ({ mediaType, mediaCategory }) => {
    const { data } = useQuery(
        ['media', mediaType, mediaCategory],
        () =>
            getMediaList({
                mediaType: mediaType,
                mediaCategory: mediaCategory,
                page: '1',
            }),
        {
            enabled: !!mediaType && !!mediaCategory,
            onError: (err) => {
                console.log('err: ', err);
            },
        }
    );

    const medias = useMemo(() => {
        if (!data) return undefined;
        return data.results;
    }, [data]);

    return (
        <Box>
            {medias && (
                <Swiper
                    slidesPerView={1}
                    grabCursor={true}
                    direction="horizontal"
                    style={{
                        width: '100%',
                        height: 'max-content',
                    }}
                >
                    {medias.map((media) => {
                        if (mediaType === tmdbConfig.mediaType.MOVIE) {
                            const mediaMovie = media as TMediaMovie;
                            return (
                                <SwiperSlide key={media.id}>
                                    <HeroItem
                                        backdrop_path={mediaMovie.backdrop_path}
                                        overview={mediaMovie.overview}
                                        rate={mediaMovie.vote_average}
                                        title={mediaMovie.original_title}
                                        genres={mediaMovie.genre_ids}
                                        mediaType={mediaType}
                                        mediaId={mediaMovie.id}
                                    />
                                </SwiperSlide>
                            );
                        }
                        const MediaTV = media as TMediaTV;
                        return (
                            <SwiperSlide key={media.id}>
                                <HeroItem
                                    backdrop_path={MediaTV.backdrop_path}
                                    overview={MediaTV.overview}
                                    rate={MediaTV.vote_average}
                                    title={MediaTV.original_name}
                                    genres={MediaTV.genre_ids}
                                    mediaType={mediaType}
                                    mediaId={MediaTV.id}
                                />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            )}
        </Box>
    );
};

export default HeroSlide;
