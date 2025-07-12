// TMDb API Configuration
const CONFIG = {
    // Replace with your actual TMDb API key
    API_KEY: 'adf42d1a625cb81ad415c0c9736d1b46',
    BASE_URL: 'https://api.themoviedb.org/3',
    IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',
    POSTER_SIZES: {
        small: 'w185',
        medium: 'w342',
        large: 'w500',
        original: 'original'
    },
    BACKDROP_SIZES: {
        small: 'w300',
        medium: 'w780',
        large: 'w1280',
        original: 'original'
    }
};

// Genre mappings for navigation
const GENRES = {
    'action': 28,
    'adventure': 12,
    'animation': 16,
    'comedy': 35,
    'crime': 80,
    'documentary': 99,
    'drama': 18,
    'family': 10751,
    'fantasy': 14,
    'history': 36,
    'horror': 27,
    'music': 10402,
    'mystery': 9648,
    'romance': 10749,
    'science-fiction': 878,
    'tv-movie': 10770,
    'thriller': 53,
    'war': 10752,
    'western': 37
};

// API endpoints
const ENDPOINTS = {
    TRENDING: '/trending/movie/day',
    TOP_RATED: '/movie/top_rated',
    SEARCH: '/search/movie',
    MOVIE_DETAILS: '/movie',
    MOVIE_VIDEOS: '/movie/{id}/videos',
    DISCOVER: '/discover/movie'
}; 