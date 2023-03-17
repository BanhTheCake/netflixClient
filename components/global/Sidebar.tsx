import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setThemeState } from '@/redux/features/theme.slice';
import { RootState } from '@/redux/store';
import menu from '@/utils/config/menuConfig';
import uiConfigs from '@/utils/config/uiConfig';
import Logo from './Logo';

import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { Box, Button, Drawer, Stack, Typography } from '@mui/material';

interface SideBarProps {
    anchor: 'left' | 'top' | 'right' | 'bottom';
    open: boolean;
    close: () => void;
}

const Sidebar: FC<SideBarProps> = ({ anchor, open, close }) => {
    const router = useRouter();
    const mode = useSelector<RootState>(
        (state) => state.theme.mode
    ) as RootState['theme']['mode'];
    const dispatch = useDispatch();

    const toggleMode = () => {
        dispatch(setThemeState({ mode: mode === 'dark' ? 'light' : 'dark' }));
    };
    return (
        <Drawer
            anchor={anchor}
            open={open}
            sx={{ maxWidth: '90%' }}
            onClose={close}
        >
            <Box
                px={4}
                py={2}
                width={'250px'}
                maxWidth={'100%'}
                display="flex"
                flexDirection={'column'}
            >
                <Logo />
                <Box
                    my={2}
                    display="flex"
                    flexDirection={'column'}
                    sx={{ width: '100%' }}
                    mx="auto"
                >
                    <Typography variant="h6">Menu</Typography>
                    <Stack
                        display="flex"
                        flexDirection={'column'}
                        spacing="10px"
                        mt={1}
                        sx={{ width: '100%' }}
                    >
                        {menu.link.map((item) => {
                            const isActives =
                                router.asPath.split('?')[0] === item.href;
                            const Icon = item.icon;
                            return (
                                <Link
                                    href={{
                                        pathname: item.href,
                                        query: { ...(item?.query || {}) }
                                    }}
                                    key={item.name}
                                    onClick={close}
                                >
                                    <Button
                                        color="inherit"
                                        size="medium"
                                        fullWidth
                                        startIcon={<Icon />}
                                        sx={{
                                            display: 'flex',
                                            px: '16px',
                                            justifyContent: 'flex-start',
                                            '& .MuiButton-startIcon': {
                                                pr: '26px',
                                            },
                                            ...(isActives
                                                ? {
                                                    backgroundColor: uiConfigs.style.red,
                                                    '&:hover': {
                                                        backgroundColor: uiConfigs.style.redHover,
                                                    },
                                                    color: 'white',
                                                } : {}),
                                        }}
                                    >
                                        {item.name}
                                    </Button>
                                </Link>
                            );
                        })}
                    </Stack>
                </Box>
                <Box>
                    <Typography variant="h6">Theme</Typography>
                    <Button
                        color="inherit"
                        size="medium"
                        fullWidth
                        onClick={toggleMode}
                        startIcon={
                            mode === 'dark' ? (
                                <DarkModeOutlinedIcon />
                            ) : (
                                <LightModeOutlinedIcon />
                            )
                        }
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            px: '16px',
                            mt: 1,
                            '& .MuiButton-startIcon': {
                                pr: '26px',
                            },
                        }}
                    >
                        {mode === 'dark' ? 'Dark mode' : 'Light mode'}
                    </Button>
                </Box>
            </Box>
        </Drawer>
    );
};

export default Sidebar;
