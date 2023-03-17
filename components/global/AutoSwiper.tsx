import React, { FC } from "react";
import { Box } from '@mui/material'
import { Swiper } from 'swiper/react';

interface AuthSwiperProps {
    children: React.ReactNode
}

const AutoSwiper: FC<AuthSwiperProps> = ({ children }) => {
    return <Box sx={{
        '& .swiper-slide': {
            width: {
                xs: "50%",
                md: "25%",
                lg: "20%"
            }
        },
        width: '100%'
    }}>
        <Swiper slidesPerView={'auto'} style={{ width: '100%', height: 'max-content' }}>
            {children}
        </Swiper>
    </Box>;
};

export default AutoSwiper;
