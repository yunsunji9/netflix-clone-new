import {
  IGetMovieResult,
  getLatestMovies,
  getMovie,
  getTopRatedMovies,
  getUpComing,
} from "../api/movie";

import Banner from "../components/Banner";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import Slider from "../components/Slider";
import styled from "styled-components";
import { useMatch } from "react-router-dom";
import { useQuery } from "react-query";
import { useScroll } from "framer-motion";

const SliderWrapper = styled.div`
  margin-top: -300px;
`;

export default function Main() {
  const { scrollY } = useScroll();
  const isMovieMatch = useMatch("/movies/:subCategory/:movieId");

  const { data: nowPlayingData, isLoading: nowPlayingLoading } = useQuery<IGetMovieResult>(
    ["nowPlayingId", "nowPlaying"],
    getMovie
  );
  const { data: latestData, isLoading: latestLoading } = useQuery<IGetMovieResult>(
    ["latestId", "lastest"],
    getLatestMovies
  );
  const { data: topRatedData, isLoading: topRatedLoading } = useQuery<IGetMovieResult>(
    ["topRatedId", "topRated"],
    getTopRatedMovies
  );
  const { data: upComingData, isLoading: upComingLoading } = useQuery<IGetMovieResult>(
    ["upComingId", "upComing"],
    getUpComing
  );

  const isLoading = () => {
    return nowPlayingLoading || latestLoading || topRatedLoading || upComingLoading;
  };

  const getCategoryData = (): IGetMovieResult | undefined => {
    if (!isMovieMatch) return;

    switch (isMovieMatch.params.subCategory) {
      case "nowplaying":
        return nowPlayingData;
      case "latest":
        return latestData;
      case "toprated":
        return topRatedData;
      case "upcoming":
        return upComingData;
      default:
        return;
    }
  };

  const clickedContent =
    isMovieMatch?.params.movieId &&
    isMovieMatch.params.subCategory &&
    getCategoryData()?.results.find((movie: any) => "" + movie.id === isMovieMatch?.params.movieId);

  return isLoading() ? (
    <Loading>Loading....</Loading>
  ) : (
    <>
      <Banner
        image={nowPlayingData?.results[0]?.backdrop_path || ""}
        title={nowPlayingData?.results[0]?.title || ""}
        overview={nowPlayingData?.results[0]?.overview || ""}
      />
      <SliderWrapper>
        <Slider
          data={nowPlayingData}
          title="Now Playing"
          mainCategory="movies"
          subCategory="nowplaying"
        />
        <Slider
          data={topRatedData}
          title="Top Rated"
          mainCategory="movies"
          subCategory="toprated"
        />
        <Slider data={upComingData} title="UpComing" mainCategory="movies" subCategory="upcoming" />
        <Slider data={latestData} title="Latest" mainCategory="movies" subCategory="latest" />
      </SliderWrapper>

      {isMovieMatch !== null && (
        <Modal
          scrollY={scrollY.get()}
          layoutId={`${isMovieMatch.params.subCategory}_${isMovieMatch.params.movieId}`}
          clickedContent={clickedContent}
        />
      )}
    </>
  );
}
