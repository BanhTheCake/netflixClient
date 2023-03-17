import React, { FC } from "react";
import { Box, Typography } from '@mui/material'
import uiConfigs from "@/utils/config/uiConfig";

interface TitleLineProps {
    title: string,
    lineWidth?: string
}

const TitleLine: FC<TitleLineProps> = ({ title, lineWidth = '60%' }) => {
    return <Box my={3} sx={{ width: 'fit-content' }}>
        <Typography
            fontSize={'26px'}
            sx={{ color: 'text.primary' }}
            fontWeight="500"
            textTransform={'uppercase'}
        >
            {title}
        </Typography>
        <Box
            width={lineWidth}
            height="6px"
            sx={{ bgcolor: uiConfigs.style.red }}
        />
    </Box>;
};

export default TitleLine;
