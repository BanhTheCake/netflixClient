import React from "react";
import { Box, Typography } from '@mui/material'
import Link from "next/link";

const Logo = () => {
    return <Link href={'/'}>
        <Typography display={'flex'} justifyContent={'center'} fontSize='20px' fontWeight={'500'} sx={{
            '& span': {
                color: '#d63031'
            }
        }}>
            BanhThe <span color='#d63031'>Flix</span>
        </Typography>
    </Link>

};

export default Logo;
