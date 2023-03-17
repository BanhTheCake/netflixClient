import { getMediaVideos } from '@/utils/api/media.api';
import React, { FC, useMemo } from 'react';
import { useQuery } from 'react-query';
import { Container, Box, Typography } from '@mui/material';
import ManualSwiper from '../global/ManualSwiper';
import { SwiperSlide } from 'swiper/react';
import uiConfigs from '@/utils/config/uiConfig';
import tmdbConfig from '@/utils/config/tmdbConfig';
import TitleLine from '../global/TitleLine';
import ReactPlayer from 'react-player'

interface MediaVideosProps {
    mediaType: string;
    mediaId: string;
}

const MediaVideos: FC<MediaVideosProps> = ({ mediaType, mediaId }) => {
    const { data } = useQuery(
        ['mediaVideos', mediaType, mediaId],
        () =>
            getMediaVideos({
                mediaType,
                mediaId,
            }),
        {
            enabled: !!mediaType && !!mediaId,
        }
    );

    const videoIds = useMemo(() => {
        if (!data) return undefined;
        return data.results;
    }, [data]);

    if (!videoIds || !videoIds.length) return <></>;

    return (
        <Container maxWidth={false} sx={{ maxWidth: '1400px', my: 8 }}>
            <TitleLine title="Videos" />
            <ManualSwiper isPagination={false}>
                {videoIds.length > 0 &&
                    videoIds.slice(0, 3).map((videoId) => {
                        return (
                            <SwiperSlide key={videoId.id}>
                                <Box
                                    sx={{
                                        width: '100%',
                                        paddingTop: '56.25%',
                                        pb: 4,
                                        position: 'relative',
                                    }}
                                >
                                    <ReactPlayer url={tmdbConfig.youtube_path(
                                        videoId.key
                                    )} style={{ position: 'absolute', ...uiConfigs.style.inset }} width='100%' height={'100%'} controls />
                                </Box>
                            </SwiperSlide>
                        );
                    })}
            </ManualSwiper>
        </Container>
    );
};

export default MediaVideos;
