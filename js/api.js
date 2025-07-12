// API Utility Functions
class MovieAPI {
    constructor() {
        this.baseURL = CONFIG.BASE_URL;
        this.apiKey = CONFIG.API_KEY;
    }

    // Helper method to build API URL
    buildURL(endpoint, params = {}) {
        const url = new URL(this.baseURL + endpoint);
        url.searchParams.append('api_key', this.apiKey);
        url.searchParams.append('language', 'en-US');
        
        // Add additional parameters
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                url.searchParams.append(key, value);
            }
        });
        
        return url.toString();
    }

    // Helper method to make API requests
    async makeRequest(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    // Get trending movies
    async getTrendingMovies(page = 1, timeWindow = 'day') {
        const endpoint = timeWindow === 'week' ? '/trending/movie/week' : ENDPOINTS.TRENDING;
        const url = this.buildURL(endpoint, { page });
        return this.makeRequest(url);
    }

    // Get top rated movies
    async getTopRatedMovies(page = 1) {
        const url = this.buildURL(ENDPOINTS.TOP_RATED, { page });
        return this.makeRequest(url);
    }

    // Search movies
    async searchMovies(query, page = 1) {
        const url = this.buildURL(ENDPOINTS.SEARCH, { 
            query: encodeURIComponent(query), 
            page,
            include_adult: false
        });
        return this.makeRequest(url);
    }

    // Get movies by genre
    async getMoviesByGenre(genreId, page = 1) {
        const url = this.buildURL(ENDPOINTS.DISCOVER, {
            with_genres: genreId,
            page,
            sort_by: 'popularity.desc',
            include_adult: false
        });
        return this.makeRequest(url);
    }

    // Get movie details
    async getMovieDetails(movieId) {
        const url = this.buildURL(`${ENDPOINTS.MOVIE_DETAILS}/${movieId}`, {
            append_to_response: 'videos,credits'
        });
        return this.makeRequest(url);
    }

    // Get movie videos (trailers)
    async getMovieVideos(movieId) {
        const url = this.buildURL(`${ENDPOINTS.MOVIE_DETAILS}/${movieId}/videos`);
        return this.makeRequest(url);
    }

    // Get image URL
    getImageURL(path, size = 'medium', type = 'poster') {
        if (!path) return null;
        
        const sizes = type === 'backdrop' ? CONFIG.BACKDROP_SIZES : CONFIG.POSTER_SIZES;
        const sizeKey = sizes[size] || sizes.medium;
        
        return `${CONFIG.IMAGE_BASE_URL}/${sizeKey}${path}`;
    }

    // Format movie data for display
    formatMovieData(movie) {
        return {
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            posterPath: movie.poster_path,
            backdropPath: movie.backdrop_path,
            releaseDate: movie.release_date,
            voteAverage: movie.vote_average,
            voteCount: movie.vote_count,
            genreIds: movie.genre_ids || [],
            popularity: movie.popularity,
            adult: movie.adult,
            originalLanguage: movie.original_language,
            originalTitle: movie.original_title
        };
    }

    // Format movie details for modal
    formatMovieDetails(movie) {
        return {
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            posterPath: movie.poster_path,
            backdropPath: movie.backdrop_path,
            releaseDate: movie.release_date,
            voteAverage: movie.vote_average,
            voteCount: movie.vote_count,
            runtime: movie.runtime,
            genres: movie.genres || [],
            status: movie.status,
            tagline: movie.tagline,
            budget: movie.budget,
            revenue: movie.revenue,
            videos: movie.videos?.results || [],
            credits: movie.credits || {}
        };
    }

    // Get YouTube trailer from videos
    getYouTubeTrailer(videos) {
        if (!videos || videos.length === 0) return null;
        
        // Look for official trailer first
        let trailer = videos.find(video => 
            video.type === 'Trailer' && 
            video.site === 'YouTube' && 
            video.official === true
        );
        
        // If no official trailer, get any trailer
        if (!trailer) {
            trailer = videos.find(video => 
                video.type === 'Trailer' && 
                video.site === 'YouTube'
            );
        }
        
        // If still no trailer, get any YouTube video
        if (!trailer) {
            trailer = videos.find(video => video.site === 'YouTube');
        }
        
        return trailer;
    }
}

// Create global API instance
const movieAPI = new MovieAPI(); 