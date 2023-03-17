import React, { FC, useState } from 'react';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import { Box, Modal } from '@mui/material';

interface AuthModalProps {
    open: boolean,
    close: () => void;
}

export type AuthPage = 'login' | 'register' | 'forgot'

const AuthModal: FC<AuthModalProps> = ({ open, close }) => {

    const [stateAuth, setStateAuth] = useState<AuthPage>('login')
    const toggleState = (value: AuthPage) => {
        setStateAuth(value)
    }

    return (
        <Modal open={open} onClose={close} >
            <Box
                bgcolor={'transparent'}
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    outline: 'none'
                }}
                p={2}
                maxWidth={'100%'}
            >
                {stateAuth === 'login' && <Login toggleState={toggleState} close={close} />}
                {stateAuth === 'register' && <Register toggleState={toggleState} />}
            </Box>
        </Modal>
    );
};

export default AuthModal;
