import axios from 'axios';
import { axiosPrivate } from '../config/axios.config';
import requestApi from '../helpers/requestApi';
import { Review } from '../types/global.type';

// media/:mediaType/:mediaId

const reviewUrl = {
    listOfMedia: (mediaType: string, mediaId: string) =>
        `http://localhost:3003/api/v1/review/media/${mediaType}/${mediaId}`,
    listUser: 'http://localhost:3003/api/v1/review/list',
    newReview: 'http://localhost:3003/api/v1/review/create',
    delete: (id: number | string) =>
        `http://localhost:3003/api/v1/review/remove/${id}`,
    update: (id: number | string) =>
        `http://localhost:3003/api/v1/review/update/${id}`,
};

interface ReviewsMediaProps {
    mediaType: string;
    mediaId: string;
    page?: number;
}

interface ReviewsMediaRes {
    reviews: Review[];
    page: number;
    limit: number;
    totalPage: number;
    totalResult: number;
}

export const getReviewsMedia = async ({
    mediaId,
    mediaType,
    page = 1,
}: ReviewsMediaProps) => {
    try {
        const data = await requestApi<ReviewsMediaRes>(axios, {
            method: 'get',
            url: reviewUrl.listOfMedia(mediaType, mediaId),
            params: {
                page,
            },
        });
        return data;
    } catch (error) {
        throw error;
    }
};

export const getReviewsList = async () => {
    try {
        const data = await requestApi<Review[]>(axiosPrivate, {
            method: 'get',
            url: reviewUrl.listUser,
        });
        return data;
    } catch (error) {
        throw error;
    }
};

interface NewReviewProps
    extends Pick<
        Review,
        'mediaType' | 'mediaId' | 'mediaTitle' | 'mediaPoster' | 'content'
    > {}

export const createNewReview = async (req: NewReviewProps) => {
    try {
        const data = await requestApi(axiosPrivate, {
            method: 'post',
            url: reviewUrl.newReview,
            data: req,
        });
        return data;
    } catch (error) {
        throw error;
    }
};

interface DeleteReviewProps extends Pick<Review, 'id'> {}

export const deleteCurrentReview = async ({ id }: DeleteReviewProps) => {
    try {
        const data = await requestApi(axiosPrivate, {
            method: 'delete',
            url: reviewUrl.delete(id),
        });
        return data;
    } catch (error) {
        throw error;
    }
};

interface UpdateReviewProps {
    id: string | number;
    body: Pick<Review, 'content'>;
}

interface UpdateReviewRes extends Review {}

export const updateCurrentReview = async ({ id, body }: UpdateReviewProps) => {
    try {
        const data = await requestApi<UpdateReviewRes>(axiosPrivate, {
            method: 'patch',
            url: reviewUrl.update(id),
            data: body,
        });
        return data;
    } catch (error) {
        throw error;
    }
};
