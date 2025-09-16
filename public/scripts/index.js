const movieCard = document.querySelector(".movie-card");
const errorBox = document.querySelector(".error-box");
const searchInput = document.getElementById("search-input");
function displayMovieInfo(movies) {
  // Function to display movie information or `Movie not found` text
  console.log(movies);
  const movieCover = document.querySelector(".movie-img"); //Movie cover
  const movieTitle = document.querySelector(".movie-title"); //Movie title
  const movieDescription = document.querySelector(".movie-description"); //Movie description
  const director = document.getElementById("director"); //Movie director
  const writers = document.getElementById("writers"); //Movie writers
  const actorsStars = document.getElementById("stars"); //Movie actors
  const rating = document.getElementById("rating"); //Movie rating
  const votes = document.getElementById("votes"); //Movie votes
  // Update movie information
  movieCover.src = movies.Poster;
  movieTitle.textContent = movies.Title;
  movieDescription.textContent = movies.Plot;
  director.textContent = movies.Director;
  writers.textContent = movies.Writer;
  actorsStars.textContent = movies.Actors;
  rating.textContent = `${movies.imdbRating}/10`;
  votes.textContent = `(${movies.imdbVotes} votes)`;
  updateTags(movies.Genre);
}
function updateTags(genre) {
  const tagsRow = document.querySelector(".tags-row");
  tagsRow.replaceChildren(); //Clear all tags
  genre = genre.split(",");
  for (let i = 0; i < genre.length; i++) {
    genreElementCreate(genre[i]);
  }
  function genreElementCreate(genretext) {
    const genreElement = document.createElement("span");
    genreElement.classList.add("tags-row__item");
    genreElement.textContent = genretext;
    tagsRow.appendChild(genreElement);
  }
}
function getData(movieName) {
  if (!movieName.trim()) return;
  fetch("movie-search-app-git-master-alexandrlebedenkos-projects.vercel.app/api/movie?t=" + encodeURIComponent(movieName))
    .then((response) => response.json())
    .then((data) => {
      if (data.Response === "True") {
        displayMovieInfo(data);
        movieCard.classList.remove("movie-card--disable");
        errorBox.classList.remove("error-box--active");
        searchInput.value = "";
        searchInput.placeholder = "Search movie";
      } else {
        movieCard.classList.add("movie-card--disable");
        errorBox.classList.add("error-box--active");
        searchInput.value = "";
        searchInput.placeholder = "Not a real name";
      }
    })
    .catch((error) => {
      console.error("Error fetching movie information:", error);
    });
}

searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    getData(searchInput.value);
  }
});
