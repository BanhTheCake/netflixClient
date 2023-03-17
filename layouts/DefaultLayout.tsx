import { FC } from 'react'
import { Box, Container } from '@mui/material'
import Header from '@/components/global/Header';
import Footer from '@/components/global/Footer'


interface DefaultLayoutProps {
    children: React.ReactNode
}

const DefaultLayout: FC<DefaultLayoutProps> = ({ children }) => {
    return <>
        <Header />
        <Box bgcolor={'background.default'} display='flex' flexDirection='column' sx={{ width: '100%', minHeight: '100vh' }}>
            <Box sx={{ flex: 1, pb: 8, width: '100%', display: 'flex', flexDirection: 'column' }}>
                {children}
            </Box>
            <Footer />
        </Box>
    </>;
};

export default DefaultLayout;
