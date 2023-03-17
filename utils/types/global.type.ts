export type TR<T> = {
    errCode: number;
    msg: string;
    data: T;
};

export type TMediaMovie = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: false;
    vote_average: number;
    vote_count: number;
    media_type?: string;
};

export type TMediaTV = {
    backdrop_path: string;
    first_air_date: string;
    genre_ids: number[];
    id: number;
    name: string;
    origin_country: string;
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    vote_average: number;
    vote_count: number;
    media_type?: string;
};

export type MediaDetails = {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: null;
    budget: number;
    genres: Genres[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    revenue: number;
    runtime: number;
    status: string;
    tagline: string;
    title?: string;
    original_name?: string;
    video: false;
    vote_average: number;
    vote_count: number;
};

export type MediaVideo = {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
};

export type MediaImage = {
    aspect_ratio: number;
    height: number;
    iso_639_1: string;
    file_path: string;
    vote_average: number;
    vote_count: number;
    width: number;
};

export type Genres = {
    id: number;
    name: string;
};

export type actor = {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
};

export type User = {
    id: number;
    userId: string;
    username: string;
    displayName: string;
    createdAt: string;
    updatedAt: string;
};

export type Review = {
    id: number;
    userId: string;
    mediaType: string;
    mediaId: number;
    mediaTitle: string;
    mediaPoster: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    user: User;
};

export type Favorite = {
    id: number;
    userId: string;
    mediaType: string;
    mediaId: number;
    mediaTitle: string;
    mediaPoster: string;
    mediaRate: number;
    createdAt: string;
    updatedAt: string;
};

export type Person = {
    adult: false;
    also_known_as: string[];
    biography: string;
    birthday: string;
    deathday: string | null;
    gender: 2;
    homepage: string | null;
    id: 221611;
    imdb_id: string;
    known_for_department: string;
    name: string;
    place_of_birth: string;
    popularity: 9.663;
    profile_path: string;
};
