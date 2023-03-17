import axios, { AxiosError } from 'axios';
import requestApi from '../helpers/requestApi';
import { TR, User } from '../types/global.type';

const authUrl = {
    login: 'http://localhost:3003/api/v1/auth/login',
    register: 'http://localhost:3003/api/v1/auth/register',
    logout: (id: string) => `http://localhost:3003/api/v1/auth/logout/${id}`,
    refresh: `http://localhost:3003/api/v1/auth/refreshToken`,
    persist: 'http://localhost:3003/api/v1/auth/persist',
};

interface LoginProps {
    username: string;
    password: string;
}

interface LoginRes {
    token: string;
    user: User;
}

export const login = async ({ username, password }: LoginProps) => {
    try {
        return await requestApi<LoginRes>(axios, {
            method: 'Post',
            url: authUrl.login,
            data: {
                username,
                password,
            },
            withCredentials: true,
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

interface RegisterProps {
    username: string;
    password: string;
    displayName: string;
}

export const register = async (data: RegisterProps) => {
    try {
        return await requestApi(axios, {
            method: 'Post',
            url: authUrl.register,
            data: data,
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

interface LogoutProps {
    id: string;
}

export const logout = async ({ id }: LogoutProps) => {
    try {
        return await requestApi(axios, {
            method: 'get',
            url: authUrl.logout(id),
            withCredentials: true,
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
};
interface RefreshRes {
    token: string;
}

export const refresh = async () => {
    try {
        return await requestApi<RefreshRes>(axios, {
            method: 'get',
            url: authUrl.refresh,
            withCredentials: true,
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
};
interface PersistUserRes {
    token: string;
    user: User;
}

export const persistUser = async () => {
    try {
        return await requestApi<PersistUserRes>(axios, {
            method: 'get',
            url: authUrl.persist,
            withCredentials: true,
        });
    } catch (error) {
        throw error;
    }
};
