import { initAuthState, useAuth } from "@/context/auth.context";
import { axiosPrivate } from "@/utils/config/axios.config";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import React, { FC, useEffect, useMemo } from "react";
import { refresh } from '../utils/api/auth.api'

interface AxiosConfigProps {
    children: React.ReactNode
}

const AxiosConfig: FC<AxiosConfigProps> = ({ children }) => {

    const { auth, setAuthState } = useAuth()
    const router = useRouter()

    axiosPrivate.interceptors.request.use((config) => {
        if (auth.token && !config.headers['Authorization']) {
            config.headers['Authorization'] = `Bearer ${auth.token}`
        }
        return config
    })

    axiosPrivate.interceptors.response.use((res) => {
        return res
    }, async (err) => {
        const errT = err as AxiosError
        const prevRequest = err.config;
        if (errT.response?.status === 401 && errT.response.statusText === 'Unauthorized' && !prevRequest.sent) {
            try {
                const token = (await refresh()).token
                if (!token) return Promise.reject(err)
                setAuthState({ token: token })
                prevRequest.sent = true;
                prevRequest.headers = { ...prevRequest.headers };
                prevRequest.headers['Authorization'] = `Bearer ${token}`
                return axiosPrivate(prevRequest)
            } catch (error) {
                setAuthState(initAuthState)
                router.push('/')
                return Promise.reject(err)
            }
        }
        return Promise.reject(err)
    })

    return <>
        {children}
    </>;
};

export default AxiosConfig;
