document.addEventListener("DOMContentLoaded", function () {
    const moviesList = document.getElementById("movies-list");
    const searchInput = document.getElementById("search");

    fetch('movies.json')
        .then(response => response.json())
        .then(data => {
            let movies = data;
            renderMovies(movies);

            // Фильтрация при вводе в поиске
            searchInput.addEventListener("input", function () {
                let searchText = this.value.toLowerCase();
                let filteredMovies = movies.filter(movie =>
                    movie.title.toLowerCase().includes(searchText)
                );
                renderMovies(filteredMovies);
            });
        })
        .catch(error => console.error("Ошибка загрузки фильмов:", error));

    function renderMovies(movies) {
        moviesList.innerHTML = "";
        movies.forEach(movie => {
            let movieDiv = document.createElement("div");
            movieDiv.className = "bg-gray-800 rounded-lg overflow-hidden shadow-lg p-4";
            movieDiv.innerHTML = `
                <h2 class="text-lg font-semibold mb-2">${movie.title}</h2>
                <iframe class="w-full h-56" src="${movie.iframe}" frameborder="0" allowfullscreen></iframe>
            `;
            moviesList.appendChild(movieDiv);
        });
    }
});
