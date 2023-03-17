import { useAuth } from "@/context/auth.context";
import React, { useEffect, useRef } from "react";
import { persistUser } from "@/utils/api/auth.api";

interface PersistLoginProps {
    children: React.ReactNode
}

const PersistLogin = ({ children }: PersistLoginProps) => {

    const { setAuthState } = useAuth()
    const isFirstMount = useRef(true);

    useEffect(() => {
        const fetchDataUser = async () => {
            try {
                const data = await persistUser()
                setAuthState({ ...data })
            } catch (error) { }
        }
        typeof window !== 'undefined' && isFirstMount.current && fetchDataUser();
        return () => {
            isFirstMount.current = false
        }
    }, [])

    return <>
        {children}
    </>
        ;
};

export default PersistLogin;
