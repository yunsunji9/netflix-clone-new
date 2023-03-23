import { useCallback, useEffect, useRef } from "react";
import { useMatch, useNavigate, useSearchParams } from "react-router-dom";

import Box from "../components/Box";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import { getSearch } from "../api/search";
import { makeImagePath } from "../utils";
import styled from "styled-components";
import { useInfiniteQuery } from "react-query";
import { useScroll } from "framer-motion";

const GridWrapper = styled.div`
  padding: 30px 0;
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(5, 1fr);
  width: 100%;
`;

const Title = styled.div`
  font-size: 30px;
  text-align: center;
  padding: 30px 0;
`;

const Text = styled.div`
  font-size: 18px;
  text-align: center;

  span {
    font-size: 20px;
    font-weight: 600;
    //color: ${(props) => props.theme.red};
  }
`;

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    zIndex: 99,
    scale: 1.3,
    y: -20,
    transition: {
      type: "tween",
      duration: 0.2,
      delay: 0.3,
    },
  },
};

export default function Search() {
  const { scrollY } = useScroll();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const keyword = searchParams.get("keyword");
  const isSearchMatch = useMatch("/search/:searchId");
  const observerElem = useRef(null);

  const onClickBox = (contentId: number) => {
    navigate(`/search/${contentId}?keyword=${keyword}`);
  };

  const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(
      ["search", keyword],
      ({ pageParam = 1 }) => getSearch({ keyword: keyword || "", page: pageParam }),
      {
        getNextPageParam: (lastPage, allPages) => {
          const nextPage = allPages.length + 1;
          return nextPage;
        },
      }
    );

  // useEffect(() => {
  //   let fetching = false;
  //   const handleScroll = async (e: any) => {
  //     const { scrollHeight, scrollTop, clientHeight } = e.target.scrollingElement;
  //     if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
  //       fetching = true;
  //       if (hasNextPage) await fetchNextPage();
  //       fetching = false;
  //     }
  //   };
  //   document.addEventListener("scroll", handleScroll);
  //   return () => {
  //     document.removeEventListener("scroll", handleScroll);
  //   };
  // }, [fetchNextPage, hasNextPage]);

  const handleObserver = useCallback(
    (entries: any) => {
      const [target] = entries;
      if (target.isIntersecting) {
        fetchNextPage();
      }
    },
    [fetchNextPage]
  );

  useEffect(() => {
    const element = observerElem.current;
    const option = { threshold: 0 };

    const observer = new IntersectionObserver(handleObserver, option);
    if (element) {
      observer.observe(element);
      return () => observer.unobserve(element);
    }
  }, [fetchNextPage, hasNextPage, handleObserver]);

  let clickedContent =
    isSearchMatch?.params.searchId &&
    data?.pages
      .map((page) => {
        return page.results.find(
          (search: any) => "" + search.id === isSearchMatch?.params.searchId
        );
      })
      .filter((content) => content !== undefined && content !== null);

  return (
    <>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <>
          <Title>Search</Title>
          <Text>
            <span>"{keyword}"</span>으로 검색한 결과입니다.
          </Text>
          <GridWrapper>
            {isSuccess &&
              data.pages.map((page) =>
                page.results.map((content: any) => (
                  <Box
                    layoutId={content.id}
                    key={content.id}
                    variants={boxVariants}
                    initial="normal"
                    whileHover="hover"
                    onClick={() => onClickBox(content.id)}
                  >
                    {content.poster_path ? (
                      <img src={makeImagePath(content.poster_path, "w500")} alt="" />
                    ) : (
                      <div>no image</div>
                    )}
                  </Box>
                ))
              )}
          </GridWrapper>

          <div className="loader" ref={observerElem} style={{ textAlign: "center" }}>
            {isFetchingNextPage && hasNextPage ? "Loading..." : "No search left"}
          </div>

          {isSearchMatch !== null && (
            <Modal
              scrollY={scrollY.get()}
              layoutId={`${isSearchMatch.params.searchId}`}
              clickedContent={clickedContent && clickedContent[0]}
            />
          )}
        </>
      )}
    </>
  );
}
