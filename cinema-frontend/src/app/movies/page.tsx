import { fetchMovies } from "@/services/api";

export default async function MoviesPage() {
  const movies = await fetchMovies();

  return (
    <div>
      <h1>Danh Sách Phim</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}
