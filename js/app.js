// Main Application Entry Point
class MovieExplorerApp {
    constructor() {
        this.initialized = false;
    }

    // Initialize the application
    async init() {
        try {
            // Check if API key is configured
            if (CONFIG.API_KEY === 'YOUR_TMDB_API_KEY_HERE') {
                this.showAPIKeyError();
                return;
            }

            // Initialize UI
            movieUI.init();
            this.initialized = true;

            console.log('Movie Explorer App initialized successfully!');
            
        } catch (error) {
            console.error('Failed to initialize Movie Explorer App:', error);
            this.showError('Failed to initialize the application. Please check your internet connection and try again.');
        }
    }

    // Show API key error
    showAPIKeyError() {
        const main = document.querySelector('.main');
        main.innerHTML = `
            <div class="container">
                <div class="api-key-error">
                    <div class="error-content">
                        <i class="fas fa-key"></i>
                        <h2>API Key Required</h2>
                        <p>To use this Movie Explorer App, you need to add your TMDb API key.</p>
                        <div class="setup-instructions">
                            <h3>Setup Instructions:</h3>
                            <ol>
                                <li>Get a free API key from <a href="https://developers.themoviedb.org/3/getting-started/introduction" target="_blank">TMDb</a></li>
                                <li>Open <code>js/config.js</code></li>
                                <li>Replace <code>YOUR_TMDB_API_KEY_HERE</code> with your actual API key</li>
                                <li>Refresh this page</li>
                            </ol>
                        </div>
                        <div class="example-code">
                            <p><strong>Example:</strong></p>
                            <code>API_KEY: '1234567890abcdef1234567890abcdef'</code>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add styles for the error page
        const style = document.createElement('style');
        style.textContent = `
            .api-key-error {
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 60vh;
                color: white;
            }
            
            .error-content {
                text-align: center;
                max-width: 600px;
                padding: 40px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 20px;
                backdrop-filter: blur(10px);
            }
            
            .error-content i {
                font-size: 4rem;
                margin-bottom: 20px;
                color: #ffd700;
            }
            
            .error-content h2 {
                font-size: 2rem;
                margin-bottom: 15px;
            }
            
            .error-content p {
                font-size: 1.1rem;
                margin-bottom: 30px;
                opacity: 0.9;
            }
            
            .setup-instructions {
                text-align: left;
                background: rgba(255, 255, 255, 0.1);
                padding: 20px;
                border-radius: 10px;
                margin-bottom: 20px;
            }
            
            .setup-instructions h3 {
                margin-bottom: 15px;
                color: #ffd700;
            }
            
            .setup-instructions ol {
                padding-left: 20px;
            }
            
            .setup-instructions li {
                margin-bottom: 8px;
                line-height: 1.5;
            }
            
            .setup-instructions a {
                color: #ffd700;
                text-decoration: none;
            }
            
            .setup-instructions a:hover {
                text-decoration: underline;
            }
            
            .example-code {
                background: rgba(0, 0, 0, 0.3);
                padding: 15px;
                border-radius: 8px;
                font-family: 'Courier New', monospace;
            }
            
            .example-code code {
                color: #ffd700;
                font-size: 0.9rem;
            }
        `;
        document.head.appendChild(style);
    }

    // Show general error
    showError(message) {
        const main = document.querySelector('.main');
        main.innerHTML = `
            <div class="container">
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h2>Error</h2>
                    <p>${message}</p>
                    <button onclick="location.reload()" class="retry-btn">
                        <i class="fas fa-redo"></i>
                        Retry
                    </button>
                </div>
            </div>
        `;

        // Add styles for the error message
        const style = document.createElement('style');
        style.textContent = `
            .error-message {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                min-height: 60vh;
                color: white;
                text-align: center;
            }
            
            .error-message i {
                font-size: 4rem;
                margin-bottom: 20px;
                color: #ff6b6b;
            }
            
            .error-message h2 {
                font-size: 2rem;
                margin-bottom: 15px;
            }
            
            .error-message p {
                font-size: 1.1rem;
                margin-bottom: 30px;
                opacity: 0.9;
                max-width: 500px;
            }
            
            .retry-btn {
                background: rgba(255, 255, 255, 0.2);
                border: 2px solid rgba(255, 255, 255, 0.3);
                color: white;
                padding: 12px 24px;
                border-radius: 25px;
                cursor: pointer;
                font-size: 1rem;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .retry-btn:hover {
                background: rgba(255, 255, 255, 0.3);
                transform: translateY(-2px);
            }
        `;
        document.head.appendChild(style);
    }
}

// Create and initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new MovieExplorerApp();
    app.init();
});

// Add some additional utility functions for better user experience

// Debounce function for search optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add smooth scrolling for better UX
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll to top when clicking on logo
    const logo = document.querySelector('.logo');
    logo.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('searchInput').focus();
    }
    
    // Ctrl/Cmd + / to show keyboard shortcuts help
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        showKeyboardShortcuts();
    }
});

// Show keyboard shortcuts help
function showKeyboardShortcuts() {
    const shortcuts = [
        { key: 'Ctrl/Cmd + K', description: 'Focus search bar' },
        { key: 'Ctrl/Cmd + /', description: 'Show this help' },
        { key: 'Enter', description: 'Search (when in search bar)' },
        { key: 'Escape', description: 'Close modal' }
    ];

    const helpHTML = `
        <div class="keyboard-shortcuts">
            <div class="shortcuts-content">
                <h3><i class="fas fa-keyboard"></i> Keyboard Shortcuts</h3>
                <div class="shortcuts-list">
                    ${shortcuts.map(shortcut => `
                        <div class="shortcut-item">
                            <kbd>${shortcut.key}</kbd>
                            <span>${shortcut.description}</span>
                        </div>
                    `).join('')}
                </div>
                <button onclick="closeKeyboardShortcuts()" class="close-btn">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    `;

    // Add to body
    const helpElement = document.createElement('div');
    helpElement.innerHTML = helpHTML;
    document.body.appendChild(helpElement);

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .keyboard-shortcuts {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            backdrop-filter: blur(5px);
        }
        
        .shortcuts-content {
            background: white;
            border-radius: 15px;
            padding: 30px;
            max-width: 400px;
            width: 90%;
            position: relative;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        
        .shortcuts-content h3 {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 20px;
            color: #333;
        }
        
        .shortcuts-list {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        
        .shortcut-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0;
            border-bottom: 1px solid #eee;
        }
        
        .shortcut-item:last-child {
            border-bottom: none;
        }
        
        kbd {
            background: #f5f5f5;
            border: 1px solid #ccc;
            border-radius: 4px;
            padding: 4px 8px;
            font-family: monospace;
            font-size: 0.9rem;
            color: #333;
        }
        
        .close-btn {
            position: absolute;
            top: 15px;
            right: 15px;
            background: none;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
            color: #666;
            padding: 5px;
            border-radius: 50%;
            transition: background 0.3s ease;
        }
        
        .close-btn:hover {
            background: #f5f5f5;
        }
    `;
    document.head.appendChild(style);
}

// Close keyboard shortcuts help
function closeKeyboardShortcuts() {
    const helpElement = document.querySelector('.keyboard-shortcuts');
    if (helpElement) {
        helpElement.remove();
    }
} 