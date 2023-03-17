const tmdbConfig = {
    poster_path: (path: string) => `https://image.tmdb.org/t/p/w500${path}`,
    backdrop_path: (path: string) =>
        `https://image.tmdb.org/t/p/original${path}`,
    youtube_path: (path: string) =>
        `https://www.youtube-nocookie.com/embed/${path}`,
    mediaType: {
        TV: 'tv',
        MOVIE: 'movie',
        PERSON: 'person',
    },
    mediaCategory: {
        POPULAR: 'popular',
        TOP_RATED: 'top_rated',
    },
};

export default tmdbConfig;
