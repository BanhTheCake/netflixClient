import React, { FC } from "react";
import { Box, CircularProgress, Typography } from '@mui/material'

interface RateProps {
    value: number,
    color?: string,
}

const Rate: FC<RateProps> = ({ value, color = 'text.primary' }) => {
    return <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant="determinate" value={value * 10} color='success' size={55} />
        <Box
            sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Typography
                variant="caption"
                component="div"
                color={color}
                fontWeight={'500'}
                fontSize={'16px'}
                sx={{ opacity: 0.8 }}
            >{`${Math.round(value)}`}</Typography>
        </Box>
    </Box>;
};

export default Rate;
