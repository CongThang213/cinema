async function getMovies() {
  const res = await fetch('http://localhost:4000/movies', { cache: 'no-store' });
  return res.json();
}

export default async function MainPage() {
  const movies = await getMovies();
  return (
    <div>
      <h2>Movies List</h2>
      <ul>
        {movies.map((movie: any) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}
