import { EmptySlider, NextBtn, PrevBtn, Row, SliderArea, SliderWrapper } from "./style";

import { AnimatePresence } from "framer-motion";
import Arrow from "../../images/arrow.png";
import Box from "../Box";
import Title from "./Title";
import { makeImagePath } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
const rowVariants = {
  hidden: (direction: boolean) => ({
    x: direction ? window.innerWidth + 5 : -window.innerWidth - 5,
  }),
  visible: { x: 0 },
  exit: (direction: boolean) => ({ x: direction ? -window.innerWidth - 5 : window.innerWidth + 5 }),
};

const offset = 6;

interface ISlider {
  title?: string;
  mainCategory: string;
  subCategory: string;
  data?: any;
}

export default function Slider({ title, data, mainCategory, subCategory }: ISlider) {
  const [direction, setDirection] = useState(true);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false); // 이전, 다음버튼 중복클릭 안되게 처리
  const navigate = useNavigate();

  const onToggleLeaving = () => {
    setLeaving((prev: boolean) => !prev);
  };
  const onClickBox = (contentId: number) => {
    navigate(`/${mainCategory}/${subCategory}/${contentId}`);
  };
  const onClickControlBtn = (direction: boolean) => {
    setDirection(direction);
    if (!data) return;
    if (leaving) return;
    onToggleLeaving();
    const totalContents = data?.results.length;
    const maxIndex = Math.floor(totalContents / offset) - 1;

    setIndex((prev) => {
      if (direction) {
        return prev === maxIndex ? 0 : prev + 1;
      } else {
        return prev === 0 ? maxIndex : prev - 1;
      }
    });
  };

  return (
    <SliderWrapper>
      {title && <Title title={title} />}
      {data.results ? (
        <SliderArea>
          <AnimatePresence onExitComplete={onToggleLeaving} initial={false} custom={direction}>
            <Row
              variants={rowVariants}
              custom={direction}
              key={index}
              initial="hidden"
              animate="visible"
              transition={{ type: "tween", duration: 0.5 }}
              exit="exit"
            >
              {data?.results.slice(offset * index, offset * index + offset).map((content: any) => (
                <Box
                  layoutId={`${subCategory}_${content.id}`}
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
              ))}
            </Row>
          </AnimatePresence>
          <PrevBtn onClick={() => onClickControlBtn(false)}>
            <img src={Arrow} alt="" />
          </PrevBtn>
          <NextBtn onClick={() => onClickControlBtn(true)}>
            <img src={Arrow} alt="" />
          </NextBtn>
        </SliderArea>
      ) : (
        <EmptySlider>{title} 컨텐츠가 없습니다.</EmptySlider>
      )}
    </SliderWrapper>
  );
}
