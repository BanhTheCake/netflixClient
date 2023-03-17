import { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';
import { TR } from '../types/global.type';

const requestApi = <T>(
    axiosInput: AxiosInstance,
    config: AxiosRequestConfig
) => {
    return new Promise<T>(async (resolve, reject) => {
        try {
            const res = await axiosInput({
                ...config,
            });
            const resData = res.data as TR<T>;
            if (resData.errCode !== 0) return reject(resData.msg);
            resolve(resData.data);
        } catch (error) {
            const errT = error as AxiosError;
            if (!errT.response) return reject('Something wrong with server !');
            reject(errT.response.data);
        }
    });
};

export default requestApi;
