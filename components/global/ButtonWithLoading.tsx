import { LoadingButton } from "@mui/lab";
import { Button, Box } from '@mui/material'
import React, { FC } from "react";

interface BtnProps {
    isLoading: boolean,
    onClick: (...arg: any) => any,
    color?: "inherit" | "error" | "primary" | "secondary" | "success" | "info" | "warning" | undefined
}

const ButtonWithLoading: FC<BtnProps> = ({ isLoading, onClick, color = 'error' }) => {
    return <Box height={'40px'}>
        {isLoading ? (
            <LoadingButton
                loading
                fullWidth
                color={color}
                size="large"
                sx={{ mb: 4, height: '40px' }}
            ></LoadingButton>
        ) : (
            <Button
                fullWidth
                color={color}
                sx={{ mb: 4, height: '40px' }}
                onClick={onClick}
            >
                Load more
            </Button>
        )}
    </Box>;
};

export default ButtonWithLoading;
