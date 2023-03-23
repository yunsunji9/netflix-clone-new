import {API_KEY, BASE_PATH} from './const';

interface IResult {
  id: number;
  backdrop_path: string;
  overview: string;
  poster_path: string;
  name: string;
  vote_average: number;
}

export interface IGetSearchResult {
  page: number;
  results: IResult[];
  total_page: number;
  total_results: number;
}

export function getSearch({ keyword, page}: { keyword: string, page: number }){
  return fetch(`${BASE_PATH}/search/multi?api_key=${API_KEY}&query=${keyword}&page=${page}`).then((response) => response.json())
}
