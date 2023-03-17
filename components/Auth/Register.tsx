import { FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import * as yup from "yup";

import uiConfigs from '@/utils/config/uiConfig';
import Logo from '../global/Logo';
import { AuthPage } from '../global/AuthModal';
import { register as registerFn } from '@/utils/api/auth.api';

import { Box, Button, ButtonGroup, Stack, TextField } from '@mui/material';


type RegisterInputs = {
    username: string,
    displayName: string,
    password: string,
    cfPassword: string
}

const registerSchema = yup.object({
    username: yup.string().required().trim(),
    displayName: yup.string().required().trim(),
    password: yup.string().required().trim(),
    cfPassword: yup.string()
        .oneOf([yup.ref('password'), undefined], 'Passwords must match').required().trim()
}).required();

interface RegisterProps {
    toggleState: (value: AuthPage) => void
}

const Register: FC<RegisterProps> = ({ toggleState }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterInputs>({
        defaultValues: {
            username: '',
            password: '',
        },
        resolver: yupResolver(registerSchema)
    });

    const { mutate: onRegister, isLoading } = useMutation({
        mutationKey: '/register',
        mutationFn: registerFn
    })

    const onSubmit: SubmitHandler<RegisterInputs> = (data) => {
        const { cfPassword, ...req } = data
        onRegister(req, {
            onSuccess: (data) => {
                toggleState('login')
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
            <Stack component={'form'} onSubmit={handleSubmit(onSubmit)} display={'flex'} flexDirection="column" spacing={'20px'}>
                <TextField
                    id="username"
                    label="Tên đăng ký"
                    variant="outlined"
                    error={!!errors.username?.message}
                    {...register('username')}
                />
                <TextField
                    id="password"
                    label="Tên hiển thị"
                    variant="outlined"
                    error={!!errors.displayName?.message}
                    {...register('displayName')}
                />
                <TextField
                    id="password"
                    label="Mật khẩu"
                    variant="outlined"
                    error={!!errors.password?.message}
                    type='password'
                    {...register('password')}
                />
                <TextField
                    id="password"
                    label="Xác nhận mật khẩu"
                    variant="outlined"
                    type='password'
                    error={!!errors.cfPassword?.message}
                    {...register('cfPassword')}
                />
                <Button
                    variant="contained"
                    color="error"
                    size="large"
                    type='submit'
                    sx={{
                        bgcolor: uiConfigs.style.red,
                        '&:hover': { bgcolor: uiConfigs.style.redHover },
                    }}
                >
                    Đăng ký
                </Button>
                <Stack direction={'row'} spacing={'10px'}>
                    <Button
                        sx={{ width: '50%', color: 'text.primary' }}
                        variant="text"
                        onClick={() => toggleState('login')}
                    >
                        Đăng nhập
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

export default Register;
