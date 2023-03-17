import React, { FC } from "react";
import { AppBar, Toolbar, Box, Stack, Button } from '@mui/material'
import Logo from "./Logo";
import Link from "next/link";
import menu from "@/utils/config/menuConfig";

interface FooterProps {

}

const Footer: FC<FooterProps> = ({ }) => {
    return <AppBar position="relative" sx={{ bgcolor: 'background.default', color: 'text.primary' }}>
        <Toolbar>
            <Stack width={'100%'} direction={{
                md: 'column',
                lg: 'row'
            }} alignItems='center' spacing={1} justifyContent={'space-between'} sx={{
                py: { xs: 2, lg: 0 }
            }}>
                <Box>
                    <Logo />
                </Box>
                <Stack direction='row' display={'flex'} spacing={'8px'} flexWrap='wrap' justifyContent={'center'}>
                    {menu.link.map(item => {
                        return <Link key={item.href} href={{
                            pathname: item.href,
                            query: { ...(item.query || {}) }
                        }}>
                            <Button color='error'>
                                {item.name}
                            </Button>
                        </Link>
                    })}
                </Stack>
            </Stack>
        </Toolbar>
    </AppBar>;
};

export default Footer;
