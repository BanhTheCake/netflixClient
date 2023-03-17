import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import {
    Container,
    Box,
    Typography,
    Stack,
    TextareaAutosize,
    Button,
} from '@mui/material';
import TitleLine from '../global/TitleLine';
import uiConfigs from '@/utils/config/uiConfig';
import SendIcon from '@mui/icons-material/Send';
import {
    useInfiniteQuery,
    useMutation,
    useQueryClient,
} from 'react-query';
import { createNewReview, deleteCurrentReview, getReviewsMedia, updateCurrentReview } from '@/utils/api/review.api';
import { MediaDetailsRes } from '@/utils/api/media.api';
import { toast } from 'react-toastify';
import { Review } from '@/utils/types/global.type';
import { useAuth } from '@/context/auth.context';
import Ava from '../global/Ava';
import ButtonWithLoading from '../global/ButtonWithLoading';
import Comment from './Comment';
import SuperJSON from 'superjson';

interface MediaReviewsProps {
    mediaType: string;
    mediaId: string;
}

const MediaReviews: FC<MediaReviewsProps> = ({ mediaType, mediaId }) => {
    const { auth } = useAuth()
    const queryClient = useQueryClient();

    const { data, isFetchingNextPage, hasNextPage, fetchNextPage, refetch } =
        useInfiniteQuery(
            ['reviewsPagination', mediaType, mediaId],
            ({ pageParam = 1 }) =>
                getReviewsMedia({
                    mediaType,
                    mediaId,
                    page: pageParam,
                }),
            {
                getNextPageParam: (lastPage) => {
                    return lastPage.page < lastPage.totalPage
                        ? lastPage.page + 1
                        : undefined;
                },
            }
        );

    const { mutate: onCreate, isLoading: isCreating } = useMutation({
        mutationKey: 'review/create',
        mutationFn: createNewReview,
    });

    const { mutate: onDelete } = useMutation({
        mutationKey: 'review/delete',
        mutationFn: deleteCurrentReview
    })

    const { mutate: onUpdate } = useMutation({
        mutationKey: 'review/update',
        mutationFn: updateCurrentReview
    })

    const [reviews, setReviews] = useState<Review[]>(() => {
        if (!data) {
            return [];
        }
        const allReviews = data.pages.reduce((arrReviews, page) => {
            return [...arrReviews, ...page.reviews];
        }, [] as Review[]);
        return allReviews;
    });

    const [content, setContent] = useState('');
    const onChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const onPost = () => {
        const mediaDetails = queryClient.getQueryData<MediaDetailsRes>([
            'mediaDetails',
            mediaType,
            mediaId,
        ]);
        if (!mediaDetails) return;
        const dataReq = {
            content: content,
            mediaId: mediaDetails.id,
            mediaPoster: mediaDetails.poster_path,
            mediaTitle: (mediaDetails.title || mediaDetails.original_name) as string,
            mediaType: mediaType,
        }
        onCreate(dataReq,
            {
                onError: (err) => {
                    toast.error('Please try again !');
                },
                onSuccess: () => {
                    refetch()
                    setContent('')
                }
            }
        );
    };

    const onDeleteReview = (id: number) => {
        onDelete({ id }, {
            onSuccess: () => {
                refetch()
            },
            onError: () => {
                toast.error('Please try again !')
            }
        })
    }

    const onUpdateReview = (id: number, content: string) => {
        setReviews(prev => {
            const targetComment = prev.find(comment => comment.id === id)
            if (targetComment) {
                targetComment.content = content;
            };
            return prev
        })
        onUpdate({ id, body: { content } }, {
            onError: () => {
                toast.error('Please try again !')
                refetch()
            },
        })
    }

    useEffect(() => {
        if (!data) {
            setReviews([]);
            return;
        }
        const allReviews = data.pages.reduce((arrReviews, page) => {
            return [...arrReviews, ...page.reviews];
        }, [] as Review[]);
        setReviews(allReviews);
    }, [data]);

    return (
        <Container maxWidth={false} sx={{ maxWidth: '1400px', py: '20px' }}>
            <TitleLine title={`Reviews (${reviews.length})`} />
            {reviews.length > 0 && (
                <Stack direction={'column'} spacing={2} pb={2}>
                    {reviews.map((review) => {
                        return (
                            <Comment key={review.id} review={review} onDelete={onDeleteReview} onUpdate={onUpdateReview} />
                        );
                    })}
                    {hasNextPage && (
                        <ButtonWithLoading isLoading={isFetchingNextPage} onClick={fetchNextPage} />
                    )}
                </Stack>
            )}
            <Box>
                {auth.user && auth.token &&
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                            color: 'text.secondary',
                            p: 1.5,
                            pt: 3,
                            transition: 'all .2s ease',
                            borderTop: '1px solid',
                        }}
                    >
                        <Ava name={auth.user.displayName} />
                        <Stack
                            spacing={1.5}
                            alignItems={'start'}
                            sx={{
                                flex: 1,
                                '& textarea': {
                                    width: '100%',
                                    outline: 'none',
                                    p: 1.5,
                                    fontFamily: 'inherit',
                                    fontSize: 'inherit',
                                    resize: 'none',
                                    backgroundColor: 'transparent',
                                    color: 'inherit',
                                    borderRadius: '4px',
                                    lineHeight: '24px',
                                },
                            }}
                        >
                            <Typography
                                variant="h5"
                                fontSize={'18px'}
                                fontWeight={'500'}
                            >
                                {auth.user.displayName}
                            </Typography>
                            <TextareaAutosize
                                minRows={2}
                                maxRows={10}
                                spellCheck={false}
                                placeholder={'Write something here ...'}
                                value={content}
                                onChange={onChangeContent}
                            ></TextareaAutosize>
                            <Button
                                disabled={isCreating}
                                startIcon={<SendIcon />}
                                size="large"
                                onClick={onPost}
                                sx={{
                                    bgcolor: uiConfigs.style.red,
                                    color: 'white',
                                    '&:hover': { bgcolor: uiConfigs.style.redHover },
                                    px: 2.5,
                                }}
                            >
                                Post
                            </Button>
                        </Stack>
                    </Stack>
                }
            </Box>
        </Container>
    );
};

export default MediaReviews;
