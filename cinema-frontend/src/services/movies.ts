
import axios from 'axios';

interface Movie {
  id: number;
  title: string;
}

// export const getMovies = async (): Promise<Movie[]> => {
//   const response = await axios.get<Movie[]>('/api/movies'); // 👈 Gán kiểu dữ liệu
//   return response.data;
// };

import apiClient from './apiClient';

interface Movie {
  id: number;
  title: string;
}

export const getMovies = async (): Promise<Movie[]> => {
  try {
    const { data } = await apiClient.get<Movie[]>('/api/movies');
    return data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};
