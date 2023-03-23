import {API_KEY, BASE_PATH} from './const';

interface IResult {
  id: number;
  backdrop_path: string;
  overview: string;
  poster_path: string;
  name: string;
  vote_average: number;
}

export interface IGetTvResult {
  page: number;
  results: IResult[];
  total_page: number;
  total_results: number;
}

// Latest Shows
export function getLatestShows(){
  return fetch(`${BASE_PATH}/tv/latest?api_key=${API_KEY}`).then((response) => response.json())
}

// Airing Today
export function getAiringToday(){
  return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}`).then((response) => response.json())
}

// Popular
export function getPopular(){
  return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}`).then((response) => response.json())
}

// Top Rated
export function getTopRated(){
  return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`).then((response) => response.json())
}
