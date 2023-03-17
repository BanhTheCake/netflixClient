import React, { FC } from 'react';
import { TMediaMovie, TMediaTV } from '@/utils/types/global.type';
import tmdbConfig from '@/utils/config/tmdbConfig';
import MediaItem from './MediaItem';
import { Grid } from '@mui/material';

interface MediaListProps {
    mediaType: string;
    medias: (TMediaMovie | TMediaTV)[];
}

const MediaList: FC<MediaListProps> = ({ mediaType, medias }) => {
    if (!medias || !medias.length) return <></>;
    return (
        <>
            <Grid container spacing={1} columns={{ xs: 2, sm: 3, lg: 4 }}>
                {medias.map((media) => {
                    if (
                        mediaType === tmdbConfig.mediaType.MOVIE ||
                        media.media_type === tmdbConfig.mediaType.MOVIE
                    ) {
                        const mediaMovie = media as TMediaMovie;
                        return (
                            <Grid key={media.id} item xs={1}>
                                <MediaItem
                                    poster_path={mediaMovie.poster_path}
                                    rate={mediaMovie.vote_average}
                                    title={mediaMovie.title}
                                    year={
                                        mediaMovie.release_date?.split('-')[0]
                                    }
                                    mediaType={(mediaType || media.media_type) as string}
                                    mediaId={mediaMovie.id}
                                />
                            </Grid>
                        );
                    }
                    const mediaTv = media as TMediaTV;
                    return (
                        <Grid key={media.id} item xs={1}>
                            <MediaItem
                                poster_path={mediaTv.poster_path}
                                rate={mediaTv.vote_average}
                                title={mediaTv.original_name}
                                year={mediaTv.first_air_date?.split('-')[0]}
                                mediaType={(mediaType || media.media_type) as string}
                                mediaId={mediaTv.id}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
};

export default MediaList;
