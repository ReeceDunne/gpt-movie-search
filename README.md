# Movie Details Search

A Node.js application that uses OpenAI and OMDB API to search for movies based on user input, fetch their details, and calculate average ratings based on IMDb and Rotten Tomatoes scores.

## Features:

- Prompt-based movie search using OpenAI's GPT model.
- Fetch movie details from OMDB API (including title, release date, director, genre, etc.).
- Calculate the average rating of movies based on IMDb and Rotten Tomatoes scores (only if both ratings are valid).
- User-friendly command-line interface.

## Requirements:

- Node.js (v14 or higher)
- NPM (or Yarn)

## Setup:

### 1. Clone the repository:

```bash
git clone https://github.com/ReeceDunne/gpt-movie-search.git
cd movie-details-search
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables:
Create a .env file in the root directory and add your API keys:
```bash
OPEN_AI_API_KEY=your_openai_api_key
OMDB_API_KEY=your_omdb_api_key
```

### 4. Run the application:
```bash
node index.js
```

### 5. Interact with the CLI:
The app will prompt you to enter how many movies you'd like to search (up to 10).
Then, you'll enter a description for the movie search (e.g., "feature a character walking away from an explosion").
The app will fetch and display the movie titles and their details.

#### Example Prompt:
```bash
How many movies would you like to return (max 10): 5
Please enter the description of the movies you want (e.g., 'feature a character walking away from an explosion'): feature a character walking away from an explosion
```

#### Example Response:
```json
Movie Details: [
  {
  title: 'The Dark Knight',
  plot: 'When a menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman, James Gordon and Harvey Dent must work together to put an end to the madness.',
  maturity_rating: 'PG-13',
  releaseDate: '18-07-2008',
  runtime: '152 min',
  poster: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg',
  scores: { imdb: 9, rottenTomatoes: 9.4, averagedScore: 9.2 }
}
{
  title: 'Transformers',
  plot: 'An ancient struggle between two Cybertronian races, the heroic Autobots and the evil Decepticons, comes to Earth, with a clue to the ultimate power held by a teenager.',
  maturity_rating: 'PG-13',
  releaseDate: '03-07-2007',
  runtime: '144 min',
  poster: 'https://m.media-amazon.com/images/M/MV5BZjM3ZDA2YmItMzhiMi00ZGI3LTg3ZGQtOTk3Nzk0MDY0ZDZhXkEyXkFqcGc@._V1_SX300.jpg',
  scores: { imdb: 7.1, rottenTomatoes: 5.7, averagedScore: 6.4 }
}
  ...
]
```

## Code Structure:

_index.js_: Main application file that handles user input, queries OpenAI, fetches movie details, and calculates average scores.
_getMovieDetails.js_: Handles API calls to OMDB to fetch movie details.
_.env_: Stores API keys for OpenAI and OMDB.
