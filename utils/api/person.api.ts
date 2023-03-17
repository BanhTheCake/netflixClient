import { TMediaMovie, TMediaTV } from '@/utils/types/global.type';
import axios from 'axios';
import requestApi from '../helpers/requestApi';
import { Person } from '../types/global.type';

const personUrl = {
    details: (id: string) =>
        `http://localhost:3003/api/v1/media/person/details/${id}`,
    combineCredits: (id: string) =>
        `http://localhost:3003/api/v1/media/person/combinedCredits/${id}`,
};

interface GetDetailsPersonProps {
    id: string;
}

export const getDetailsPerson = async ({ id }: GetDetailsPersonProps) => {
    try {
        const data = requestApi<Person>(axios, {
            method: 'get',
            url: personUrl.details(id),
        });
        return data;
    } catch (error) {
        throw error;
    }
};

interface GetCombineCreditsPersonProps {
    id: string;
}

interface GetCombineCreditsPersonRes {
    cast: (TMediaMovie | TMediaTV)[];
    crew: (TMediaMovie | TMediaTV)[];
}

export const getCombineCreditsPerson = async ({
    id,
}: GetCombineCreditsPersonProps) => {
    try {
        const data = requestApi<GetCombineCreditsPersonRes>(axios, {
            method: 'get',
            url: personUrl.combineCredits(id),
        });
        return data;
    } catch (error) {
        throw error;
    }
};
