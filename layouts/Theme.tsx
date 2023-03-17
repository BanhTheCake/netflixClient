import React, { FC } from "react";
import { useSelector } from 'react-redux'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { RootState } from "@/redux/store";

interface ThemeProps {
    children: React.ReactNode
}

const Theme: FC<ThemeProps> = ({ children }) => {

    const mode = useSelector<RootState>(state => state.theme.mode) as RootState['theme']['mode']
    const theme = createTheme({
        palette: { mode }
    })

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
