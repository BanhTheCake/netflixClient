import {
    actor,
    Genres,
    MediaDetails,
    MediaImage,
    MediaVideo,
    Person,
    TMediaMovie,
    TMediaTV,
} from './../types/global.type';
import axios from 'axios';
import requestApi from '../helpers/requestApi';

const mediaUrl = {
    list: (mediaType: string, mediaCategory: string) =>
        `http://localhost:3003/api/v1/media/list/${mediaType}/${mediaCategory}`,
    genres: 'http://localhost:3003/api/v1/media/genres/movie',
    details: (mediaType: string, mediaId: string | number) =>
        `http://localhost:3003/api/v1/media/details/${mediaType}/${mediaId}`,
    credits: (mediaType: string, mediaId: string | number) =>
        `http://localhost:3003/api/v1/media/credits/${mediaType}/${mediaId}`,
    videos: (mediaType: string, mediaId: string | number) =>
        `http://localhost:3003/api/v1/media/videos/${mediaType}/${mediaId}`,
    images: (mediaType: string, mediaId: string | number) =>
        `http://localhost:3003/api/v1/media/images/${mediaType}/${mediaId}`,
    recommends: (mediaType: string, mediaId: string | number) =>
        `http://localhost:3003/api/v1/media/recommends/${mediaType}/${mediaId}`,
    search: (mediaType: string) =>
        `http://localhost:3003/api/v1/media/search/${mediaType}`,
};

interface MediaListProps {
    mediaType: string;
    mediaCategory: string;
    page: string;
}

interface MediaListRes {
    page: number;
    results: TMediaMovie[] | TMediaTV[];
    total_pages: number;
    total_results: number;
}

export const getMediaList = async ({
    mediaType,
    mediaCategory,
    page,
}: MediaListProps) => {
    try {
        const data = await requestApi<MediaListRes>(axios, {
            method: 'get',
            url: mediaUrl.list(mediaType, mediaCategory),
            params: { page },
        });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

interface GetGenresRes {
    genres: Genres[];
}

export const getGenres = async () => {
    try {
        const data = await requestApi<GetGenresRes>(axios, {
            method: 'get',
            url: mediaUrl.genres,
        });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

interface MediaDetailsProps {
    mediaType: string;
    mediaId: string | number;
}

export interface MediaDetailsRes extends MediaDetails {}

export const getMediaDetails = async ({
    mediaType,
    mediaId,
}: MediaDetailsProps) => {
    try {
        return await requestApi<MediaDetailsRes>(axios, {
            method: 'get',
            url: mediaUrl.details(mediaType, mediaId),
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

interface MediaCreditsProps {
    mediaType: string;
    mediaId: string | number;
}

interface MediaCreditsRes {
    id: number;
    cast: actor[];
}

export const getMediaCredits = async ({
    mediaType,
    mediaId,
}: MediaCreditsProps) => {
    try {
        return await requestApi<MediaCreditsRes>(axios, {
            method: 'get',
            url: mediaUrl.credits(mediaType, mediaId),
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

interface MediaVideosProps {
    mediaType: string;
    mediaId: number | string;
}

interface MediaVideosRes {
    id: number;
    results: MediaVideo[];
}

export const getMediaVideos = async ({
    mediaType,
    mediaId,
}: MediaVideosProps) => {
    try {
        return await requestApi<MediaVideosRes>(axios, {
            method: 'get',
            url: mediaUrl.videos(mediaType, mediaId),
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

interface MediaImagesProps {
    mediaType: string;
    mediaId: string | number;
}

interface MediaImagesRes {
    backdrops: MediaImage[];
    posters: MediaImage[];
}

export const getMediaImages = async ({
    mediaType,
    mediaId,
}: MediaImagesProps) => {
    try {
        return await requestApi<MediaImagesRes>(axios, {
            method: 'get',
            url: mediaUrl.images(mediaType, mediaId),
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

interface MediaRecommendsProps {
    mediaType: string;
    mediaId: string | number;
}

interface MediaRecommendsRes {
    page: number;
    results: TMediaMovie[] | TMediaTV[];
    total_pages: number;
    total_results: number;
}

export const getMediaRecommends = async ({
    mediaType,
    mediaId,
}: MediaRecommendsProps) => {
    try {
        return await requestApi<MediaRecommendsRes>(axios, {
            method: 'get',
            url: mediaUrl.recommends(mediaType, mediaId),
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

interface GetMediaWithSearchProps {
    mediaType: string;
    query: string;
    page: number;
}

interface GetMediaWithSearchRes {
    page: number;
    results: TMediaMovie[] | TMediaTV[] | actor[];
    total_pages: number;
    total_results: number;
}

export const getMediaWithSearch = async ({
    mediaType,
    query,
    page,
}: GetMediaWithSearchProps) => {
    try {
        const data = await requestApi<GetMediaWithSearchRes>(axios, {
            method: 'get',
            url: mediaUrl.search(mediaType),
            params: {
                query,
                page,
            },
        });
        return data;
    } catch (error) {
        throw error;
    }
};
