import { motion } from "framer-motion";
import styled from 'styled-components';

const SliderWrapper = styled.div`
  margin-top: 30px;
`;

const SliderArea = styled.div`
  position: relative;
  height: 200px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #2d3436;
  height: 200px;
  color: #dfe6e9;
  font-size: 24px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:first-child {
    transform-origin: center left;
  }

  &:last-child {
    transform-origin: center right;
  }
`;

const PrevBtn = styled.button`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  border: 0;
  color: #fff;
  width: 50px;
  
  img {
    width: 20px;
    transform: rotate(-180deg);
  }
`;

const NextBtn = styled.button`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  border: 0;
  color: #fff;
  width: 50px;

  img {
    width: 20px;
  }
`;

const EmptySlider = styled.div`
  padding: 50px 0;
  text-align: center;
`;

export {
  SliderWrapper,
  SliderArea,
  Row,
  Box,
  PrevBtn,
  NextBtn,
  EmptySlider
};
