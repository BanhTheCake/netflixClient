import { Favorite, Review } from '@/utils/types/global.type';
import React, { FC } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import tmdbConfig from '@/utils/config/tmdbConfig';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Link from 'next/link';
import ImageCustom from '../global/Image';

const isReviewItem = (item: Review | Favorite): item is Review => {
    return (item as Review).content !== undefined;
};

interface MediaItemHorizontalProps {
    item: Favorite | Review;
    onRemove: (mediaId: number) => void;
}

const MediaItemHorizontal: FC<MediaItemHorizontalProps> = ({
    item,
    onRemove,
}) => {
    const mode = useSelector<RootState>(
        (state) => state.theme.mode
    ) as RootState['theme']['mode'];

    const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        isReviewItem(item) ? onRemove(item.id) : onRemove(item.mediaId);
    };

    return (
        <Box
            sx={{
                color: 'text.primary',
                '&:hover': {
                    bgcolor:
                        mode === 'dark'
                            ? 'rgb(30, 30, 30)'
                            : 'rgb(240, 240, 240)',
                },
                p: 1.5,
                borderRadius: '10px',
                transition: 'all .2s ease',
                position: 'relative',
            }}
        >
            <Link
                href={{
                    pathname: `/${item.mediaType}/${item.mediaId}`,
                }}
            >
                <Stack direction={'row'} spacing={2}>
                    <Box display={{ xs: 'none', md: 'block' }}>
                        <Box
                            position="relative"
                            width={'200px'}
                            sx={{ aspectRatio: '4/5', flexShrink: 0 }}
                        >
                            <ImageCustom
                                src={tmdbConfig.poster_path(item.mediaPoster)}
                                alt={item.mediaTitle || 'poster'}
                            />
                        </Box>
                    </Box>
                    <Box
                        sx={{ flex: 1 }}
                        display="flex"
                        flexDirection={'column'}
                    >
                        <Typography
                            variant="h3"
                            fontSize={'20px'}
                            fontWeight={'500'}
                            pb={1.5}
                        >
                            {`${item.mediaTitle}`}
                        </Typography>
                        <Box
                            display={'flex'}
                            flexDirection="column"
                            sx={{ fontSize: '16px', flex: 1 }}
                        >
                            {isReviewItem(item) ? (
                                <>
                                    <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                        {item.content}
                                    </Typography>
                                </>
                            ) : (
                                <>
                                    <Typography>
                                        Rate: {item.mediaRate}
                                    </Typography>
                                    <Typography textTransform={'capitalize'}>
                                        Type: {item.mediaType}
                                    </Typography>
                                </>
                            )}
                            <Typography
                                sx={{
                                    mt: 'auto',
                                    color: 'text.secondary',
                                    pt: 1,
                                }}
                                textTransform="capitalize"
                            >
                                {`${moment(item.createdAt).format(
                                    'DD/MM/YYYY'
                                )} - ${moment(item.createdAt).fromNow()}`}
                            </Typography>
                        </Box>
                    </Box>
                </Stack>
            </Link>
            <Button
                variant="contained"
                sx={{ position: 'absolute', top: 10, right: 10 }}
                color="error"
                size="small"
                onClick={onClick}
            >
                remove
            </Button>
        </Box>
    );
};

export default MediaItemHorizontal;
