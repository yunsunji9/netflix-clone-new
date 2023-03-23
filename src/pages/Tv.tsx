import { IGetTvResult, getAiringToday, getLatestShows, getPopular, getTopRated } from "../api/tv";

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

export default function TV() {
  const { scrollY } = useScroll();
  const isTvMatch = useMatch("/tvs/:subCategory/:tvId");

  const { data: airingTodayData, isLoading: airingTodayLoading } = useQuery<IGetTvResult>(
    ["airingTodayId", "airingToday"],
    getAiringToday
  );
  const { data: latestData, isLoading: latestLoading } = useQuery<IGetTvResult>(
    ["lastestTvId", "lastestTv"],
    getLatestShows
  );
  const { data: popularData, isLoading: popularLoading } = useQuery<IGetTvResult>(
    ["popularId", "popular"],
    getPopular
  );
  const { data: topRatedData, isLoading: topRatedLoading } = useQuery<IGetTvResult>(
    ["topRatedId", "topRated"],
    getTopRated
  );
  const isLoading = () => {
    return airingTodayLoading || latestLoading || popularLoading || topRatedLoading;
  };

  const getCategoryData = (): IGetTvResult | undefined => {
    if (!isTvMatch) return;

    switch (isTvMatch.params.subCategory) {
      case "airingtoday":
        return airingTodayData;
      case "popular":
        return popularData;
      case "toprated":
        return topRatedData;
      case "latest":
        return latestData;
      default:
        return;
    }
  };

  const clickedContent =
    isTvMatch?.params.tvId &&
    isTvMatch.params.subCategory &&
    getCategoryData()?.results.find((tv: any) => "" + tv.id === isTvMatch?.params.tvId);

  return isLoading() ? (
    <Loading>Loading....</Loading>
  ) : (
    <>
      <Banner
        image={airingTodayData?.results[0]?.backdrop_path || ""}
        title={airingTodayData?.results[0]?.name || ""}
        overview={airingTodayData?.results[0]?.overview || ""}
      />
      <SliderWrapper>
        <Slider
          data={airingTodayData}
          title="Airing Playing"
          mainCategory="tvs"
          subCategory="airingtoday"
        />
        <Slider data={popularData} title="Popular" mainCategory="tvs" subCategory="popular" />
        <Slider data={topRatedData} title="Top Rated" mainCategory="tvs" subCategory="toprated" />
        <Slider data={latestData} title="Latest" mainCategory="tvs" subCategory="latest" />
      </SliderWrapper>

      {isTvMatch !== null && (
        <Modal
          scrollY={scrollY.get()}
          layoutId={`${isTvMatch.params.subCategory}_${isTvMatch.params.tvId}`}
          clickedContent={clickedContent}
        />
      )}
    </>
  );
}
