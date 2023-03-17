import React, { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

import Logo from '../global/Logo';
import uiConfigs from '@/utils/config/uiConfig';
import { AuthPage } from '../global/AuthModal';
import { login } from '@/utils/api/auth.api';
import { useAuth } from '@/context/auth.context';

import { Box, TextField, Button, ButtonGroup, Stack } from '@mui/material';

type loginInputs = {
    username: string;
    password: string;
};

const loginSchema = yup.object({
    username: yup.string().required().trim(),
    password: yup.string().required().trim(),
}).required();

interface LoginProps {
    toggleState: (value: AuthPage) => void;
    close: () => void
}

const Login: FC<LoginProps> = ({ toggleState, close }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<loginInputs>({
        defaultValues: {
            username: '',
            password: '',
        },
        resolver: yupResolver(loginSchema)
    });

    const { auth, setAuthState } = useAuth()

    const { mutate: onLogin, isLoading } = useMutation({
        mutationKey: '/login',
        mutationFn: login
    })


    const onSubmit: SubmitHandler<loginInputs> = (data) => {
        onLogin(data, {
            onSuccess: (data) => {
                setAuthState(data)
                close()
            },
            onError: (err) => {
                toast.error(err as string)
            }
        })
    };

    return (
        <Box
            sx={{
                bgcolor: 'background.default',
                borderRadius: '6px',
                color: 'text.primary',
            }}
            p={2}
            px={3}
            width={'450px'}
            maxWidth={'100%'}
        >
            <Box pb={4} mt={1}>
                <Logo />
            </Box>
            <Stack
                component={'form'}
                onSubmit={handleSubmit(onSubmit)}
                display={'flex'}
                flexDirection="column"
                spacing={'20px'}
            >
                <TextField
                    id="username"
                    label="Đăng nhập"
                    variant="outlined"
                    error={!!errors.username?.message}
                    {...register('username')}
                />
                <TextField
                    id="password"
                    label="Mật khẩu"
                    variant="outlined"
                    type={'password'}
                    error={!!errors.password?.message}
                    {...register('password')}
                />
                <Button
                    variant="contained"
                    color="error"
                    size="large"
                    type="submit"
                    sx={{
                        bgcolor: uiConfigs.style.red,
                        '&:hover': { bgcolor: uiConfigs.style.redHover },
                    }}
                >
                    Đăng nhập
                </Button>
                <Stack direction={'row'} spacing={'10px'}>
                    <Button
                        sx={{ width: '50%', color: 'text.primary' }}
                        variant="text"
                        onClick={() => toggleState('register')}
                    >
                        Đăng ký
                    </Button>
                    <Button
                        sx={{ width: '50%', color: 'text.primary' }}
                        variant="text"
                    >
                        Quên mật khẩu
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
};

export default Login;
