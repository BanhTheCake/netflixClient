import { RootState } from '@/redux/store';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { initAuthState, useAuth } from '@/context/auth.context';
import { setThemeState } from '@/redux/features/theme.slice';
import { logout } from '@/utils/api/auth.api';
import menu from '@/utils/config/menuConfig';
import uiConfigs from '@/utils/config/uiConfig';
import AuthModal from './AuthModal';
import Logo from './Logo';
import Sidebar from './Sidebar';

import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import {
    AppBar,
    Box,
    Button,
    IconButton, Menu,
    MenuItem, Stack,
    Toolbar
} from '@mui/material';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { setModalAuthState } from '@/redux/features/modalAuth.slice';

interface HideScrollProps {
    window?: () => Window;
    children: React.ReactElement;
}

const HideScroll: FC<HideScrollProps> = ({ window, children }) => {
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    return (
        <Box
            sx={{
                transition: 'all .2s ease',
                ...(!trigger
                    ? { bgcolor: 'unset' }
                    : { bgcolor: 'background.default' }),
            }}
        >
            {children}
        </Box>
    );
};

const Header = () => {
    const mode = useSelector<RootState>(
        (state) => state.theme.mode
    ) as RootState['theme']['mode'];

    const openModal = useSelector<RootState>(state => state.modalAuth.isOpen) as RootState['modalAuth']['isOpen']

    const router = useRouter();
    const dispatch = useDispatch();
    const { auth, setAuthState } = useAuth();

    const [openMenu, setOpenMenu] = useState(false);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const openMenuUser = Boolean(anchorElUser);

    const handleOpenMenuUser = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseMenuUser = () => {
        setAnchorElUser(null);
    };

    const toggleMode = () => {
        dispatch(setThemeState({ mode: mode === 'dark' ? 'light' : 'dark' }));
    };

    const toggleMenu = () => {
        setOpenMenu(!openMenu);
    };

    const toggleModal = () => {
        dispatch(setModalAuthState({ isOpen: !openModal }))
    };

    const handleLogout = async () => {
        try {
            await logout({ id: auth.user?.userId as string })
            setAuthState(initAuthState)
            router.push('/')
        } catch (error) {
            setAuthState(initAuthState)
            router.push('/')
        }
    }
    return (
        <>
            <Sidebar anchor="left" open={openMenu} close={toggleMenu} />
            <AuthModal open={openModal} close={toggleModal} />
            <HideScroll>
                <AppBar
                    position="fixed"
                    component="nav"
                    sx={{
                        bgcolor: 'inherit',
                        color: 'text.primary',
                        boxShadow: 'inherit',
                    }}
                >
                    <Toolbar>
                        <Stack
                            flexDirection={'row'}
                            justifyContent="space-between"
                            width={'100%'}
                            alignItems={'center'}
                        >
                            <Stack
                                direction='row'
                                display={'flex'}
                                spacing="16px"
                                alignItems={'center'}
                            >
                                <IconButton
                                    color="inherit"
                                    size="small"
                                    sx={{ display: ['flex', 'none'] }}
                                    onClick={toggleMenu}
                                >
                                    <MenuOutlinedIcon />
                                </IconButton>
                                <Logo />
                                <Stack
                                    direction='row'
                                    display={['none', 'flex']}
                                    alignItems={'center'}
                                    spacing="16px"
                                >
                                    {menu.link.map((item) => {
                                        const isActives =
                                            router.asPath.split('?')[0] ===
                                            item.href;
                                        return (
                                            <Link
                                                href={{
                                                    pathname: item.href,
                                                    query: {
                                                        ...(item?.query || {}),
                                                    },
                                                }}
                                                key={item.name}
                                            >
                                                <Button
                                                    color="inherit"
                                                    size="small"
                                                    sx={
                                                        isActives
                                                            ? {
                                                                backgroundColor: uiConfigs.style.red,
                                                                '&:hover': {
                                                                    backgroundColor: uiConfigs.style.redHover,
                                                                },
                                                                color: 'white',
                                                            } : {}
                                                    }
                                                >
                                                    {item.name}
                                                </Button>
                                            </Link>
                                        );
                                    })}
                                    <IconButton
                                        color="inherit"
                                        size="small"
                                        onClick={toggleMode}
                                    >
                                        {mode === 'dark' && (
                                            <DarkModeOutlinedIcon />
                                        )}
                                        {mode === 'light' && (
                                            <LightModeOutlinedIcon />
                                        )}
                                    </IconButton>
                                </Stack>
                            </Stack>
                            <Box>
                                {!auth.token && (
                                    <Button
                                        color="inherit"
                                        size="small"
                                        sx={{
                                            backgroundColor: '#d63031',
                                            '&:hover': {
                                                backgroundColor: '#c0392b',
                                            },
                                            color: 'white',
                                        }}
                                        onClick={toggleModal}
                                    >
                                        Sign in
                                    </Button>
                                )}
                                {auth.token && (
                                    <>
                                        <Button
                                            color="inherit"
                                            size="medium"
                                            sx={{ textTransform: 'capitalize' }}
                                            onClick={handleOpenMenuUser}
                                        >
                                            {auth.user?.displayName || 'Noname'}
                                        </Button>
                                        <Menu
                                            anchorEl={anchorElUser}
                                            open={openMenuUser}
                                            onClose={handleCloseMenuUser}
                                        >
                                            {menu.user.map((item) => {
                                                const Icon = item.icon;
                                                return (
                                                    <Link key={item.name} href={item.href}>
                                                        <MenuItem
                                                            onClick={
                                                                handleCloseMenuUser
                                                            }
                                                        >
                                                            <Button
                                                                startIcon={<Icon />}
                                                                variant="text"
                                                                sx={{
                                                                    width: '100%',
                                                                    '&:hover': { backgroundColor: 'unset' },
                                                                    justifyContent: 'flex-start',
                                                                    gap: '10px',
                                                                    color: 'text.primary',
                                                                }}
                                                            >
                                                                {item.name}
                                                            </Button>
                                                        </MenuItem>
                                                    </Link>
                                                );
                                            })}
                                            <MenuItem
                                                onClick={handleCloseMenuUser}
                                            >
                                                <Button
                                                    startIcon={<LogoutOutlinedIcon />}
                                                    variant="text"
                                                    onClick={handleLogout}
                                                    sx={{
                                                        width: '100%',
                                                        '&:hover': { backgroundColor: 'unset' },
                                                        justifyContent: 'flex-start',
                                                        gap: '10px',
                                                        color: 'text.primary',
                                                    }}
                                                >
                                                    Sign out
                                                </Button>
                                            </MenuItem>
                                        </Menu>
                                    </>
                                )}
                            </Box>
                        </Stack>
                    </Toolbar>
                </AppBar>
            </HideScroll>
        </>
    );
};

export default Header;
