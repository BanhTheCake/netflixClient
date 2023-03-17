import React, { FC, useMemo } from "react";
import { Box, Container, Typography } from '@mui/material'
import { useQuery } from "react-query";
import { getMediaImages } from "@/utils/api/media.api";
import ManualSwiper from "../global/ManualSwiper";
import { SwiperSlide } from "swiper/react";
import tmdbConfig from "@/utils/config/tmdbConfig";
import AutoSwiper from "../global/AutoSwiper";
import TitleLine from "../global/TitleLine";
import ImageCustom from "../global/Image";

interface MediaImagesProps {
    mediaType: string,
    mediaId: string | number
}

const MediaImages: FC<MediaImagesProps> = ({ mediaType, mediaId }) => {
    const { data } = useQuery(['mediaImages', mediaType, mediaId], () => getMediaImages({
        mediaType,
        mediaId
    }), {
        enabled: !!mediaType && !!mediaId
    })

    const backdrops = useMemo(() => {
        if (!data) return undefined;
        return data.backdrops
    }, [data])

    const posters = useMemo(() => {
        if (!data) return undefined;
        return data.posters;
    }, [data])

    return <>
        <Container maxWidth={false} sx={{ maxWidth: '1400px', my: 6 }}>
            <TitleLine title="Backdrops" />
            <ManualSwiper>
                {backdrops && backdrops.length > 0 && backdrops.slice(0, 10).map(backdrop => {
                    return <SwiperSlide key={backdrop.file_path}>
                        <Box sx={{ position: 'relative', mb: 5, paddingTop: '56.25%' }}>
                            <ImageCustom src={tmdbConfig.backdrop_path(backdrop.file_path)} alt={'backdrop'} />
                        </Box>
                    </SwiperSlide>
                })}
            </ManualSwiper>
        </Container>
        <Container maxWidth={false} sx={{ maxWidth: '1400px', my: 6 }}>
            <TitleLine title="Posters" />
            <AutoSwiper>
                {posters && posters.length > 0 && posters.map(poster => {
                    return <SwiperSlide key={poster.file_path}>
                        <Box sx={{ position: 'relative', paddingTop: { xs: '140%', md: '120%' } }}>
                            <ImageCustom src={tmdbConfig.poster_path(poster.file_path)} alt='poster' />
                        </Box>
                    </SwiperSlide>
                })}
            </AutoSwiper>
        </Container>
    </>;
};

export default MediaImages;
