import { axiosPrivate } from '../config/axios.config';
import requestApi from '../helpers/requestApi';
import { Favorite } from './../types/global.type';
const favoriteUrl = {
    list: 'http://localhost:3003/api/v1/favorite/list',
    create: 'http://localhost:3003/api/v1/favorite/create',
    delete: (id: number) =>
        `http://localhost:3003/api/v1/favorite/remove/${id}`,
};

interface GetFavoriteRes {
    favorites: Favorite[];
}

export const getFavorites = async () => {
    try {
        const data = await requestApi<GetFavoriteRes>(axiosPrivate, {
            method: 'get',
            url: favoriteUrl.list,
        });
        return data;
    } catch (error) {}
};

interface CreateFavoriteProps
    extends Pick<
        Favorite,
        'mediaType' | 'mediaId' | 'mediaTitle' | 'mediaPoster' | 'mediaRate'
    > {}

export const createFavorite = async (req: CreateFavoriteProps) => {
    try {
        const data = await requestApi(axiosPrivate, {
            method: 'post',
            url: favoriteUrl.create,
            data: req,
        });
        return data;
    } catch (error) {
        throw error;
    }
};

interface DeleteFavoriteProps extends Pick<Favorite, 'mediaId'> {}

export const deleteFavorite = async ({ mediaId }: DeleteFavoriteProps) => {
    try {
        const data = await requestApi(axiosPrivate, {
            method: 'delete',
            url: favoriteUrl.delete(mediaId),
        });
        return data;
    } catch (error) {
        throw error;
    }
};
