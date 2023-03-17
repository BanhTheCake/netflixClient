import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import KeyOffOutlinedIcon from '@mui/icons-material/KeyOffOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SlideshowOutlinedIcon from '@mui/icons-material/SlideshowOutlined';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import TroubleshootOutlinedIcon from '@mui/icons-material/TroubleshootOutlined';
import tmdbConfig from '@/utils/config/tmdbConfig';

const menu = {
    link: [
        { href: '/', name: 'home', icon: HomeOutlinedIcon },
        {
            href: `/${tmdbConfig.mediaType.MOVIE}`,
            name: 'movies',
            icon: SlideshowOutlinedIcon,
            query: { category: tmdbConfig.mediaCategory.POPULAR },
        },
        {
            href: `/${tmdbConfig.mediaType.TV}`,
            name: 'tv series',
            icon: LiveTvOutlinedIcon,
            query: { category: tmdbConfig.mediaCategory.POPULAR },
        },
        {
            href: `/search`,
            name: 'search',
            icon: TroubleshootOutlinedIcon,
            query: { type: tmdbConfig.mediaType.MOVIE },
        },
    ],
    user: [
        {
            href: '/user/favorites',
            name: 'Favorites',
            icon: FavoriteBorderIcon,
        },
        {
            href: '/user/reviews',
            name: 'Reviews',
            icon: RateReviewOutlinedIcon,
        },
        { href: '/', name: 'Password update', icon: KeyOffOutlinedIcon },
    ],
};

export default menu;
