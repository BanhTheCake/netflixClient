import { FC } from 'react';
import { useRouter } from 'next/router';
import DefaultLayout from '@/layouts/DefaultLayout';
import HeroDetails from '@/components/MediaDetails/HeroDetails';
import { GetServerSideProps } from 'next';
import {
    getGenres,
    getMediaDetails,
    getMediaImages,
    getMediaRecommends,
} from '@/utils/api/media.api';
import { dehydrate, QueryClient } from 'react-query';
import MediaVideos from '@/components/MediaDetails/MediaVideos';
import MediaImages from '@/components/MediaDetails/MediaImages';
import MediaSlide from '@/components/Media/MediaSlide';
import MediaReviews from '@/components/MediaDetails/MediaReviews';
import { getReviewsMedia } from '@/utils/api/review.api';

interface MediaDetailsProps { }

const MediaDetails: FC<MediaDetailsProps> = ({ }) => {
    const router = useRouter();
    const { type, mediaId } = router.query;

    return (
        <DefaultLayout>
            <HeroDetails
                mediaType={type as string}
                mediaId={mediaId as string}
            />
            <MediaVideos
                mediaType={type as string}
                mediaId={mediaId as string}
            />
            <MediaImages
                mediaType={type as string}
                mediaId={mediaId as string}
            />
            <MediaReviews
                mediaType={type as string}
                mediaId={mediaId as string}
            />
            <MediaSlide
                mediaId={mediaId as string}
                mediaType={type as string}
                title={'YOU MAY ALSO LIKE'}
            />
        </DefaultLayout>
    );
};

export default MediaDetails;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { type, mediaId } = context.query;
    const queryClient = new QueryClient();

    if (type && mediaId) {
        const promiseGenres = queryClient.prefetchQuery(['genres'], getGenres);
        const promiseMediaDetails = queryClient.prefetchQuery(
            ['mediaDetails', type, mediaId],
            () =>
                getMediaDetails({
                    mediaType: type as string,
                    mediaId: mediaId as string,
                })
        );
        const promiseMediaImages = queryClient.prefetchQuery(
            ['mediaImages', type, mediaId],
            () =>
                getMediaImages({
                    mediaType: type as string,
                    mediaId: mediaId as string,
                })
        );
        const promiseMediaRecommend = queryClient.prefetchQuery(
            ['media', type, mediaId],
            () =>
                getMediaRecommends({
                    mediaType: type as string,
                    mediaId: mediaId as string,
                })
        );

        const promiseReviews = queryClient.prefetchInfiniteQuery(['reviewsPagination', type, mediaId], ({ pageParam = 1 }) =>
            getReviewsMedia({
                mediaType: type as string,
                mediaId: mediaId as string,
                page: pageParam,
            }))

        await Promise.all([
            promiseGenres,
            promiseMediaDetails,
            promiseMediaImages,
            promiseMediaRecommend,
            promiseReviews
        ]);
    }

    const res = context.res
    res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59')

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};
