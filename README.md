# Movie Explorer App 🎬

A modern, responsive web application for exploring movies using the TMDb (The Movie Database) API. Built with vanilla JavaScript, HTML, and CSS.

## ✨ Features

### 🎯 Core Functionality
- **Browse Movies**: View trending, top-rated, and genre-specific movies
- **Search**: Search movies by title, actor, or director
- **Movie Details**: Click any movie card to see detailed information
- **Trailers**: Watch embedded YouTube trailers directly in the app
- **Infinite Scroll**: Load more movies with pagination

### 🎨 UI/UX Features
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern Interface**: Clean, minimal design with smooth animations
- **Grid Layout**: Beautiful movie card grid with hover effects
- **Modal System**: Elegant movie detail modals with trailers
- **Loading States**: Smooth loading spinners and transitions
- **Keyboard Shortcuts**: Quick access to search and help

### 🔧 Technical Features
- **No Backend Required**: Pure frontend application
- **Modular Architecture**: Clean, organized code structure
- **Error Handling**: Graceful error handling and user feedback
- **Performance Optimized**: Lazy loading images and efficient API calls
- **Cross-browser Compatible**: Works on all modern browsers

## 🚀 Quick Start

### 1. Get TMDb API Key
1. Visit [TMDb Developer Portal](https://developers.themoviedb.org/3/getting-started/introduction)
2. Create a free account
3. Request an API key for "Developer" use
4. Copy your API key

### 2. Setup the Application
1. Clone or download this repository
2. Open `js/config.js`
3. Replace `YOUR_TMDB_API_KEY_HERE` with your actual API key:
   ```javascript
   API_KEY: 'your_actual_api_key_here'
   ```

### 3. Run the Application
1. Open `index.html` in your web browser
2. Or serve the files using a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```
3. Navigate to `http://localhost:8000` in your browser

## 📁 Project Structure

```
Movie Explorer App/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── js/
│   ├── config.js       # API configuration and constants
│   ├── api.js          # TMDb API utility functions
│   ├── ui.js           # UI management and DOM manipulation
│   └── app.js          # Main application logic
└── README.md           # This file
```

## 🎮 How to Use

### Browsing Movies
- **Trending**: View currently trending movies (default view)
- **Top Rated**: Browse highest-rated movies
- **Genres**: Click genre buttons (Action, Comedy, Drama) to filter movies

### Searching
- Use the search bar to find movies by title, actor, or director
- Press Enter or click the search button
- Results update in real-time

### Viewing Movie Details
- Click any movie card to open a detailed modal
- View movie information, genres, and watch trailers
- Close modal by clicking the X, clicking outside, or pressing Escape

### Keyboard Shortcuts
- `Ctrl/Cmd + K`: Focus search bar
- `Ctrl/Cmd + /`: Show keyboard shortcuts help
- `Enter`: Search (when in search bar)
- `Escape`: Close modal

## 🔧 Configuration

### API Settings (`js/config.js`)
```javascript
const CONFIG = {
    API_KEY: 'your_api_key_here',
    BASE_URL: 'https://api.themoviedb.org/3',
    IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',
    // ... other settings
};
```

### Available Genres
The app supports these movie genres:
- Action, Adventure, Animation, Comedy, Crime
- Documentary, Drama, Family, Fantasy, History
- Horror, Music, Mystery, Romance, Sci-Fi
- Thriller, War, Western

## 🎨 Customization

### Styling
- Modify `styles.css` to change colors, fonts, and layout
- The app uses CSS custom properties for easy theming
- Responsive breakpoints are clearly defined

### Adding Features
- Extend the `MovieAPI` class in `api.js` for new API endpoints
- Add new UI components in `ui.js`
- Modify the main app logic in `app.js`

## 🌐 API Endpoints Used

The app uses these TMDb API endpoints:
- `/trending/movie/day` - Get trending movies
- `/movie/top_rated` - Get top-rated movies
- `/search/movie` - Search movies
- `/discover/movie` - Get movies by genre
- `/movie/{id}` - Get movie details
- `/movie/{id}/videos` - Get movie trailers

## 🐛 Troubleshooting

### Common Issues

**"API Key Required" Error**
- Make sure you've added your TMDb API key in `js/config.js`
- Verify the API key is correct and active

**No Movies Loading**
- Check your internet connection
- Verify the TMDb API is accessible
- Check browser console for error messages

**Images Not Loading**
- TMDb image URLs might be temporarily unavailable
- The app shows placeholder icons for missing images

**Modal Not Opening**
- Ensure JavaScript is enabled in your browser
- Check for console errors

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📱 Mobile Support

The app is fully responsive and optimized for:
- Mobile phones (320px+)
- Tablets (768px+)
- Desktop (1024px+)

## 🤝 Contributing

Feel free to contribute to this project by:
1. Reporting bugs
2. Suggesting new features
3. Submitting pull requests
4. Improving documentation

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [TMDb](https://www.themoviedb.org/) for providing the movie database API
- [Font Awesome](https://fontawesome.com/) for icons
- [Google Fonts](https://fonts.google.com/) for the Inter font family

## 📞 Support

If you encounter any issues or have questions:
1. Check the troubleshooting section above
2. Review the browser console for error messages
3. Ensure your TMDb API key is valid and active

---

**Enjoy exploring movies! 🎬✨** 