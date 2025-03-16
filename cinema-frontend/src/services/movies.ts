
import axios from 'axios';

interface Movie {
  id: number;
  title: string;
}

export const getMovies = async (): Promise<Movie[]> => {
  const response = await axios.get<Movie[]>('/api/movies'); // 👈 Gán kiểu dữ liệu
  return response.data;
};
