import React, { useState } from 'react';

const API_KEY = '99eb9fd1';
const API_URL = 'https://www.omdbapi.com/';

const App = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!query.trim()) {
      setError('Invalid movie name. Please try again.');
      return;
    }
    setError('');
    try {
      const response = await fetch(`${API_URL}?s=${encodeURIComponent(query)}&apikey=${API_KEY}`);
      const data = await response.json();
      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError('Invalid movie name. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="app">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-bar"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>
      {error && <p className="error">{error}</p>}
      <div className="movies-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.imdbID} className="movie-card">
              <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
              <h3 className="movie-title">{movie.Title}</h3>
              <p className="movie-year">{movie.Year}</p>
            </div>
          ))
        ) : (
          !error && <p>No movies found. Please try another search.</p>
        )}
      </div>
    </div>
  );
};

export default App;
