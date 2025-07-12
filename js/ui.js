// UI Utility Functions
class MovieUI {
    constructor() {
        this.moviesGrid = document.getElementById('moviesGrid');
        this.loadingSpinner = document.getElementById('loadingSpinner');
        this.loadMoreContainer = document.getElementById('loadMoreContainer');
        this.loadMoreBtn = document.getElementById('loadMoreBtn');
        this.noResults = document.getElementById('noResults');
        this.movieModal = document.getElementById('movieModal');
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.navButtons = document.querySelectorAll('.nav-btn');
        
        this.currentPage = 1;
        this.currentCategory = 'trending';
        this.isLoading = false;
        this.hasMorePages = true;
        
        this.setupEventListeners();
    }

    // Setup event listeners
    setupEventListeners() {
        // Search functionality
        this.searchBtn.addEventListener('click', () => this.handleSearch());
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });

        // Navigation buttons
        this.navButtons.forEach(btn => {
            btn.addEventListener('click', () => this.handleCategoryChange(btn));
        });

        // Load more button
        this.loadMoreBtn.addEventListener('click', () => this.handleLoadMore());

        // Modal close
        const modalClose = document.querySelector('.modal-close');
        const modalOverlay = document.querySelector('.modal-overlay');
        
        modalClose.addEventListener('click', () => this.closeModal());
        modalOverlay.addEventListener('click', () => this.closeModal());

        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
        });
    }

    // Show loading spinner
    showLoading() {
        this.isLoading = true;
        this.loadingSpinner.classList.remove('hidden');
        this.moviesGrid.classList.add('hidden');
        this.loadMoreContainer.classList.add('hidden');
        this.noResults.classList.add('hidden');
    }

    // Hide loading spinner
    hideLoading() {
        this.isLoading = false;
        this.loadingSpinner.classList.add('hidden');
        this.moviesGrid.classList.remove('hidden');
    }

    // Show no results message
    showNoResults() {
        this.noResults.classList.remove('hidden');
        this.loadMoreContainer.classList.add('hidden');
    }

    // Hide no results message
    hideNoResults() {
        this.noResults.classList.add('hidden');
    }

    // Create movie card element
    createMovieCard(movie) {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.dataset.movieId = movie.id;

        const posterUrl = movieAPI.getImageURL(movie.posterPath, 'medium');
        const year = movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : 'N/A';
        const rating = movie.voteAverage ? movie.voteAverage.toFixed(1) : 'N/A';

        card.innerHTML = `
            <div class="movie-poster">
                ${posterUrl ? 
                    `<img src="${posterUrl}" alt="${movie.title}" loading="lazy">` : 
                    `<div class="no-image"><i class="fas fa-film"></i></div>`
                }
                ${rating !== 'N/A' ? `<div class="movie-rating">⭐ ${rating}</div>` : ''}
            </div>
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <div class="movie-meta">
                    <span>${year}</span>
                    <span>${rating}</span>
                </div>
                <div class="movie-genres">
                    ${this.getGenreTags(movie.genreIds).join('')}
                </div>
            </div>
        `;

        // Add click event to open modal
        card.addEventListener('click', () => this.openMovieModal(movie.id));

        return card;
    }

    // Get genre tags for movie
    getGenreTags(genreIds) {
        const genreNames = {
            28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy',
            80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family',
            14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music',
            9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV Movie',
            53: 'Thriller', 10752: 'War', 37: 'Western'
        };

        return genreIds.slice(0, 3).map(id => 
            `<span class="genre-tag">${genreNames[id] || 'Unknown'}</span>`
        );
    }

    // Display movies in grid
    displayMovies(movies, append = false) {
        if (!append) {
            this.moviesGrid.innerHTML = '';
        }

        if (movies.length === 0) {
            this.showNoResults();
            return;
        }

        this.hideNoResults();
        
        const fragment = document.createDocumentFragment();
        movies.forEach(movie => {
            const card = this.createMovieCard(movie);
            fragment.appendChild(card);
        });

        this.moviesGrid.appendChild(fragment);
    }

    // Update navigation active state
    updateNavigation(category) {
        this.navButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.category === category) {
                btn.classList.add('active');
            }
        });
    }

    // Show/hide load more button
    toggleLoadMore(show) {
        if (show && this.hasMorePages) {
            this.loadMoreContainer.classList.remove('hidden');
        } else {
            this.loadMoreContainer.classList.add('hidden');
        }
    }

    // Handle search
    handleSearch() {
        const query = this.searchInput.value.trim();
        if (query) {
            this.currentCategory = 'search';
            this.currentPage = 1;
            this.updateNavigation('search');
            this.loadMovies('search', query);
        }
    }

    // Handle category change
    handleCategoryChange(button) {
        const category = button.dataset.category;
        this.currentCategory = category;
        this.currentPage = 1;
        this.updateNavigation(category);
        this.loadMovies(category);
    }

    // Handle load more
    handleLoadMore() {
        if (!this.isLoading && this.hasMorePages) {
            this.currentPage++;
            this.loadMovies(this.currentCategory, this.searchInput.value.trim(), true);
        }
    }

    // Load movies based on category
    async loadMovies(category, query = '', append = false) {
        try {
            this.showLoading();
            
            let response;
            switch (category) {
                case 'trending':
                    response = await movieAPI.getTrendingMovies(this.currentPage);
                    break;
                case 'top-rated':
                    response = await movieAPI.getTopRatedMovies(this.currentPage);
                    break;
                case 'search':
                    response = await movieAPI.searchMovies(query, this.currentPage);
                    break;
                default:
                    // Handle genre categories
                    const genreId = GENRES[category];
                    if (genreId) {
                        response = await movieAPI.getMoviesByGenre(genreId, this.currentPage);
                    } else {
                        response = await movieAPI.getTrendingMovies(this.currentPage);
                    }
            }

            const movies = response.results.map(movie => movieAPI.formatMovieData(movie));
            this.hasMorePages = this.currentPage < response.total_pages;
            
            this.displayMovies(movies, append);
            this.toggleLoadMore(true);
            
        } catch (error) {
            console.error('Error loading movies:', error);
            this.showNoResults();
        } finally {
            this.hideLoading();
        }
    }

    // Open movie modal
    async openMovieModal(movieId) {
        try {
            this.showModalLoading();
            
            const movieDetails = await movieAPI.getMovieDetails(movieId);
            const formattedMovie = movieAPI.formatMovieDetails(movieDetails);
            
            this.populateModal(formattedMovie);
            this.movieModal.classList.remove('hidden');
            
            // Load trailer
            this.loadTrailer(movieDetails.videos?.results || []);
            
        } catch (error) {
            console.error('Error loading movie details:', error);
            this.closeModal();
        }
    }

    // Show modal loading state
    showModalLoading() {
        this.movieModal.classList.remove('hidden');
        const modalBody = document.querySelector('.modal-body');
        modalBody.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <p>Loading movie details...</p>
            </div>
        `;
    }

    // Populate modal with movie details
    populateModal(movie) {
        const modalBody = document.querySelector('.modal-body');
        const posterUrl = movieAPI.getImageURL(movie.posterPath, 'large');
        const year = movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : 'N/A';
        const rating = movie.voteAverage ? movie.voteAverage.toFixed(1) : 'N/A';
        const runtime = movie.runtime ? `${movie.runtime} min` : 'N/A';

        const genres = movie.genres.map(genre => 
            `<span class="genre-tag">${genre.name}</span>`
        ).join('');

        modalBody.innerHTML = `
            <div class="movie-details">
                <div class="movie-poster">
                    ${posterUrl ? 
                        `<img id="modalPoster" src="${posterUrl}" alt="${movie.title}">` : 
                        `<div class="no-image"><i class="fas fa-film"></i></div>`
                    }
                </div>
                
                <div class="movie-info">
                    <h2 id="modalTitle">${movie.title}</h2>
                    <div class="movie-meta">
                        <span id="modalYear">${year}</span>
                        <span id="modalRating">⭐ ${rating}</span>
                        <span id="modalRuntime">${runtime}</span>
                    </div>
                    <div class="movie-genres" id="modalGenres">
                        ${genres}
                    </div>
                    <p id="modalOverview">${movie.overview || 'No overview available.'}</p>
                    
                    <div class="trailer-section">
                        <h3>Trailer</h3>
                        <div id="trailerContainer" class="trailer-container">
                            <div id="trailerPlaceholder" class="trailer-placeholder">
                                <i class="fas fa-play"></i>
                                <p>Loading trailer...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Load trailer in modal
    loadTrailer(videos) {
        const trailerContainer = document.getElementById('trailerContainer');
        const trailer = movieAPI.getYouTubeTrailer(videos);

        if (trailer) {
            const embedUrl = `https://www.youtube.com/embed/${trailer.key}`;
            trailerContainer.innerHTML = `
                <iframe 
                    width="100%" 
                    height="315" 
                    src="${embedUrl}" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            `;
        } else {
            trailerContainer.innerHTML = `
                <div class="trailer-placeholder">
                    <i class="fas fa-video-slash"></i>
                    <p>No trailer available</p>
                </div>
            `;
        }
    }

    // Close modal
    closeModal() {
        this.movieModal.classList.add('hidden');
        // Clear trailer iframe to stop video
        const trailerContainer = document.getElementById('trailerContainer');
        if (trailerContainer) {
            trailerContainer.innerHTML = '';
        }
    }

    // Initialize the app
    init() {
        this.loadMovies('trending');
    }
}

// Create global UI instance
const movieUI = new MovieUI(); 