import React, { FC } from "react";
import { Box } from '@mui/material'
import { Swiper } from "swiper/react";
import { Navigation, Pagination } from 'swiper';

interface ManualSwiperProps {
    children: React.ReactNode,
    isPagination?: boolean
}

const ManualSwiper: FC<ManualSwiperProps> = ({ children, isPagination = true }) => {

    return <Box sx={{
        '& .swiper-slide': {
            width: '90%'
        },
        '& .swiper-pagination-bullet-active': {
            backgroundColor: 'white'
        },
        '& .swiper-pagination-bullet': {
            backgroundColor: 'text.primary',
            ...(isPagination ? {} : { display: 'none' })
        },
        '& .swiper-button-prev': {
            color: 'white',
            zIndex: 20,
            transform: {
                xs: 'scale(0.8)',
                md: 'scale(1)'
            }
        },
        '& .swiper-button-next': {
            color: 'white',
            zIndex: 20,
            transform: {
                xs: 'scale(0.8)',
                md: 'scale(1)'
            }

        },
    }}>
        <Box />
        <Swiper
            slidesPerView={"auto"}
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            navigation
            pagination={{ clickable: true }}
            centeredSlides={true}
        >
            {children}
        </Swiper>
    </Box>;
};

export default ManualSwiper;
